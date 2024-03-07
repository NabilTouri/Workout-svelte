<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Checkbox, Label, Input } from "flowbite-svelte";
  
    let username = ''
  
    export const snapshot = {
      capture: () => {
        return {
          username
            }
        },
      restore: (data) => {
        username = data.username
      }
    }
  
    export let form;
    const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
  </script>
      
      <Section name="login">
        <Register>
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form method="post" class="flex flex-col space-y-6" action="?/login&redirectTo={redirectTo}" use:enhance>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{form?.message || 'Sign in'}</h3>
              <Label class="space-y-2">
                <span>Your username</span>
                <Input type="text" name="username" placeholder="username" bind:value={username} />
              </Label>
              <Label class="space-y-2">
                <span>Your password</span>
                <Input type="password" name="password" placeholder="•••••" />
              </Label>
              <div class="flex items-start">
                <Checkbox>Remember me</Checkbox>
                <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>
              <Button type="submit" class="w-full1">Sign in</Button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </Register>
      </Section>