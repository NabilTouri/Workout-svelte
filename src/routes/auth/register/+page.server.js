import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt';

export const load = async () => {
    const title = "Register";
    return {
        title
    }
}

export const actions = {
    register: async ({ request, fetch }) => {
        const data = await request.formData()
        //attributes are the name of the input fields
        const name = data.get('name')
        const surname = data.get('surname')
        const age = data.get('age')
        const gender = data.get('gender')
        const username = data.get('username')
        const password = data.get('password')
        const confirmPassword = data.get('confirmPassword')

        const response = await fetch('/api/user')
        const users = await response.json()
        const usernames = users.map(user => user.username)
        if (usernames.includes(username)) {
            return fail(400, {
                username,
                message: 'Username already in use'
            });
        }

        if (password !== confirmPassword) {
            return fail(400, {
                username,
                message: 'Passwords do not match'
            })
        }

        if (checkPasswordLength(password) && checkPasswordComplexity(password)) {
            console.log("La password soddisfa i requisiti di lunghezza e complessità.");
        } else {
            console.log("La password non soddisfa i requisiti di lunghezza e/o complessità.");
        }


        const hashedPassword = bcrypt.hashSync(password, 10); // Il secondo argomento è il costo del hashing
        await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                age,
                gender,
                username,
                hashedPassword
            })
        })
        // // cookies.set('username', username, { path: '/' })
        throw redirect(303, '/auth/login')
    }
}

function checkPasswordLength(password) {
    return password.length >= 8; // Requisito di lunghezza minima di 8 caratteri
}

// Funzione per verificare la complessità della password
function checkPasswordComplexity(password) {
    // Controlla se la password contiene almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    return (
        lowerCaseRegex.test(password) &&
        upperCaseRegex.test(password) &&
        numberRegex.test(password) &&
        specialCharacterRegex.test(password)
    );
}