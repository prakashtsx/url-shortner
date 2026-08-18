import { db } from '../db/index.js';
import { userTable } from '../models/user.model.js';
import { hashPasswordWithSalt } from '../utils/hash.js';


export async function getUserByEmail(email) {
    const [existingUser] = await db.select({
        id: userTable.id,
        firstname: userTable.firstname,
        lastname: userTable.lastname,
        email: userTable.email,
    }).from(userTable).where(eq(userTable.email, email));

    return existingUser;

}
export async function createUser(firstname, lastname, email, password) {
    const { salt, password: hashedPassword } = hashPasswordWithSalt(password)
    const [user] = await db.insert(userTable).values({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword,
    }).returning({
        id: userTable.id,
    });
    return user;
}