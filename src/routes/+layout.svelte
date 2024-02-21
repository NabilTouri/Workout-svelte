<script>
	import '../app.pcss';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<Header />
  
	<main class="flex-grow">
	  <!-- Your main content goes here -->
		<slot />
	</main>
  
	<Footer />
  </div>