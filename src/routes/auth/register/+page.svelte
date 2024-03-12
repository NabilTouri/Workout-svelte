<script>
    import { enhance } from '$app/forms';
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Checkbox, Label, Input, Select, A, P } from "flowbite-svelte";
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

    <Section name="login" sectionClass="lg:w-2/3 mx-auto">
      <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 class="text-xl font-medium text-center text-gray-900 dark:text-white p-0">Register</h3>
            <P>{form?.message || ''}</P>
          <form class="flex flex-col space-y-6" method="post" action="?/register">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Label class="space-y-2">
                <span>Your name</span>
                <Input type="text" name="name" placeholder="Name" bind:value={name} required />
                </Label>
                <Label class="space-y-2">
                <span>Your surname</span>
                <Input type="text" name="surname" placeholder="Surname" bind:value={surname} required />
                </Label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Label class="space-y-2">
                        <span>Your age</span>
                        <Input type="number" name="age" placeholder="Age" required />
                    </Label>
                    <Label class="space-y-2">
                        <span>Your gender</span>
                        <Select name="gender" class="input" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </Label>
                </div>
                <Label class="space-y-2">
                    <span>Username</span>
                    <Input type="text" name="username" placeholder="Username" bind:value={username} required />
                </Label>
                <Label class="space-y-2">
                    <span>Password</span>
                    <Input type="password" name="password" placeholder="Password" required />
                </Label>
                <Label class="space-y-2">
                    <span>Confirm password</span>
                    <Input type="password" name="confirmPassword" placeholder="Confirm password" required />
                </Label>
            </div>
            <Button type="submit" class="w-full1">Register</Button>
            <P class="text-sm font-light text-gray-500 dark:text-gray-400">
              Do you already have an account? <a href="/auth/login  " class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
            </P>
          </form>
        </div>
      </Register>
    </Section>
