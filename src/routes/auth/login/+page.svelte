<script>
    import { page } from '$app/stores';
    import { P, Input, Button, Checkbox, Label } from 'flowbite-svelte'
    import { Section, Register } from "flowbite-svelte-blocks";
    import { enhance } from '$app/forms'
    export let form = {};

    let username = '';

    export const snapshot = {
        capture: () => {
            return {
                username,
            };
        },
        restore: (data) => {
            username = data.username;
        }
    };

    const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>
    
    <Section name="login" sectionClass="lg:w-1/3 mx-auto">
      <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 class="text-xl text-center font-medium text-gray-900 dark:text-white p-0">Login</h3>
          <P class="mb-4">{form?.message || ''}</P>
          <form class="flex flex-col space-y-6" method="post" action="?/login&redirectTo={redirectTo}">
            <Label class="space-y-2">
              <span>Your username</span>
              <Input type="text" name="username" placeholder="Username" bind:value={username} required />
            </Label>
            <Label class="space-y-2">
              <span>Your password</span>
              <Input type="password" name="password" placeholder="Password" required />
            </Label>
            <Button type="submit" class="w-full1">Login</Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="/auth/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</a>
            </p>
          </form>
        </div>
      </Register>
    </Section>