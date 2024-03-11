import { mysqlconnFn } from '../../hooks.server.js'
import { redirect } from "@sveltejs/kit"

export const load = async ({ cookies, url, fetch }) => {
    // console.log("Home page universal load function called")
    if (!cookies.get('session_token')) {
        throw redirect(307, `/auth/login?redirectTo=${url.pathname}`)
    }
    const title = "Training Page";
    try {
        const mysqlconn = await mysqlconnFn();
        const day = await mysqlconn.query("SELECT * FROM day")
            .then(function([rows,fields]) {
                // console.log(rows);
                return rows;
            });

        const training = await mysqlconn.query("SELECT training.id, day.name AS day, exercise.name AS exercise, training.sets, training.repetitions, training.user_id FROM training JOIN day ON training.day_id = day.id JOIN exercise ON training.exercise_id = exercise.id;")
            .then(function([rows,fields]) {
                // console.log(rows);
                return rows;
            });

        const muscles = await mysqlconn.query("SELECT DISTINCT muscle FROM exercise")
        .then(function([rows,fields]) {
            // console.log(rows);
            return rows;
        });
        const exercises = await mysqlconn.query("SELECT * FROM exercise")
        .then(function([rows,fields]) {
            // console.log(rows);
            return rows;
        });
        const response = await fetch('/api/user')
        const users = await response.json()
        const user = users.find(user => user.userAuthToken === cookies.get('session_token'))
        const userForm = user.id;
        return {
            title,
            day,
            training,
            muscles,
            exercises,
            userForm
        }
    }
    catch (error) {
        console.error("Errore durante l'esecuzione della query al database:", error);
        // Gestisci l'errore in base alle tue esigenze
    }
}

