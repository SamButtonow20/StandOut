import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.mjs';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('StandOut backend running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Missing');
