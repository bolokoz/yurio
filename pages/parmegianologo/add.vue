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

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};

const onAdvancedUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
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

// const selectedTemplate = ref(null);
// const templates = ref([
//   { name: "template 1", code: "1" },
//   { name: "template 2", code: "2" },
//   { name: "template 3", code: "3" },
// ]);

// function onSelectedTemplate() {
//   console.log(selectedTemplate.value);
// }

const comments = computed(() => {
    let summary = `
    Review de Parmegiana
    Restaurente: ${selectedRestaurante.value?.nome || ''}
    Prato: ${form.prato} \n
    Carne e crosta: ${form.carne}/5
    ${form.obs_carne} \n
    Molho: ${form.molho}/5
    ${form.obs_molho} \n
    Acompanhamentos: ${form.acompanhamentos}/5
    ${form.obs_acompanhamentos} \n
    Ambiente e atendimento: ${form.restaurante}/5
    ${form.obs_restaurante} \n
    Conclusões: ${form.preco}/5
    ${form.obs_preco} \n
    `
    return summary
})

const form = reactive({
    selectedRestaurante: null,
    carne: 2,
    molho: 2,
    acompanhamentos:3,
    restaurante:3,
    preco:25,
    particular:2,
    obs_carne:'Ponto estava perfeito, suculenta e bem temperada. A crosta estava crocante',
  obs_molho:'Bastante molho e bem temperado. ',
  obs_acompanhamentos:'Acompanhamentos bem feitos e saborosos',
  obs_restaurante:'Ambiente agradável, atendimento rápido e cordial',
  obs_preco:'Serve bem 2 pessoas, preço justo',
  obs_particular:'Achei o prato um pouco salgado',
    prato: 'Filé Parmegiana',
    files: null,
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
</script>

<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      @submit="onFormSubmit"
      :initialValues="initialValues"
      class="flex justify-center flex-col gap-4 w-full md:w-56"
    >
      <div class="flex flex-col gap-1">
        <AutoComplete
          name="restaurante"
          optionLabel="nome"
          placeholder="Restaurante"
          dropdown
          :suggestions="filteredRestaurantes"
          v-model="selectedRestaurante"
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
        <Dialog
          v-model:visible="addRestaurantModal"
          header="Edit Profile"
          :style="{ width: '25rem' }"
        >
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24"
              >Nome do restaurante</label
            >
            <InputText
              id="nome"
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
          <InputText name="prato" type="text" v-model="form.prato"/>
          <label for="over_label">Nome do prato</label>
        </FloatLabel>
        <FloatLabel>    
            <label for="over_label">Preço</label>
          <InputNumber name="preco" type="number" prefix="R$" v-model.number="form.preco"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputText name="carne" type="number" :min=0 :max=5 :step=1 v-model="form.carne"/>
          <label for="over_label">Nota carne e crosta 0 a 5</label>
          <Textarea name="obs_carne" rows="5" cols="30" style="resize: none" v-model="form.obs_carne"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber name="molho" type="number" :min="0"
      :max="5"
      :step="1" v-model="form.molho"/>
          <label for="over_label">Nota molho 0 a 5</label>
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
          <label for="over_label">Nota acompanhamentos 0 a 5</label>
          <Textarea name="obs_acompanhamentos" rows="5" cols="30" style="resize: none" v-model="form.obs_acompanhamentos"/>
        </FloatLabel>
        <FloatLabel variant="over">
          <InputNumber
            name="restaurante"
            type="number" :min=0
      :max=5
      :step=1
      v-model="form.restaurante"
                      />
                      <label for="over_label">Nota restaurante 0 a 5</label>
                      <Textarea name="obs_restaurante" rows="5" cols="30" style="resize: none" v-model="form.obs_restaurante"/>
          
        </FloatLabel variant="over">
        <FloatLabel variant="over">
          <InputNumber
            name="particular"
            type="number" :min="0"
      :max="5"
      :step="1"
                      />
                      <Textarea name="obs_particular" rows="5" cols="30" style="resize: none" v-model="form.obs_particular" />
          <label for="over_label">Nota particular 0 a 5</label>
        </FloatLabel>
      </div>

      <!-- <div class="felx flex-col gap-1">
        <Textarea name="obs" rows="5" cols="30" style="resize: none" />
      </div> -->

      <div class="flex flex-col gap-1">
        <FileUpload
          name="demo[]"
          url="/api/upload"
          @upload="onAdvancedUpload($event)"
          :multiple="true"
          accept="image/*"
          :maxFileSize="1000000"
          v-model="files"
        >
        <template #empty>
            <span>Drag and drop files to here to upload.</span>
        </template>
    </FileUpload>
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
