<script>
  export let data;
  const day = data.day;
  const training = data.training;
  const muscles = data.muscles;
  const exercises = data.exercises;
  let popupModal = false;
  let postModal = false;
  let putModal = false;
  import { Section } from "flowbite-svelte-blocks";
  import { PlusSolid, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button, Label, Input, Select, Modal } from "flowbite-svelte";
  import { writable } from 'svelte/store';

  // Inizializza i writable store
  const idForm = writable('');
  const selectedItem = writable('');
  const dayForm = writable('');
  const exerciseForm = writable('');
  const setsForm = writable('');
  const repetitionForm = writable('');
  const userForm = writable('1');
  const selectedMuscle = writable('');
  const filteredExercises = writable([]);

  // Funzione per gestire il click su un SidebarItem
  function handleSidebarItemClick(name, id) {
    dayForm.set(id);
    selectedItem.set(name);
  }

  // Funzione per filtrare gli esercizi in base al muscolo selezionato
  function filterExercises() {
    const filtered = exercises.filter(exercise => exercise.muscle === $selectedMuscle);
    filteredExercises.set(filtered);
  }

  function trashBin(id) {
    console.log(id);
    popupModal = true;
    idForm.set(id);
  }

  function putModalFunction(id) {
    putModal = true;
    idForm.set(id);
  }

  // Funzione per inviare i dati del form
  function post() {
    fetch("/api/database", {
      method: "POST",
      body: JSON.stringify({
        day_id: $dayForm,
        exercise_id: $exerciseForm,
        sets: $setsForm,
        repetitions: $repetitionForm,
        user_id: $userForm
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return new Promise(resolve => {
      resolve(alert("Exercise added successfully"));
    });
    })
    .then(() => location.reload());

  }

  function deleteItem(idItem){
    fetch("/api/database", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idItem })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return new Promise(resolve => {
      resolve(alert("Exercise deleted successfully"));
    });
    })
    .then(() => location.reload());

  }

  function put() {
    console.log("PUT");
    fetch("/api/database", {
      method: "PUT",
      body: JSON.stringify({
        id: $idForm,
        day_id: $dayForm,
        exercise_id: $exerciseForm,
        sets: $setsForm,
        repetitions: $repetitionForm,
        user_id: $userForm
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return new Promise(resolve => {
      resolve(alert("Exercise updated successfully"));
    });
    })
    .then(() => location.reload());
    
  }
</script>

<div class="flex bg-gray-50 p-10">
  <Section name="tableheader" sectionClass="bg-gray-50 dark:bg-gray-900 flex h-full py-4">
    <Sidebar>
      <SidebarWrapper class="bg-white">
        <SidebarGroup>
          {#each day as item}
            <SidebarItem label={item.name} on:click={() => handleSidebarItemClick(item.name, item.id)} key={item.id}></SidebarItem>
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
      <Button on:click={() => (postModal = true)}>
        <PlusSolid class="h-3.5 w-3.5 mr-2" />Add exercise
      </Button>
      {#each day as dayName}
        {#if $selectedItem === dayName.name}
          <Table hoverable>
            <TableHead>
              <TableHeadCell padding="px-4 py-3" scope="col">Day</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Exercise</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Sets</TableHeadCell>
              <TableHeadCell padding="px-4 py-3" scope="col">Repetitions</TableHeadCell>
            </TableHead>
            <TableBody>
              {#each training as item}
                {#if item.day === dayName.name}
                  <TableBodyRow on:click={() => putModalFunction(item.id) }>
                    <TableBodyCell tdClass="px-4 py-3">{item.day}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.exercise}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.sets}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3">{item.repetitions}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3"><TrashBinOutline on:click={() => trashBin(item.id)} /></TableBodyCell>
                  </TableBodyRow>
                {/if}
              {/each}
            </TableBody>
          </Table>
        {/if}   
      {/each}
    {:else}
      <div class="flex items-center justify-center h-64">
        <p class="text-lg text-gray-500">Please select a day</p>
      </div>
    {/if}
  </Section>
</div>

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this esercise?</h3>
    <Button on:click={() => deleteItem($idForm)} color="red" class="me-2">Yes, I'm sure</Button>
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

    <Section name="crudcreateform">
      <Modal bind:open={postModal} size="s" class="w-full xl:w-2/4">
        <form class="flex flex-col space-y-6" on:submit={post}>
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a new exercise</h3>
        <div class="grid gap-4 grid-cols-1 sm:gap-6">
          <div class="grid gap-4 grid-cols-2">
          <div>
            <Label>
              Muscles
              <Select class="mt-2 w-full" bind:value={$selectedMuscle} on:change={filterExercises} required>
                {#each muscles as item}
                  <option value={item.muscle}>{item.muscle}</option>
                {/each}
              </Select>
            </Label>
          </div>
          <div>
            <Label>
              Exercise
              <Select class="mt-2 w-full" bind:value={$exerciseForm}>
                {#each $filteredExercises as { id, name }}
                  <option value={id}>{name}</option>
                {/each}
              </Select>
            </Label>
          </div>
        </div>
          <div class="grid gap-4 grid-cols-2">
            <div>
              <Label for="set">Sets</Label>
              <Input bind:value={$setsForm} type="text" id="set" placeholder="Enter number of sets" required class="w-full" />
            </div>
            <div>
              <Label for="repetition">Repetitions</Label>
              <Input bind:value={$repetitionForm} type="text" id="repetition" placeholder="Enter number of repetitions" required class="w-full" />
            </div>
          </div>
          <Button type="submit" class="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Add Exercise</Button>
        </div>
      </form>
    </Modal>
    </Section>

    <Section name="crudcreateform">
      <Modal bind:open={putModal} size="s" class="w-full xl:w-2/4">
        <form class="flex flex-col space-y-6" on:submit={put}>
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update a new exercise</h3>
        <div class="grid gap-4 grid-cols-1 sm:gap-6">
          <div class="grid gap-4 grid-cols-2">
          <div>
            <Label>
              Muscles
              <Select class="mt-2 w-full" bind:value={$selectedMuscle} on:change={filterExercises} required>
                {#each muscles as item}
                  <option value={item.muscle}>{item.muscle}</option>
                {/each}
              </Select>
            </Label>
          </div>
          <div>
            <Label>
              Exercise
              <Select class="mt-2 w-full" bind:value={$exerciseForm}>
                {#each $filteredExercises as { id, name }}
                  <option value={id}>{name}</option>
                {/each}
              </Select>
            </Label>
          </div>
        </div>
          <div class="grid gap-4 grid-cols-2">
            <div>
              <Label for="set">Sets</Label>
              <Input bind:value={$setsForm} type="text" id="set" placeholder="Enter number of sets" required class="w-full" />
            </div>
            <div>
              <Label for="repetition">Repetitions</Label>
              <Input bind:value={$repetitionForm} type="text" id="repetition" placeholder="Enter number of repetitions" required class="w-full" />
            </div>
          </div>
          <Button type="submit" class="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Update Exercise</Button>
        </div>
      </form>
    </Modal>
    </Section>