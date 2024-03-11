<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    export let form = {};

    let username = ''

    export const snapshot = {
        capture: () => {
            return {
                username,
            }
        },
        restore: (data) => {
            username = data.username
        
        }
    }

    const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>

<div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-semibold mb-4">Login</h2>
    <form method="post" action="?/login&redirectTo={redirectTo}" use:enhance>
        <p class="mb-4">{form?.message || ''}</p>
        <div class="mb-4">
            <input type="text" name="username" class="input" placeholder="Username" bind:value={username}>
        </div>
        <div class="mb-4">
            <input type="password" name="password" class="input" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="mt-4">
        <a href="/auth/register" class="text-blue-500">Register</a>
    </p>
</div>