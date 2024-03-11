import { mysqlconnFn } from '../../../hooks.server.js'
import { json } from '@sveltejs/kit'

export const GET = async () => {
    try {
        const mysqlconn = await mysqlconnFn();
        const user = await mysqlconn.query("SELECT * FROM user")
            .then(function([rows,fields]) {
                // console.log(rows);
                return rows;
            });
        return json(user, { status: 200 });
    } catch (error) {
        console.error("Errore durante il recupero degli user:", error);
        return {
            status: 500,
            body: { error: "Internal Server Error" }
        };
    }  
}

export const POST = async (requestEvent) => {
    try {
        const { request } = requestEvent;
        console.log("POST request received");
        const user = await request.json()
        const mysqlconn = await mysqlconnFn();
        await mysqlconn.query("INSERT INTO user (name, surname, age, gender, username, password) VALUES (?, ?, ?, ?, ?, ?)", [user.name, user.surname,user.age, user.gender, user.username, user.hashedPassword])
        return json({ message: "Dati inseriti con successo nel database" }, { status: 200 })
    } catch (error) {
        console.error("Errore durante l'inserimento dei dati nel database:", error);
        return {
            status: 500,
            body: {
                error: "Si è verificato un errore durante l'inserimento dei dati nel database"
            }
        };
    }   
}