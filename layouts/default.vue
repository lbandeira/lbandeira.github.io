<template>
  <div class="flex min-h-screen bg-white text-gray-800">
    <!-- Sidebar -->
    <nav class="w-60 bg-gray-100 p-6 space-y-6 sticky top-0 h-screen">
      <h2 class="text-xl font-bold mb-4">lbandeira</h2>
      <ul class="space-y-2">
        <li><a href="#about" class="hover:underline">Sobre mim</a></li>
        <li><a href="#projects" class="hover:underline">Projetos</a></li>
        <li><a href="#experience" class="hover:underline">Experiência</a></li>
        <li><a href="#publications" class="hover:underline">Publicações</a></li>
        <li><a href="#contact" class="hover:underline">Contato</a></li>
      </ul>
    </nav>

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
/* body {
  font-family: 'Inria Sans', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
} */

header {
  padding: 20px;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 50px;
}

header p {
  font-family: 'Inder', sans-serif;
  margin: 10px 0 0;
}

main {
  margin: 20px;
}

footer {
  text-align: center;
  padding: 10px;
  color: #333;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>