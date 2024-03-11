<script>
    import { enhance } from '$app/forms';
    export let form = {};
    
    let name = ''
    let surname = ''
    let username = ''


    export const snapshot = {
        capture: () => {
            return {
                name,
                surname,
                username
            }
        },
        restore: (data) => {
            name = data.name
            surname = data.surname
            username = data.username
        
        }
    }

</script>

<p>Register</p>

<form method="post" action="?/register" use:enhance>
    <p>{form?.message || ''}</p>
    <label for="name">Name</label>
    <input type="text" name="name" placeholder="Name" bind:value={name} required>

    <label for="surname">Surname</label>
    <input type="text" name="surname" placeholder="Surname" bind:value={surname} required>

    <label for="age">Age</label>
    <input type="number" name="age" placeholder="Age" required>
    
    <label for="gender">Gender</label>
    <select name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>

    <label for="username">Username</label>
    <input type="text" name="username" placeholder="Username" bind:value={username} required>

    <label for="password">Password</label>
    <input type="password" name="password" placeholder="Password" required>
    <label for="confirmPassword">Confirm password</label>
    <input type="password" name="confirmPassword" placeholder="Confirm password" required>

    <button type="submit">Register</button>
</form>
<a href="/auth/login">Login</a>
