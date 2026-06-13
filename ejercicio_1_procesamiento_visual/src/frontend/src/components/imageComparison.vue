<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in">
    
    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Original</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.original)" alt="Original" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-slate-500"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Escala de Grises</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.grises)" alt="Escala de grises" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-purple-500"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Espacio HSV</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.hsv)" alt="HSV" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-teal-500"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Suavizado (Blur)</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.suavizado)" alt="Suavizado" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Detección de Bordes</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.bordes)" alt="Bordes" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

    <div class="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-700/80 group">
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <h2 class="text-sm font-semibold tracking-wide text-slate-300 uppercase">Segmentación</h2>
      </div>
      <div class="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-900/50 h-64 w-full">
        <img :src="cleanUrl(results.segmentacion)" alt="Segmentación" class="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  results: Object
});

// Esta función le añade un parámetro único a la URL para forzar al navegador a renderizar la nueva imagen
const cleanUrl = (url) => {
  if (!url) return '';
  // Si la URL ya tiene parámetros, añade un &, de lo contrario añade un ?
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${Date.now()}`;
};
</script>