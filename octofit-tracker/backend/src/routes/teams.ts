import { Router } from 'express';
import { Team } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ count: teams.length, results: teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams.', details: (error as Error).message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id }).lean();

    if (!team) {
      return res.status(404).json({ error: 'Team not found.' });
    }

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch team.', details: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  const { name, members = [], points = 0 } = req.body ?? {};

  if (!name) {
    return res.status(400).json({ error: 'Team name is required.' });
  }

  try {
    const newTeam = await Team.create({
      id: `team-${Date.now()}`,
      name,
      members,
      points,
    });

    return res.status(201).json(newTeam.toObject());
  } catch (error) {
    return res.status(400).json({ error: 'Unable to create team.', details: (error as Error).message });
  }
});

export default router;
