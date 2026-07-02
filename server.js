const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DOWNLOADS_DIR = path.join(__dirname, 'downloads');
const DB_FILE = path.join(__dirname, 'projects_db.json');

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Ensure database file exists with a default array
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

const server = http.createServer((req, res) => {
  // CORS Headers for easier local API integration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Filename');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // API Route: Get Projects JSON
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

  // API Route: Save Projects JSON
  if (pathname === '/api/projects' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
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

  // API Route: Upload File
  if (pathname === '/api/upload' && req.method === 'POST') {
    const filename = req.headers['x-filename'];
    if (!filename) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing X-Filename header' }));
      return;
    }

    // Clean filename to prevent path traversal
    const safeFilename = path.basename(filename);
    const targetPath = path.join(DOWNLOADS_DIR, safeFilename);
    const writeStream = fs.createWriteStream(targetPath);

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

  // Serve static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // If path is downloads/, resolve from the downloads folder
  if (pathname.startsWith('/downloads/')) {
    filePath = path.join(DOWNLOADS_DIR, pathname.substring(11));
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
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`   AlterController Workspace Server started local!`);
  console.log(`   Access static app:  http://localhost:${PORT}/`);
  console.log(`   Access admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`====================================================`);
});
