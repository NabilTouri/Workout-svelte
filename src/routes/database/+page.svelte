<script>
  export let data;
  const day = data.day;
  const training = data.training;
  const muscles = data.muscles;
  const exercises = data.exercises;
  import { Section } from "flowbite-svelte-blocks";
  import { PlusSolid } from 'flowbite-svelte-icons';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button, Label, Input, Select, Textarea } from "flowbite-svelte";
  import { writable } from 'svelte/store';

  // Inizializza i writable store
  const selectedItem = writable('');
  const dayForm = writable('');
  const exerciseForm = writable('');
  const setsForm = writable('');
  const repetitionForm = writable('');
  const userForm = writable('');
  const selectedMuscle = writable('');
  const selectedExercise = writable('');
  const filteredExercises = writable([]);

  // Funzione per gestire il click su un SidebarItem
  function handleSidebarItemClick(name) {
    selectedItem.set(name);
  }

  // Funzione per filtrare gli esercizi in base al muscolo selezionato
  function filterExercises() {
    const filtered = exercises.filter(exercise => exercise.muscle === $selectedMuscle);
    filteredExercises.set(filtered);
    console.log(filtered);
  }


  // Funzione per inviare i dati del form
  function post() {
    fetch("/api/database", {
      method: "POST",
      body: JSON.stringify({
        day_id: dayForm,
        exercise_id: exerciseForm,
        sets: setsForm,
        repetitions: repetitionForm,
        user_id: userForm
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  // Esegui il filtro degli esercizi una volta che il componente è stato montato
  let formVisible = false;

  // Funzione per attivare o disattivare l'overlay
  function toggleOverlay() {
    formVisible = !formVisible;
  }
</script>

<div class="flex bg-gray-50 p-10">
  <Section name="tableheader" sectionClass="bg-gray-50 dark:bg-gray-900 flex h-full py-4">
    <Sidebar>
      <SidebarWrapper class="bg-white">
        <SidebarGroup>
          {#each day as item}
            <SidebarItem label={item.name} on:click={() => handleSidebarItemClick(item.name)} key={item.id}></SidebarItem>
            {#if item.name != "Sunday"}
              <hr>
            {/if}
          {/each}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Section>

  <Section name="advancedTable" classSection='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 w-full px-10'>
    {#if $selectedItem !== ''}  
      <Button on:click={toggleOverlay}>
        <PlusSolid class="h-3.5 w-3.5 mr-2" />Add product
      </Button>
      {#each day as dayName}
        {#if $selectedItem === dayName.name}
          <Table>
            <TableHead>
              <TableHeadCell padding="px-4 py-3" scope="col">Day</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Exercise</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Sets</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Repetitions</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
              {#each training as item}
                {#if item.day === dayName.name}
                  <TableBodyRow>
                    <TableBodyCell tdClass="px-4 py-3">{item.day}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.exercise}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.sets}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.repetitions}</TableBodyCell>
                  </TableBodyRow>
                {/if}
              {/each}
            </TableBody>
          </Table>
        {/if}   
      {/each}
    {:else}
      <p>select a day</p>
    {/if}
  </Section>
</div>

<Section name="crudcreateform">
  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new exercise</h2>
  <form on:submit={post}>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="w-full">
        <Label>
          muscles
          <Select class="mt-2" bind:value={$selectedMuscle} on:change={filterExercises} required>
            {#each muscles as item}
              <option value={item.muscle}>{item.muscle}</option>
            {/each}
          </Select>
        </Label>
      </div>
      <div class="w-full">
        <Label>
          Exercise
          <Select class="mt-2" bind:value={$selectedExercise}>
            {#each $filteredExercises as { id, name }}
              <option value={id}>{name}</option>
            {/each}
          </Select>
        </Label>
      </div>
      
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">day_id</Label>
        <Input bind:value={$dayForm} type="text" id="day" placeholder="Type product name"  />
      </div>
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">exercise</Label>
        <Input bind:value={$exerciseForm} type="text" id="exercise" placeholder="Type product name"  />
      </div>
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">sets</Label>
        <Input bind:value={$setsForm} type="text" id="set" placeholder="Type product name"  />
      </div>
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">repetition</Label>
        <Input bind:value={$repetitionForm} type="text" id="repetition" placeholder="Type product name"  />
      </div>
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">user</Label>
        <Input bind:value={$userForm} type="text" id="user" placeholder="Type product name"  />
      </div>
      <Button type="submit" class="w-32">Add product</Button>
    </div>
  </form>
</Section>

{#if formVisible}
<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
  <!-- Contenuto dell'overlay -->
  <div class="bg-white p-8 rounded shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Contenuto dell'overlay</h2>
    <p class="text-lg">Questo è il contenuto dell'overlay.</p>
  </div>
</div>
{/if}
