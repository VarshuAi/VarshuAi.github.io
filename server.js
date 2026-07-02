const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const PORT = process.env.PORT || 3000;
const DOWNLOADS_DIR = path.resolve(__dirname, 'downloads');
const DB_FILE = path.resolve(__dirname, 'projects_db.json');

// Admin Auth Token (Set via environment variables when hosting)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secure-local-development-key';

// Supabase Configuration
const SUPABASE_URL = process.env.SUPABASE_URL; // e.g., https://xyz.supabase.co
const SUPABASE_KEY = process.env.SUPABASE_KEY; // Service role key
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'portfolio';

const IS_CLOUD_MODE = !!(SUPABASE_URL && SUPABASE_KEY);

// Ensure downloads directory exists locally
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Ensure database file exists locally
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([
    {
      id: "altercontroller",
      name: "AlterController Suite",
      tagline: "Companion App & Latency Optimization Suite",
      status: "Active Development",
      description: "Zero-GC binary communication pipe, inline Web Worker timers, and elevated priority companion to turn your mobile device into a low-latency gamepad.",
      tech: ["Rust", "Tauri", "React Native", "Expo", "Python", "Go"],
      details: "A comprehensive companion suite that bridges mobile screens and PC games with zero-allocations, direct buffer transmissions over WebSockets, and ADB port forwarding over USB.\n\n### Key Features\n- **Zero-GC Communication**: Packets are serialized as 14-byte binary ArrayBuffers, avoiding JavaScript garbage collection jitter.\n- **Inline Web Workers**: Polling timers run on a dedicated worker thread to bypass browser clamping.\n- **Process Elevation**: Win32 API elevations ensure companion priority under load.\n- **Cross-Platform**: Companions built in Rust/Tauri for PC and Expo/React Native for mobile.",
      downloads: [
        {
          filename: "Setup_AlterController.exe",
          label: "Download Windows Companion (.exe)",
          icon: "windows"
        },
        {
          filename: "AlterController_v1.0.apk",
          label: "Download Android App (.apk)",
          icon: "android"
        }
      ]
    }
  ], null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.exe': 'application/x-msdownload',
  '.apk': 'application/vnd.android.package-archive'
};

// Safe path validation to prevent path traversal attack
function isPathSafe(targetPath, baseDir) {
  const resolvedTarget = path.resolve(targetPath);
  const resolvedBase = path.resolve(baseDir);
  return resolvedTarget.startsWith(resolvedBase);
}

// Timing safe token comparison to mitigate timing attacks
function isAuthorized(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/, '').trim() || req.headers['x-admin-token'] || '';
  
  if (!token) return false;

  const aBuf = Buffer.from(token);
  const bBuf = Buffer.from(ADMIN_TOKEN);

  if (aBuf.length !== bBuf.length) {
    // Fake comparison to prevent timing leak detection
    crypto.timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// Helper: Read database from Supabase Storage or Local File
function getProjectsDatabase(callback) {
  if (IS_CLOUD_MODE) {
    const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/projects_db.json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          callback(null, data);
        } else {
          // If file not found in bucket yet, try local DB file as a bootstrap fallback
          fs.readFile(DB_FILE, 'utf8', (err, localData) => {
            if (err) callback(new Error('Supabase fetch failed and local fallback missing'));
            else callback(null, localData);
          });
        }
      });
    }).on('error', err => {
      callback(err);
    });
  } else {
    fs.readFile(DB_FILE, 'utf8', callback);
  }
}

