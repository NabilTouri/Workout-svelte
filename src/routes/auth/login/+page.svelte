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

<p>Login</p>

<form method="post" action="?/login&redirectTo={redirectTo}" use:enhance>
    <p>{form?.message || ''}</p>
    <input type="text" name="username" placeholder="Username" bind:value={username}>
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Login</button>
</form>
<a href="/auth/register">Register</a>
