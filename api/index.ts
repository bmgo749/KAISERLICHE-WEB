// Vercel serverless function entry point
import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app
const app = express();

// Add CORS middleware for Vercel deployment
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin === 'https://kaiserliche.my.id' || 
      origin?.includes('vercel.app') ||
      origin?.includes('localhost') ||
      !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
let server: any = null;

const initializeServer = async () => {
  if (!server) {
    const httpServer = createServer(app);
    server = await registerRoutes(app);
  }
  return server;
};

// Vercel handler
export default async function handler(req: any, res: any) {
  await initializeServer();
  return app(req, res);
}