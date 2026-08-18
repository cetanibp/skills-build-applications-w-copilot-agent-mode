import { Router } from 'express';
import { LeaderboardEntry } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json({ count: leaderboard.length, results: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard.', details: (error as Error).message });
  }
});

export default router;
