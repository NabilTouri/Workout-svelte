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
        background: url("$lib/img/cover.png") no-repeat center center;
        background-size: cover;
        opacity: 1.5;
        z-index: -1;
    }
</style>
  
<div class="flex flex-col justify-center items-center min-h-screen text-center">
    <Heading tag="h1" class="mb-4 text-5xl font-extrabold md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">Workout Plan</Heading>
    <P align="center" class="mb-6 text-2xl lg:text-3xl sm:px-16 xl:px-48" weight="black"><mark class="px-2 text-white bg-gradient-to-r from-primary-600 to-primary-800 rounded">Empower your fitness journey with Workout Plan!</mark></P>
    
    <Button class="bg-gradient-to-r from-primary-600 to-primary-800"
    on:focus={async () => {
        await preloadCode('/training');
    }}
    on:mouseover={async () => {
        await preloadCode('/training');
    }}
    on:click={() => {
        goto('/training');
    }}>Start training
    <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
    </Button>
</div>