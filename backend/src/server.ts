// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
