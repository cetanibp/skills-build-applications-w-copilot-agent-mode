"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await models_1.Team.find({}).lean();
        res.json({ count: teams.length, results: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams.', details: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await models_1.Team.findOne({ id: req.params.id }).lean();
        if (!team) {
            return res.status(404).json({ error: 'Team not found.' });
        }
        return res.json(team);
    }
    catch (error) {
        return res.status(500).json({ error: 'Unable to fetch team.', details: error.message });
    }
});
router.post('/', async (req, res) => {
    const { name, members = [], points = 0 } = req.body ?? {};
    if (!name) {
        return res.status(400).json({ error: 'Team name is required.' });
    }
    try {
        const newTeam = await models_1.Team.create({
            id: `team-${Date.now()}`,
            name,
            members,
            points,
        });
        return res.status(201).json(newTeam.toObject());
    }
    catch (error) {
        return res.status(400).json({ error: 'Unable to create team.', details: error.message });
    }
});
exports.default = router;
