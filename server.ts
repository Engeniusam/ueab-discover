import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { DESTINATIONS } from './src/data/destinations';

async function startServer() {
  const app = express();

  // Cloud Run sets PORT (standard is 8080) in production container.
  // In development / AI Studio preview environment, reverse proxy routes to 3000.
  const isProduction = process.env.NODE_ENV === 'production';
  const PORT = isProduction
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080)
    : 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'kapsabet-discover',
      version: '1.0.0',
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      cloudRunReady: true,
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/destinations', (req, res) => {
    const { category, search } = req.query;
    let results = DESTINATIONS;

    if (category && category !== 'all') {
      results = results.filter(
        (d) =>
          d.category === category ||
          d.categoryLabels.some((l) => l.toLowerCase() === (category as string).toLowerCase())
      );
    }

    if (search) {
      const q = (search as string).toLowerCase();
      results = results.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.locationDetails.toLowerCase().includes(q)
      );
    }

    res.json({
      count: results.length,
      destinations: results,
    });
  });

  app.get('/api/destinations/:id', (req, res) => {
    const dest = DESTINATIONS.find((d) => d.id === req.params.id);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(dest);
  });

  // Telemetry collector placeholder endpoint
  app.post('/api/telemetry/collect', (req, res) => {
    // Collect Faro beacon/payload
    res.status(202).json({ status: 'received', timestamp: new Date().toISOString() });
  });

  // Frontend Serving (Vite middleware in dev, static dist in production)
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kapsabet Discover] Server running on http://0.0.0.0:${PORT} (Production ready for Cloud Run on port 8080)`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
