<script>
    import { Heading, P, A } from 'flowbite-svelte';
    import { ChevronRightSolid } from 'flowbite-svelte-icons';
</script>

<div class="grid grid-cols-2 min-h-screen mx-6">
    <div class="flex flex-col justify-center">
        <!-- Rimuoviamo la parte sinistra del layout -->
    </div>
    <div class="flex flex-col justify-center">
        <!-- Aggiungiamo la parte destra del layout -->
        <div class="text-right">
            <Heading tag="h2" customSize="text-5xl font-extrabold">Create your workout plan</Heading>
            <P class="my-6 text-gray-500">Start developing with an open-source library of over 450+ UI components, sections, and pages built with the utility classes from Tailwind CSS and designed in Figma.</P>
            <P class="mb-6">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.</P>
            <A class="text-blue-500">
                Read more
                <ChevronRightSolid class="w-3.5 h-3.5 ms-2" />
            </A>
        </div>
    </div>
</div>