// Helper: Save database to Supabase Storage or Local File
function saveProjectsDatabase(dataString, callback) {
  if (IS_CLOUD_MODE) {
    const supabaseUrl = new URL(`${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/projects_db.json`);
    const options = {
      method: 'PUT',
      hostname: supabaseUrl.hostname,
      path: supabaseUrl.pathname,
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'apiKey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'x-upsert': 'true'
      }
    };
    const req = https.request(options, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          callback(null);
        } else {
          callback(new Error('Supabase save failed: ' + resBody));
        }
      });
    });
    req.on('error', err => callback(err));
    req.write(dataString);
    req.end();
  } else {
    fs.writeFile(DB_FILE, dataString, 'utf8', callback);
  }
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Filename, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Serve static files
  if (req.method === 'GET' && !pathname.startsWith('/api/')) {
    let relativePath = pathname === '/' ? 'index.html' : pathname;
    
    // Redirect downloads to Supabase public CDN if in Cloud Mode
    if (relativePath.startsWith('/downloads/')) {
      const filename = relativePath.substring(11);
      if (IS_CLOUD_MODE) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/downloads/${filename}`;
        res.writeHead(302, { 'Location': publicUrl });
        res.end();
        return;
      }
    }

    let filePath;
    if (relativePath.startsWith('/downloads/')) {
      filePath = path.join(DOWNLOADS_DIR, relativePath.substring(11));
    } else {
      filePath = path.join(__dirname, relativePath);
    }

    // Verify file is inside root / downloads directory
    const isUnderRoot = isPathSafe(filePath, __dirname);
    const isUnderDownloads = isPathSafe(filePath, DOWNLOADS_DIR);

    if (!isUnderRoot && !isUnderDownloads) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden: Access Denied');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    });
    return;
  }

  // GET /api/projects - Reads from database helper
  if (pathname === '/api/projects' && req.method === 'GET') {
    getProjectsDatabase((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not read projects database: ' + err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
    return;
  }

  // POST /api/projects - Saves using database helper
  if (pathname === '/api/projects' && req.method === 'POST') {
    if (!isAuthorized(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing token' }));
      return;
    }

    let body = '';
    const MAX_JSON_SIZE = 1 * 1024 * 1024; // 1MB payload limit

    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > MAX_JSON_SIZE) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large (Max 1MB)' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        saveProjectsDatabase(JSON.stringify(parsed, null, 2), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Could not save projects: ' + err.message }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          }
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // POST /api/upload - Upload file to Supabase or Local
  if (pathname === '/api/upload' && req.method === 'POST') {
    if (!isAuthorized(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing token' }));
      return;
    }

    const filename = req.headers['x-filename'];
    if (!filename) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing X-Filename header' }));
      return;
    }

    // Clean and validate file extension to prevent server-side remote code execution
    const ext = path.extname(filename).toLowerCase();
    const ALLOWED_EXTENSIONS = ['.exe', '.apk', '.zip', '.tar.gz', '.pkg', '.dmg'];
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden file type. Only installer and archive packages are allowed.' }));
      return;
    }

    const safeFilename = path.basename(filename);

    if (IS_CLOUD_MODE) {
      const supabaseUrl = new URL(`${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/downloads/${safeFilename}`);
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
      const options = {
        method: 'POST',
        hostname: supabaseUrl.hostname,
        path: supabaseUrl.pathname,
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'apiKey': SUPABASE_KEY,
          'Content-Type': mimeType,
          'x-upsert': 'true'
        }
      };

      const uploadReq = https.request(options, (uploadRes) => {
        let responseBody = '';
        uploadRes.on('data', chunk => responseBody += chunk);
        uploadRes.on('end', () => {
          if (uploadRes.statusCode === 200) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              success: true, 
              path: `/downloads/${safeFilename}` 
            }));
          } else {
            res.writeHead(uploadRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Supabase storage upload failed: ' + responseBody }));
          }
        });
      });

      uploadReq.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Network error uploading to Supabase: ' + err.message }));
      });

      let bytesReceived = 0;
      const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB maximum file size limit

      req.on('data', chunk => {
        bytesReceived += chunk.length;
        if (bytesReceived > MAX_FILE_SIZE) {
          res.writeHead(413, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'File size exceeds maximum allowed size (150MB)' }));
          uploadReq.destroy();
          req.destroy();
        }
      });

      req.pipe(uploadReq);
    } else {
      const targetPath = path.join(DOWNLOADS_DIR, safeFilename);

      // Validate path to prevent directory traversal
      if (!isPathSafe(targetPath, DOWNLOADS_DIR)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Forbidden path traversal attempt' }));
        return;
      }

      let bytesReceived = 0;
      const MAX_FILE_SIZE = 150 * 1024 * 1024;
      const writeStream = fs.createWriteStream(targetPath);

      req.on('data', chunk => {
        bytesReceived += chunk.length;
        if (bytesReceived > MAX_FILE_SIZE) {
          res.writeHead(413, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'File size exceeds maximum allowed size (150MB)' }));
          writeStream.end();
          fs.unlink(targetPath, () => {}); // Clean up partially written file
          req.destroy();
        }
      });

      req.pipe(writeStream);

      writeStream.on('finish', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, path: `/downloads/${safeFilename}` }));
      });

      writeStream.on('error', err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File write error: ' + err.message }));
      });
    }
    return;
  }

  // Path not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`   AlterController Secure API Server started!`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Mode: ${IS_CLOUD_MODE ? 'Cloud (Supabase)' : 'Local Disk'}`);
  console.log(`   Admin Key: ${ADMIN_TOKEN}`);
  console.log(`====================================================`);
});
