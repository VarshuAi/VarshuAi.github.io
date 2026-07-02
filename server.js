const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DOWNLOADS_DIR = path.resolve(__dirname, 'downloads');
const DB_FILE = path.resolve(__dirname, 'projects_db.json');

// Admin Auth Token (Set via environment variables when hosting)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secure-local-development-key';

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Ensure database file exists
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
    
    // Serve from downloads folder if requested
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

  // GET /api/projects - Doesn't require authentication (public endpoint)
  if (pathname === '/api/projects' && req.method === 'GET') {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not read database' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
    return;
  }

  // POST /api/projects - Authenticated database saving
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
        fs.writeFile(DB_FILE, JSON.stringify(parsed, null, 2), 'utf8', err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Could not write database file' }));
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

  // POST /api/upload - Authenticated file uploader
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
    const targetPath = path.join(DOWNLOADS_DIR, safeFilename);

    // Validate path to prevent directory traversal
    if (!isPathSafe(targetPath, DOWNLOADS_DIR)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Forbidden path traversal attempt' }));
      return;
    }

    let bytesReceived = 0;
    const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB maximum file size limit
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
  console.log(`   Admin Key: ${ADMIN_TOKEN}`);
  console.log(`====================================================`);
});
