import { mysqlconnFn } from '../../hooks.server.js'

export const load = async () => {
    // console.log("Home page universal load function called")
    const title = "Training";
    try {
        const mysqlconn = await mysqlconnFn();
        const day = await mysqlconn.query("SELECT * FROM day")
            .then(function([rows,fields]) {
                // console.log(rows);
                return rows;
            });

        const training = await mysqlconn.query("SELECT training.id, day.name AS day, exercise.name AS exercise, training.sets, training.repetitions FROM training JOIN day ON training.day_id = day.id JOIN exercise ON training.exercise_id = exercise.id;")
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
        return {
            day,
            training,
            muscles,
            exercises
        }
    }
    catch (error) {
        console.error("Errore durante l'esecuzione della query al database:", error);
        // Gestisci l'errore in base alle tue esigenze
    }
}

