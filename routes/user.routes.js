import express from 'express';
import { db } from '../db/index.js';
import { userTable } from '../models/user.model.js';
import { signupPostRequestBodySchema } from '../validation/request.validation.js';
import { hashPasswordWithSalt } from '../utils/hash.js';
import { createUser, getUserByEmail } from '../services/user.service.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    // skip manual validation for now, we will use zod for validation later

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({ error: `User with email ${email} already exists` });
    }
    const user = await createUser(firstname, lastname, email, password);

    return res.status(201).json({
        message: 'User created successfully',
        userId: user.id
    });


})

export default router;
