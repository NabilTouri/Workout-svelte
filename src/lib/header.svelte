<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
</script>

<style>
    header {
        background-color: #fff; /* Assicurati che l'header sia visibile rispetto allo sfondo della pagina */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Opzionale: aggiungi una leggera ombra per evidenziare l'header */
    }
</style>

<header class="sticky top-0 z-50">
    <Navbar shadow class="border-b">
        <NavBrand href="/">
            <!-- <img src="" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Workout Plan</span>
        </NavBrand>
        <div class="flex md:order-2">
            <Button size="sm">Get started</Button>
            <NavHamburger />
        </div>
        <NavUl class="order-1">
            <NavLi href="/" active={true}>Home</NavLi>
            <NavLi href="/about">About</NavLi>
            <NavLi href="/docs/components/navbar">Navbar</NavLi>
            <NavLi href="/pricing">Pricing</NavLi>
            <NavLi href="/contact">Contact</NavLi>
        </NavUl>
    </Navbar>
</header>
