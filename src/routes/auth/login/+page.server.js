import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { mysqlconnFn } from '../../../hooks.server.js'

export const load = async () => {
    const title = "Login";
    return {
        title
    }

}

const sessions = {};

export const actions = {
    login: async ({ request, cookies, url, fetch }) => {
        const data = await request.formData()
        const username = data.get('username')
        const password = data.get('password')  
        if (!username || !password) {
            return fail(400, {
                username,
                message: 'Missing username or password'
            })
        }

        const response = await fetch('/api/user')
        const users = await response.json()

        const user = users.find(user => user.username === username)
        if (!user) {
            return fail(400, {
                username,
            })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return fail(400, {
                username,
                message: 'Invalid password'
            });
        }




        const sessionToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        sessions[sessionToken] = {
            userId: user.id,
            expiresAt,
        };
        
        cookies.set('session_token', sessionToken, {
            path: '/', // Specifica il percorso del cookie
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: expiresAt
        });

        const mysqlconn = await mysqlconnFn();
        await mysqlconn.query("UPDATE user SET userAuthToken = ? WHERE id = ?", [sessionToken, user.id])

        throw redirect(303, url.searchParams.get('redirectTo') || '/')
    }
}