"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
        res.json({ count: leaderboard.length, results: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard.', details: error.message });
    }
});
exports.default = router;
