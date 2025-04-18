import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
const staticPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(staticPath));

// API routes (if any)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// Fallback to React frontend
app.use((req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
