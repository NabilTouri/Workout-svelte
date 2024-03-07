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
    
    <Section name="register">
      <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form method="post" class="flex flex-col space-y-6" action="?/register&redirectTo={redirectTo}" use:enhance>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{form?.message || 'Sign up'}</h3>
            <Label class="space-y-2">
              <span>Name</span>
              <Input type="text" name="name" placeholder="name"/>
            </Label>
            <Label class="space-y-2">
              <span>Surname</span>
              <Input type="text" name="surname" placeholder="surname"/>
            </Label>
            <Label class="space-y-2">
              <span>Age</span>
              <Input type="number" name="age" placeholder="age"/>
            </Label>
            <Label class="space-y-2">
              <span>Username</span>
              <Input type="text" name="username" placeholder="username" bind:value={username} />
            </Label>
            <Label class="space-y-2">
              <span>Password</span>
              <Input type="password" name="password" placeholder="•••••" />
            </Label>
            <Label class="space-y-2">
              <span>Conferm password</span>
              <Input type="password" name="confermPassword" placeholder="•••••" />
            </Label>
            <Button type="submit" class="w-full1">Sign up</Button>
          </form>
        </div>
      </Register>
    </Section>