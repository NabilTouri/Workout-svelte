<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Dropdown, DropdownItem, DropdownDivider, P } from 'flowbite-svelte';
    import { ChevronDownOutline, GithubSolid, XCompanySolid } from "flowbite-svelte-icons";
</script>

<header class=" shadow-sm sticky top-0 z-50">
    <Navbar shadow class="bg-dark-800">
        <NavBrand href="/">
            <!-- <img src="" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
            <P class="text-white font-bold text-xl mx-4">Workout Plan</P>
        </NavBrand>
        <div class="flex md:order-2">
            <Button class="bg-gradient-to-r from-primary-600 to-primary-800" size="sm">Get started</Button>
            <NavHamburger />
        </div>
        <NavUl class="order-1">
            <NavLi href="/" class="text-white" active={true}>Home</NavLi>
            <NavLi>
                <div class="text-white flex items-center">
                    Contact <ChevronDownOutline class="outline-none" />
                </div> 
                <Dropdown>
                    <DropdownItem href="https://www.github.com"> <GithubSolid /> </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="https://twitter.com/"><XCompanySolid /></DropdownItem>
                </Dropdown>
            </NavLi>
        </NavUl>
    </Navbar>
</header>
