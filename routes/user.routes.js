import express from 'express';
import { db } from '../db/index.js';
import { userTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'crypto'
import { signupPostRequestBodySchema } from '../validation/request.validation.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    // skip manual validation for now, we will use zod for validation later

    const [existingUser] = await db.select({
        id: userTable.id,
    }).from(userTable).where(eq(userTable.email, email));

    if (existingUser) {
        return res.status(400).json({ error: `User with email ${email} already exists` });
    }

    // hash the password before storing it in the database

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const [user] = await db.insert(userTable).values({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword,
    }).returning({
        id: userTable.id,
    });
    return res.status(201).json({ message: 'User created successfully', userId: user.id });



})

export default router;
