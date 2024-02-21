<script>
    export let data
    const exercises = data.exercises
    const Component = data.Component
</script>

<h1>{data.title}</h1>
{#each exercises as exercise}
    <div>
        <Component {exercise} />
    </div>
{/each}