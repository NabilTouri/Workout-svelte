<script>
		import '../app.pcss';
		import { page } from '$app/stores';
		import Header from '$lib/header.svelte';
		import Footer from '$lib/footer.svelte';
</script>

<svelte:head>
	<title>{$page.data.title || 'Workout Plan'}</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full">
	{#if !$page.error}
	<Header />
	{/if}

	<main class="flex-grow w-full">
		<!-- Your main content goes here -->
		<slot />
	</main>

	{#if !$page.error}
	<Footer />
	{/if}
</div>