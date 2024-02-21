<script>
    import { page } from '$app/stores';
    import { writable } from 'svelte/store'; // Import writable store
    import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';

    // Create a writable store to manage the active sidebar item
    const activeDay = writable(null);

    // Define the array of days
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Subscribe to changes in the active URL
    $: activeUrl = $page.url.pathname;

    // Function to handle sidebar item clicks
    function handleSidebarItemClick(day) {
        // Update the activeDay store with the clicked day
        activeDay.set(day);
    }

    // Define components for different interfaces
    // For demonstration purposes, let's define simple components
    // You can replace them with your actual interface components

    // Interface component for each day
    // We will use a dynamic component to render different interfaces for different days
    // let DayInterface = ({ day }) => {
    //     return (
    //         <div>
    //             <h1>{day}'s Interface</h1>
    //             <!-- Add content here -->
    //         </div>
    //     );
    // };

</script>

<!-- Sidebar component -->

<div class="flex space-x-4">
    <Sidebar {activeUrl}>
        <SidebarWrapper>
            <SidebarGroup>
                <!-- Use a foreach loop to render sidebar items for each day -->
                {#each daysOfWeek as day}
                    <SidebarItem label={day} on:click={() => handleSidebarItemClick(day)}>
                        <!-- Use slot to customize the sidebar item icon -->
                    </SidebarItem>
                {/each}
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
    
    <!-- Render interface based on the active sidebar item -->
    <p class="text-xl font-medium">My plane</p>
    {#if $activeDay}
        <!-- Render the interface for the active day -->
        <p class="text-lg font-normal">{$activeDay}'s Workout plan</p>
    {/if}
</div>
