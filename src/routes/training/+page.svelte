<script>
  export let data;
  const day = data.day;
  const training = data.training;
  const muscles = data.muscles;
  const exercises = data.exercises;
  const userForm = data.userForm;
  let popupModal = false;
  let postModal = false;
  let putModal = false;
  import { Section } from "flowbite-svelte-blocks";
  import { PlusSolid, TrashBinOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button, Label, Input, Select, Modal, A, P } from "flowbite-svelte";
  import { writable } from 'svelte/store';

  // Inizializza i writable store
  const idForm = writable('');
  const selectedItem = writable('');
  const dayForm = writable('');
  const exerciseForm = writable('');
  const setsForm = writable('');
  const repetitionForm = writable('');
  const selectedMuscle = writable('');
  const filteredExercises = writable([]);

  const trainingById = training.filter(item => item.user_id === userForm);

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
  putModal = false; // Imposta putModal su false
  idForm.set(id);
}

  function putModalFunction(id) {
    putModal = true;
    idForm.set(id);
  }

  // Funzione per inviare i dati del form
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

  function post() {
  fetch("/api/database", {
    method: "POST",
    body: JSON.stringify({
      day_id: $dayForm,
      exercise_id: $exerciseForm,
      sets: $setsForm,
      repetitions: $repetitionForm,
      user_id: userForm
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    // Apre un alert all'interno del modal
    
      location.reload(); // Ricarica la pagina
     // Tempo in millisecondi prima della chiusura automatica del modal
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function put() {
  fetch("/api/database", {
    method: "PUT",
    body: JSON.stringify({
      id: $idForm,
      day_id: $dayForm,
      exercise_id: $exerciseForm,
      sets: $setsForm,
      repetitions: $repetitionForm,
      user_id: userForm
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    // Apre un alert all'interno del modal
    
      location.reload(); // Ricarica la pagina
     // Tempo in millisecondi prima della chiusura automatica del modal
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
</script>

<div class="flex flex-col sm:flex-row bg-gradient-to-b from-dark-700 to-dark-800 p-10">
  <!-- Sidebar -->
  <Section name="tableheader" sectionClass="flex flex-col items-center mb-8 sm:mb-0 sm:mr-4">
    <Sidebar>
      <SidebarWrapper class="bg-dark-800 border">
        <SidebarGroup>
          {#each day as item}
            <SidebarItem class="text-white hover:bg-gray-600" label={item.name} on:click={() => handleSidebarItemClick(item.name, item.id)} key={item.id}></SidebarItem>
            {#if item.name != "Sunday"}
              <hr>
            {/if}
          {/each}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Section>
  

  <Section name="advancedTable" classSection="sm:p-5 w-full px-4 sm:px-10">
    {#if $selectedItem !== ''}
      <div class="grid gap-8">
        <!-- Bottone per aggiungere un esercizio -->
        <Button on:click={() => (postModal = true)} class="bg-gradient-to-r from-primary-600 to-primary-800">
          <PlusSolid class="h-3.5 w-3.5 mr-2" />Add exercise
        </Button>
        {#each day as dayName}
          {#if $selectedItem === dayName.name}
          <div class="border rounded overflow-hidden">
            <Table class="bg-black" hoverable>
              <TableHead class="bg-black">
                <TableHeadCell padding="px-4 py-3" scope="col" class="text-white">Day</TableHeadCell>
                <TableHeadCell padding="px-4 py-3" scope="col" class="text-white">Exercise</TableHeadCell>
                <TableHeadCell padding="px-4 py-3" scope="col" class="text-white">Sets</TableHeadCell>
                <TableHeadCell padding="px-4 py-3" scope="col" class="text-white">Repetitions</TableHeadCell>
              </TableHead>
              <TableBody>
                {#each trainingById as item}
                  {#if item.day === dayName.name}
                  <TableBodyRow class="bg-dark-900 hover:bg-gray-800">
                    <TableBodyCell tdClass="px-4 py-3" class="text-white">{item.day}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3" class="text-white">{item.exercise}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3" class="text-white">{item.sets}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-3" class="text-white">{item.repetitions}</TableBodyCell>
                    <!-- Azioni -->
                    <TableBodyCell tdClass="px-4 py-3" class="text-white">
                      <div class="flex flex-row justify-center md:justify-start gap-2">
                        <!-- Bottone per eliminare -->
                        <TrashBinOutline class="cursor-pointer" on:click={(e) => { e.stopPropagation(); trashBin(item.id); }} />
                        <!-- Bottone per modificare -->
                        <A class="cursor-pointer no-underline" on:click={() => putModalFunction(item.id)}><P class="text-white" weight="black">Edit</P></A>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
                  {/if}
                {/each}
              </TableBody>
            </Table>
          </div>
          {/if}   
        {/each}
      </div>
    {:else}
    <div class="flex items-center justify-center h-64">
      <p class="text-lg text-gray-500">Please select a day</p>
    </div>
    {/if}
  </Section>
  
</div>

<Modal class="bg-dark-800" bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-primary-500 w-12 h-12" />
    <h3 class="mb-5 text-lg font-normal text-white">Are you sure you want to delete this exercise?</h3>
    <Button on:click={() => deleteItem($idForm)} color="red" class="me-2 bg-red-500 hover:bg-red-600">Yes, I'm sure</Button>
    <Button color="alternative" class="bg-white hover:text-black hover:bg-dark-400">No, cancel</Button>
  </div>
</Modal>

<Section name="crudcreateform">
  <Modal bind:open={postModal} size="s" class="bg-dark-800 w-full xl:w-2/4">
    <div id="postModalContent">
        <form class="flex flex-col space-y-6" on:submit={post}>
          <h3 class="mb-4 text-xl font-medium text-white">Add a new exercise</h3>
        <div class="grid gap-4 grid-cols-1 sm:gap-6">
          <div class="grid gap-4 grid-cols-2">
          <div>
            <Label class="text-white">
              Muscles
              <Select class="mt-2 w-full" bind:value={$selectedMuscle} on:change={filterExercises} required>
                {#each muscles as item}
                  <option value={item.muscle}>{item.muscle}</option>
                {/each}
              </Select>
            </Label>
          </div>
          <div>
            <Label class="text-white">
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
              <Label class="text-white" for="set">Sets</Label>
              <Input bind:value={$setsForm} type="text" id="set" placeholder="Enter number of sets" required class="w-full" />
            </div>
            <div>
              <Label class="text-white" for="repetition">Repetitions</Label>
              <Input bind:value={$repetitionForm} type="text" id="repetition" placeholder="Enter number of repetitions" required class="w-full" />
            </div>
          </div>
          <Button type="submit" class="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">Add Exercise</Button>
        </div>
      </form>
    </div> 
    </Modal>
</Section>

<Section name="crudcreateform">
  <Modal bind:open={putModal} size="s" class="bg-dark-800 w-full xl:w-2/4">
    <div id="putModalContent">
    <form class="flex flex-col space-y-6" on:submit={put}>
      <h3 class="mb-4 text-xl font-medium text-white">Update a new exercise</h3>
      <div class="grid gap-4 grid-cols-1 sm:gap-6">
        <div class="grid gap-4 grid-cols-2">
          <div>
            <Label class="text-white">
              Muscles
              <Select class="mt-2 w-full" bind:value={$selectedMuscle} on:change={filterExercises} required>
                {#each muscles as item}
                <option value={item.muscle}>{item.muscle}</option>
                {/each}
              </Select>
            </Label>
          </div>
          <div>
            <Label class="text-white">
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
            <Label class="text-white" for="set">Sets</Label>
            <Input bind:value={$setsForm} type="text" id="set" placeholder="Enter number of sets" required class="w-full" />
          </div>
          <div>
            <Label class="text-white" for="repetition">Repetitions</Label>
            <Input bind:value={$repetitionForm} type="text" id="repetition" placeholder="Enter number of repetitions" required class="w-full" />
          </div>
        </div>
        <Button type="submit" class="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">Update Exercise</Button>
      </div>
    </form>
  </div>
  </Modal>
</Section>
