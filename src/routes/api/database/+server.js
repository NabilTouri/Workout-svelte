import { json } from '@sveltejs/kit'
import { mysqlconnFn } from '../../../hooks.server.js'

export async function POST(requestEvent) {
    try {
        const { request } = requestEvent;
        console.log("POST request received");
        const newComment = await request.json()
        console.log(newComment.day_id, newComment.exercise_id, newComment.sets, newComment.repetitions, newComment.user_id)
    
        const mysqlconn = await mysqlconnFn();
        await mysqlconn.query("INSERT INTO training (day_id, exercise_id, sets, repetitions, user_id) VALUES (?, ?, ?, ?, ?)", [newComment.day_id, newComment.exercise_id, newComment.sets, newComment.repetitions, newComment.user_id])
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

export async function DELETE(requestEvent) {
    try {

        const { request } = requestEvent;
        // console.log("DELETE request received");
        const newComment = await request.json()
        const mysqlconn = await mysqlconnFn();
        await mysqlconn.query("DELETE FROM training WHERE id = ?", [newComment.id])
        return json({ message: "Dati eliminati con successo dal database" }, { status: 200 })
    } catch (error) {
       console.error("Errore durante l'eliminazione dei dati dal database:", error);
        return {
            status: 500,
            body: {
                error: "Si è verificato un errore durante l'eliminazione dei dati dal database"
            }
        };
    }
}

export async function PUT(requestEvent) {
    try {

        const { request } = requestEvent;
        console.log("PUT request received");
        const newComment = await request.json()
        console.log(newComment)
        const mysqlconn = await mysqlconnFn();
        await mysqlconn.query("UPDATE training SET day_id = ?, exercise_id = ?, sets = ?, repetitions = ? WHERE id = ?", [newComment.day_id, newComment.exercise_id, newComment.sets, newComment.repetitions, newComment.id])

        return json({ message: "Dati aggiornati con successo nel database" }, { status: 200 })

    } catch (error) {
        console.error("Errore durante l'aggiornamento dei dati dal database:", error);
        return {
            status: 500,
            body: {
                error: "Si è verificato un errore durante l'aggiornamento dei dati dal database"
            }
        };
    }
}