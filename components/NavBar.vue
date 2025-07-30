<template>
  <nav class="bg-[#F3EBEB] shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 text-xl font-bold text-gray-800">
          <NuxtLink to="/">Laís Bandeira</NuxtLink>
        </div>

        <!-- Menu -->
        <div class="hidden md:flex space-x-6">
          <NuxtLink
            to="/"
            class="text-gray-800 hover:text-[#F99D9D] font-medium"
          >
            Sobre
          </NuxtLink>
          <NuxtLink
            to="/experiencia"
            class="text-gray-800 hover:text-[#F99D9D] font-medium"
          >
            Experiência
          </NuxtLink>
          <NuxtLink
            to="/projetos"
            class="text-gray-800 hover:text-[#F99D9D] font-medium"
          >
            Projetos
          </NuxtLink>
          <NuxtLink
            to="/publicacoes"
            class="text-gray-800 hover:text-[#F99D9D] font-medium"
          >
            Publicações
          </NuxtLink>
          <NuxtLink
            to="/contato"
            class="text-gray-800 hover:text-[#F99D9D] font-medium"
          >
            Contato
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
