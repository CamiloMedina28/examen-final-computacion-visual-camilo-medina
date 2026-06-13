<script setup>
import { ref } from "vue";

import UploadCard from "../components/uploadCard.vue";
import ImageComparison from "../components/imageComparison.vue";
import LoadingSpinner from "../components/loading.vue";

import api from "../services/api";

const loading = ref(false);
const results = ref(null);

const imagenes_ejemplo = ["penia.png", "munera.png", "salmona.png"];



const processImage = async (file) => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append(
      "file",
      file
    );
    const response = await api.post(
      "/process",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    results.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const useRandomImage = async () => {
  loading.value = true;

  try{
    const randomIndex = Math.floor(Math.random() * imagenes_ejemplo.length);
    const imagen = imagenes_ejemplo[randomIndex];
    const imageUrl = `/examples/${imagen}`;

    const response = await fetch(imageUrl);

    console.log(response.status);
    console.log(response.headers.get("content-type"));

    if (!response.ok) throw new Error("No se pudo cargar la imagen precargada");
    const blob = await response.blob();
    console.log(blob.size);
    console.log(blob.type);
    const file = new File([blob], imagen, { type: blob.type });
    await processImage(file);
  }catch(error){
    console.error(error);
    loading.value = false;
  }
};
</script>

<template>

<div class="bg-[#030712] rounded-lg px-6 py-8 ring-1 ring-white/5 shadow-2xl min-h-screen flex flex-col items-center justify-center font-sans">

  <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-xl max-w-sm w-full backdrop-blur-sm transition-all duration-300 hover:border-slate-700">
    
    <div class="flex flex-col items-start gap-4 mb-6">
      
      <div class="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>

      <div>
        <h5 class="text-xl text-slate-100 font-semibold tracking-tight">
          Seleccionar imagen
        </h5>
        <p class="mt-1 text-sm text-slate-400">
          Elige o arrastra el archivo que deseas utilizar.
        </p>
      </div>
    </div>
    
    <div class="mt-2">
      <UploadCard @file-selected="processImage" />
    </div>
    <button @click="useRandomImage" type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-500/20 shadow-md hover:shadow-blue-600/10 font-medium rounded-xl text-sm px-4 py-3 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 opacity-90">
        <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
      Usar imagen precargada
    </button>
  </div>

  <Loading Spinnerv-if="loading"/>
  
  <div v-if="results" class="mt-8 max-w-6xl w-full">
  <ImageComparison :results="results" :key="Date.now()" />
</div>
</div>

</template>