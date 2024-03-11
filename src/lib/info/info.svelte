<script>
    import { Heading, P, A, Img } from 'flowbite-svelte';
    import { ChevronRightSolid } from 'flowbite-svelte-icons';
    import { goto, preloadCode } from '$app/navigation';

</script>   

<div class="bg-gradient-to-b from-dark-700 to-dark-800 grid grid-cols-1 sm:grid-cols-2 min-h-screen">
    <div class="flex flex-col justify-center mx-6 sm:mx-12">
        <Heading tag="h2" class="text-white" customSize="text-5xl font-extrabold">Create your workout plan</Heading>
        <P class="my-6 text-white">Transform your fitness goals into reality with our comprehensive workout planning tool. Explore a wide range of exercises, adjust intensity levels, and personalize your schedule to fit your lifestyle. Whether you're aiming to build strength, increase flexibility, or boost endurance, our platform provides the guidance and flexibility you need to succeed. Start creating your customized workout plan today and embark on your journey to a healthier, happier you.</P>
        
        <A on:focus={async () => {
            await preloadCode('/training');
        }}
        on:mouseover={async () => {
            await preloadCode('/training');
        }}
        on:click={() => {
            goto('/training');
        }} class="bg-clip-text from-primary-600 to-primary-800">
            start training
            <ChevronRightSolid class="w-3.5 h-3.5 ms-2" />
        </A>
    </div>

    <div class="hidden sm:flex items-center justify-center">
        <Img src="src\lib\img\dumbells.png" alt="Description of the image" />
    </div>
</div>
