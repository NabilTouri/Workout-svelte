<script>
		import '../app.pcss';
		import { page } from '$app/stores';
		import Header from '$lib/header.svelte';
		import Footer from '$lib/footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
		{#if !$page.error}
		<Header />
	{/if}
	
		<main class="flex-grow">
				<!-- Your main content goes here -->
				<slot />
		</main>
	
		{#if !$page.error}
		<Footer />
	{/if}
</div>