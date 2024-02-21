<script>
    export let data
    const products = data.products
    const Component = data.Component
    // const username = data.username
</script>

<h1>{data.title} <!-- for {username} --></h1>
{#each products as product}
    <div>
        <Component {product} />
    </div>
{/each}