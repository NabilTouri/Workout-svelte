import { mysqlconnFn } from '../../../hooks.server.js'
import { fail, redirect, error } from '@sveltejs/kit'

// export const load = () => {}

export const load = async (serverLoadEvent) => {
    try {
        const mysqlconn = await mysqlconnFn();
        const user = await mysqlconn.query("SELECT username FROM user")
            .then(function([rows,fields]) {
                console.log(rows);
                return rows;
            });
        return {
            user
        }
    }
    catch (error) {
        console.error("Errore durante l'esecuzione della query al database:", error);
        // Gestisci l'errore in base alle tue esigenze
    }
}

export const actions = {
    // login: async ({ request, cookies, url }) => {
    //     const data = await request.formData()
    //     const username = data.get('username')
    //     const password = data.get('password')
    //     if (!username || !password) {
    //         return fail(400, {
    //             username,
    //             message: 'Missing username or password'
    //         })
    //     }
    //     cookies.set('username', username, { path: '/' })
    //     throw redirect(303, url.searchParams.get('redirectTo') || '/')
    // },
    register: async ({ request, cookies, url }) => {
        const data = await request.formData()
        const username = data.get('username')
        const password = data.get('password')
        if (!username || !password) {
            return fail(400, {
                username,
                message: 'Missing username or password'
            })
        }
        cookies.set('username', username, { path: '/' })

        try {
            const mysqlconn = await mysqlconnFn();
            await mysqlconn.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password])
        } catch (error) {
            console.error("Errore durante l'inserimento dei dati nel database:", error);
            throw error(500,{
                message: "Si è verificato un errore durante l'inserimento dei dati nel database"
            })
        }

        throw redirect(303, url.searchParams.get('redirectTo') || '/')
    },
    
}