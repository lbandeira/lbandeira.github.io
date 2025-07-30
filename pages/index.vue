<template>
  <div class="bg-[#F3EBEB] min-h-screen">
    <section id="about">
      <BioSection />
    </section>
    <!-- <section id="projects">
      <ProjectsSection />
    </section>
    <section id="experience">
      <ExperienceSection />
    </section>
    <section id="publications">
      <PublicationsSection />
    </section> -->
  </div>
</template>

<script setup>
import BioSection from '~/components/BioSection.vue'
import ProjectsSection from '~/components/ProjectsSection.vue'
// import ExperienceSection from '~/components/ExperienceSection.vue'
// import PublicationsSection from '~/components/PublicationsSection.vue'
// import ContactSection from '~/components/ContactSection.vue'
</script>

<style scoped>
section {
  margin: 20px;
  padding: 20px;
  background-color: theme('colors.background-soft');
  border-radius: 8px;
  /* border: 2px solid theme('colors.sky-pastel'); */
  /* box-shadow: 0 4px 10px rgba(249, 157, 157, 0.2); Sombra com tom rosado */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

section:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 15px rgba(246, 173, 85, 0.3); /* Destaque em tom amarelado */
}

section h2 {
  margin-top: 0;
  color: theme('colors.rose-pastel');
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  background-color: theme('colors.green-pastel');
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
  color: #333;
}
</style>
