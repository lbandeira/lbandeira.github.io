<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 text-xl font-bold text-blue-600">
          <NuxtLink to="/">Laís Bandeira</NuxtLink>
        </div>

        <!-- Menu -->
        <div class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-500">Início</NuxtLink>
          <NuxtLink to="/sobre" class="text-gray-700 hover:text-blue-500">Sobre</NuxtLink>
          <NuxtLink to="/projetos" class="text-gray-700 hover:text-blue-500">Projetos</NuxtLink>
          <NuxtLink to="/contato" class="text-gray-700 hover:text-blue-500">Contato</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
