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

    let newItem = '';
	
    let todoList = [{}];
	
	function addToList() {
		todoList = [...todoList, {text: newItem, status: false}];
		newItem = '';
	}
	
	function removeFromList(index) {
		todoList.splice(index, 1)
		todoList = todoList;
    }
    
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
        <input bind:value={newItem} type="text" placeholder="new todo item..">
        <button on:click={addToList}>Add</button>

        <br/>
        {#each todoList as item, index}
	        <input bind:checked={item.status} type="checkbox">
	        <span class:checked={item.status}>{item.text}</span>
	        <button on:click={() => removeFromList(index)}>❌</button>
	        <br/>
        {/each}
    {/if}
</div>
