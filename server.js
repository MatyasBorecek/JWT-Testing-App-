import express from 'express';
import jsonServer from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// JSON Server router
const jsonServerRouter = jsonServer.router('db.json');
app.use('/api', jsonServerRouter);

app.use('/', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', message: 'JWT Test Server is running!' });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`JWT Test Server is running on http://localhost:${PORT}`);
  console.log(`You can access JWT endpoints:`);
  console.log(`- POST /auth/register - to create new user`);
  console.log(`- POST /auth/login - to authenticate and get JWT token`);
  console.log(`- GET /users - protected route (requires authentication)`);
  console.log(`- GET /admin - admin-only route`);
});

export default app;
