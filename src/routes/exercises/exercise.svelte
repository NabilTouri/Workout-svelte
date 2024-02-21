<script>
    export let exercise
</script>

<a href={`/exercises/${exercise.id}`}>
    <h2>{exercise.name}</h2>
</a>
<p>{exercise.muscle}</p>
<hr />