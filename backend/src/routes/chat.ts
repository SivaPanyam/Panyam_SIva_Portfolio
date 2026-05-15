// backend/src/routes/chat.ts
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body;
  // TODO: integrate real LLM here, simulated for now
  res.json({ response: `AI processing: ${message}` });
});

export default router;
