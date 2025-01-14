<script setup lang="ts">
import { TextareaStyle } from "primevue";

interface Restaurante {
  id?: number;
  nome: string;
}

definePageMeta({
  middleware: "auth",
});

const restaurantes = ref<any[]>([]);
const selectedRestaurante = ref<Restaurante | null>({ nome: "" });
const filteredRestaurantes = ref<Restaurante[]>([]);
const toast = useToast();

// const initialValues = ref({
//     restaurante: { id:'',name: '' }
// });

interface Restaurante {
  id?: number;
  nome: string;
}

const client = useSupabaseClient<{
  restaurantes: Restaurante;
}>();
// function getRestaurants() {
//     return client.from('restaurantes').select('*')
// }
async function fetchRestaurants() {
  const { data, error } = await client.from("restaurantes").select("*");
  if (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
  } else {
    restaurantes.value = data || [];
  }
  return data;
}

// const {data: dbRestaurantes, error} = await useAsyncData('restaurants', async () => getRestaurants().then(res => res.data))

onMounted(() => {
  fetchRestaurants();
});

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredRestaurantes.value = [...restaurantes.value];
    } else {
      filteredRestaurantes.value = restaurantes.value.filter((restaurante) => {
        return restaurante.nome
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const addRestaurantModal = ref(false);

const addRestaurant = async () => {
  if (selectedRestaurante.value) {
    const { data, error } = await client
      .from("restaurantes")
      .insert({ nome: selectedRestaurante.value })
      .select();
    if (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    } else {
      console.log(data);
      fetchRestaurants();
      selectedRestaurante.value = data[0];
      form.selectedRestaurante = data[0].id;
      toast.add({
        severity: "success",
        summary: "Success",
        detail: `Restaurante ${data[0].nome}com sucesso`,
        life: 3000,
      });
    }
  }
  addRestaurantModal.value = false;
};

const comments = computed(() => {
    let summary = `
    Review de Parmegiana
    Restaurante: ${form.selectedRestaurante?.nome || ''}
    Prato: ${form.prato}
    Preço: R$ ${form.preco} \n
    Carne e crosta: ${form.carne}/5
    ${form.obs_carne} \n
    Molho: ${form.molho}/5
    ${form.obs_molho} \n
    Acompanhamentos e apresentação: ${form.acompanhamentos}/5
    ${form.obs_acompanhamentos} \n
    Ambiente, atendimento e preços: ${form.restaurante}/5
    ${form.obs_restaurante} \n
    `
    return summary
})

const form = reactive({
    selectedRestaurante: null as Restaurante | null,
    carne: 2,
    molho: 2,
    acompanhamentos:3,
    restaurante:3,
    preco:85,
    particular:2,
    obs_carne:'Ponto estava perfeito, suculenta e bem temperada. A crosta estava crocante',
  obs_molho:'Bastante molho e bem temperado. ',
  obs_acompanhamentos:'Acompanhamentos bem feitos e saborosos. Pratos bem apresentados',
  obs_restaurante:'Ambiente agradável, atendimento rápido e cordial. Preço justo, serve bem 2 pessoas',
    prato: 'Filé Parmegiana',
    files: [] as string[],
})

const initialValues = ref({
  carne: 2,
  molho: 2,
  restaurantes:3,
  preco:52,
  acompanhamentos:3,
  particular:2,
  obs_carne:'Ponto estava perfeito, suculenta e bem temperada',
  obs_molho:'Bastante molho e bem temperado. A crosta estava crocante',
  obs_restaurantes:'Ambiente agradável, atendimento rápido e cordial',
  obs_preco:'Serve bem 2 pessoas, preço justo',
  obs_acompanhamentos:'Acompanhamentos bem feitos e saborosos',
  obs_particular:'Achei o prato um pouco salgado',
  prato: 'TESTE',
});

const onFormSubmit = (e) => {
    // e.originalEvent: Represents the native form submit event.
    // e.valid: A boolean that indicates whether the form is valid or not.
    // e.states: Contains the current state of each form field, including validity status.
    // e.errors: An object that holds any validation errors for the invalid fields in the form.
    // e.values: An object containing the current values of all form fields.
    // e.reset: A function that resets the form to its initial state.

    if (e.valid) {
        // toast.add({ severity: 'success', summary: e.values, life: 3000 });
        toast.add({ severity: 'success', summary: 'Form Submitted', detail: JSON.stringify(form), life: 3000 });
    }
};

// Reactive State
const files = ref([]); // Stores selected files
const previews = ref([]); // Stores preview URLs
const isUploading = ref(false); // Indicates upload status
const statusMessage = ref(''); // Stores status messages

// Handle File Selection
const handleFiles = (event) => {
  files.value = Array.from(event.target.files); // Store selected files
  previews.value = files.value.map((file) => URL.createObjectURL(file)); // Generate previews
};

// Upload Files
const uploadFiles = async () => {
  if (!files.value.length) {
    statusMessage.value = 'Please select files first.';
    return;
  }

  isUploading.value = true;
  statusMessage.value = '';

  try {
    const uploadPromises = files.value.map((file) => uploadToSupabase(file));
    const results = await Promise.all(uploadPromises);
    statusMessage.value = `Successfully uploaded ${results.length} files.`;
    toast.add({ severity: 'success', summary: 'Uploaded', detail: JSON.stringify(results), life: 3000 });
  } catch (error) {
    statusMessage.value = 'An error occurred during upload.';
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
    console.error(error);
  } finally {
    isUploading.value = false;
  }
};

// Upload to Supabase
const uploadToSupabase = async (file) => {
  const filePath = `${file.name}`; // Define file path in the bucket
  const { data, error } = await client.storage
    .from('parmegianas') // Replace with your bucket name
    .upload(filePath, file);

  if (error) {
    throw new Error(`Failed to upload ${file.name}: ${error.message}`);
  }

  form.files.push(data.fullPath);

  return data;
};

</script>

<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      @submit="onFormSubmit"
      :initialValues="initialValues"
      class="flex justify-center flex-col gap-2 w-full md:w-64"
    >
      <div class="flex flex-col mb-4">
        <AutoComplete
          name="restaurante"
          optionLabel="nome"
          placeholder="Restaurante"
          dropdown
          :suggestions="filteredRestaurantes"
          v-model="form.selectedRestaurante"
          
          @complete="search"
        >
          <template #footer>
            <div class="px-3 py-3">
              <Button
                label="Add New"
                fluid
                severity="secondary"
                text
                size="small"
                icon="pi pi-plus"
                @click="addRestaurantModal = true"
              />
            </div>
          </template>
        </AutoComplete>
        <Message v-if="$form.restaurante?.invalid" severity="error" size="small" variant="simple">{{ $form.restaurante.error.message }}</Message>

        <Dialog
          v-model:visible="addRestaurantModal"
          header="Edit Profile"
          :style="{ width: '25rem' }"
        >
          <div class="flex items-center gap-4 mb-4">
            <label for="restaurante" class="font-semibold w-24"
              >Nome do restaurante</label
            >
            <InputText
              id="restaurante"
              class="flex-auto"
              type="texts"
              v-model="selectedRestaurante"
            />
          </div>
          <div class="flex justify-end gap-2">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              @click="addRestaurantModal = false"
            ></Button>
            <Button type="button" label="Save" @click="addRestaurant"></Button>
          </div>
        </Dialog>
        <Message
          v-if="$form.restaurante?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.restaurante.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-8">
        <FloatLabel variant="over">
          <InputText id="prato" name="prato" type="text" v-model="form.prato"/>
          <label for="prato">Nome do prato</label>
        </FloatLabel>
        <FloatLabel>    
            <label for="over_label">Preço</label>
          <InputNumber name="preco" type="number" prefix="R$" v-model.number="form.preco"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber name="carne" type="number" :min=0 :max=5 :step=1 v-model.number="form.carne"/>
          <label for="carne">Nota carne e crosta 0 a 5</label>
          <Textarea name="obs_carne" rows="5" cols="30" style="resize: none" v-model="form.obs_carne"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber name="molho" type="number" :min="0"
      :max="5"
      :step="1" v-model.number="form.molho"/>
          <label for="molho">Nota molho 0 a 5</label>
          <Textarea name="obs_molho" rows="5" cols="30" style="resize: none" v-model="form.obs_molho"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber
            name="acompanhamentos"
            type="number" :min="0"
      :max="5"
      :step="1"
      v-model.number="form.acompanhamentos"
                      />
          <label for="acompanhamentos">Nota acompanhamentos 0 a 5</label>
          <Textarea name="obs_acompanhamentos" rows="5" cols="30" style="resize: none" v-model="form.obs_acompanhamentos"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber
            name="nota_restaurante"
            type="number" :min=0
      :max=5
      :step=1
      v-model="form.restaurante"
                      />
                      <label for="nota_restaurante">Nota restaurante 0 a 5</label>
                      <Textarea name="obs_restaurante" rows="5" cols="30" style="resize: none" v-model="form.obs_restaurante"/>
          
        </FloatLabel variant="over">
      </div>
      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-4">Upload Multiple Images</h2>

    <!-- File Input -->
    <input
      type="file"
      multiple
      accept="image/*"
      @change="handleFiles"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />

    <!-- Preview -->
    <div v-if="previews.length" class="mt-6 grid grid-cols-3 gap-4">
      <div v-for="(preview, index) in previews" :key="index">
        <img :src="preview" alt="Preview" class="w-full h-32 object-cover rounded-lg shadow-md" />
      </div>
    </div>

    <!-- Upload Button -->
    <button
      @click="uploadFiles"
      :disabled="isUploading || !files.length"
      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
    >
      {{ isUploading ? "Uploading..." : "Upload Images" }}
    </button>

    <!-- Status -->
    <p v-if="statusMessage" class="mt-4 text-sm text-gray-600">{{ statusMessage }}</p>
  </div>
 

<div>
    <span class="test">
        urls: {{ form.files }}
    </span>
</div>
<span class="test">
    {{ comments }}
</span>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
    <Toast />
  </div>
</template>

<style>
  .test {
    white-space: pre-line; /* Treat \n as a line break */
  }
</style>
