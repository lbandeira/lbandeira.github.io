<template>
  <div class="flex min-h-screen bg-[#F3EBEB] text-gray-800">
    <!-- Sidebar
    <nav class="w-60 bg-[#C4E3D0] p-6 space-y-6 sticky top-0 h-screen">
      <h2 class="text-xl font-bold mb-4 text-[#A6D0E4]">lbandeira</h2>
      <ul class="space-y-2 text-[#444]">
        <li><a href="#about" class="hover:text-[#F99D9D] hover:underline">Sobre mim</a></li>
        <li><a href="#projects" class="hover:text-[#F99D9D] hover:underline">Projetos</a></li>
        <li><a href="#experience" class="hover:text-[#F99D9D] hover:underline">Experiência</a></li>
        <li><a href="#publications" class="hover:text-[#F99D9D] hover:underline">Publicações</a></li>
        <li><a href="#contact" class="hover:text-[#F99D9D] hover:underline">Contato</a></li>
      </ul>
    </nav> -->

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-8 space-y-24">
      <NuxtPage />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style>
/* Tipografia global (pode ser adaptada ao tailwind.config se desejar) */
body {
  font-family: 'Inria Sans', sans-serif;
  line-height: 1.6;
  background-color: #F3EBEB; /* soft background */
}
</style>
