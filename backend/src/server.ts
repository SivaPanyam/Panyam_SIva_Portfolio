// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);

if (require.main === module) {
  app.listen(3001, () => console.log('Server running on port 3001'));
}
