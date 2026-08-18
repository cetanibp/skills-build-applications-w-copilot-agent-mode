"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find({}).lean();
        res.json({ count: workouts.length, results: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts.', details: error.message });
    }
});
router.post('/', async (req, res) => {
    const { title, category, durationMinutes, difficulty, description } = req.body ?? {};
    if (!title || !category || !durationMinutes || !difficulty || !description) {
        return res.status(400).json({
            error: 'title, category, durationMinutes, difficulty, and description are required.',
        });
    }
    try {
        const newWorkout = await models_1.Workout.create({
            id: `workout-${Date.now()}`,
            title,
            category,
            durationMinutes,
            difficulty,
            description,
        });
        return res.status(201).json(newWorkout.toObject());
    }
    catch (error) {
        return res.status(400).json({ error: 'Unable to create workout.', details: error.message });
    }
});
exports.default = router;
