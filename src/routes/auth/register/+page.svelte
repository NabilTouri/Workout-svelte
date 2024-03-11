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

<div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-semibold mb-4">Register</h2>
    <form method="post" action="?/register" use:enhance>
        <p>{form?.message || ''}</p>
        <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input type="text" name="name" placeholder="Name" class="input" bind:value={name} required>
        </div>

        <div class="mb-4">
            <label for="surname" class="block text-gray-700">Surname</label>
            <input type="text" name="surname" placeholder="Surname" class="input" bind:value={surname} required>
        </div>

        <div class="mb-4">
            <label for="age" class="block text-gray-700">Age</label>
            <input type="number" name="age" placeholder="Age" class="input" required>
        </div>
        
        <div class="mb-4">
            <label for="gender" class="block text-gray-700">Gender</label>
            <select name="gender" class="input">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>

        <div class="mb-4">
            <label for="username" class="block text-gray-700">Username</label>
            <input type="text" name="username" placeholder="Username" class="input" bind:value={username} required>
        </div>

        <div class="mb-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" name="password" placeholder="Password" class="input" required>
        </div>

        <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700">Confirm password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm password" class="input" required>
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p class="mt-4">
        <a href="/auth/login" class="text-blue-500">Login</a>
    </p>
</div>
