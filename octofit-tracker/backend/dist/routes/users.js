"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await models_1.User.find({}).lean();
        res.json({ count: users.length, results: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users.', details: error.message });
    }
});
router.post('/', async (req, res) => {
    const { name, email, badge = 'New Starter', teamId = null, points = 0 } = req.body ?? {};
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    try {
        const newUser = await models_1.User.create({
            id: `user-${Date.now()}`,
            name,
            email,
            badge,
            teamId,
            points,
        });
        return res.status(201).json(newUser.toObject());
    }
    catch (error) {
        return res.status(400).json({ error: 'Unable to create user.', details: error.message });
    }
});
exports.default = router;
