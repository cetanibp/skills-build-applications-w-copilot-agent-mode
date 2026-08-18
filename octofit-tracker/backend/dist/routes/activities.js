"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find({}).lean();
        res.json({ count: activities.length, results: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities.', details: error.message });
    }
});
router.post('/', async (req, res) => {
    const { userId, type, durationMinutes, distanceMiles, caloriesBurned, notes, } = req.body ?? {};
    if (!userId || !type || !durationMinutes || !caloriesBurned) {
        return res.status(400).json({
            error: 'userId, type, durationMinutes, and caloriesBurned are required.',
        });
    }
    try {
        const newActivity = await models_1.Activity.create({
            id: `activity-${Date.now()}`,
            userId,
            type,
            durationMinutes,
            distanceMiles,
            caloriesBurned,
            notes,
        });
        return res.status(201).json(newActivity.toObject());
    }
    catch (error) {
        return res.status(400).json({ error: 'Unable to create activity.', details: error.message });
    }
});
exports.default = router;
