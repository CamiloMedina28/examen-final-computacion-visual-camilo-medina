<script setup>
const emit = defineEmits(["file-selected"]);

const handleFile = (event) => {
  const file = event.target.files[0];

  if (file) {
    emit("file-selected", file);
  }
};
</script>

<template>
<div class="flex items-center justify-center w-full max-w-lg mx-auto">
  <label 
    class="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-2xl cursor-pointer bg-blue-50/30 hover:bg-blue-50 transition-all duration-300 group shadow-sm hover:shadow-md hover:border-blue-400"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
      <!-- Icono moderno de subida -->
      <div class="p-3 bg-blue-100 rounded-full text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      </div>
      
      <!-- Textos informativos -->
      <p class="mb-2 text-sm text-gray-700">
        <span class="font-semibold text-blue-600 hover:underline">Haz clic para subir</span> o arrastra y suelta
      </p>
      <p class="text-xs text-gray-500">Solo imágenes (PNG, JPG o GIF)</p>
    </div>

    <!-- El input real oculto pero funcional -->
    <input 
      type="file" 
      accept="image/*" 
      @change="handleFile" 
      class="hidden" 
    />
  </label>
</div>
</template>