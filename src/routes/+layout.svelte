<script>
	import '../app.pcss';
	import { page } from '$app/stores';
	import Header from '$lib/header.svelte';
	// import Footer from '$lib/footer.svelte';

	export let data
	const cookie = data.cookie

	const getSessionToken = async () => {
        return cookie
    }

	const logout = async () => {
		fetch('/api/cookies', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
    	.then((json) => {
      		console.log(json);
    	})
    	.then(() => location.reload());
	}

</script>

<svelte:head>
	<title>{$page.data.title || 'Workout Plan'}</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full">
	{#if !$page.error}
	<Header {getSessionToken} {logout}/>
	{/if}

	<div class="flex-grow bg-dark-800">
		<slot />
	</div>

	<!-- {#if !$page.error}
	<Footer />
	{/if} -->
</div>