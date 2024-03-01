<script>
    import { goto, preloadCode } from '$app/navigation';
    import { Heading, P, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<style>
    div {
        position: relative;
        z-index: 1;
    }
    div::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url("$lib/img/presentation.png") no-repeat center center;
        background-size: cover;
        opacity: 0.7;
        z-index: -1;
    }
</style>
  
<div class="flex flex-col justify-center items-center min-h-screen text-center">
    <Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Workout Plan</Heading>
    <P align="center" class="mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Empower your fitness journey with Workout Plan!</P>
    
    <Button
    on:focus={async () => {
        await preloadCode('/database');
    }}
    on:mouseover={async () => {
        await preloadCode('/database');
    }}
    on:click={() => {
        goto('/database');
    }}>Start training
    <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
    </Button>
</div>