<template>
  <div>
    <section id="about">
      <BioSection />
    </section>
    <section id="projects">
      <ProjectsSection />
    </section>
    <section id="experience">
      <ExperienceSection />
    </section>
    <section id="publications">
      <PublicationsSection />
    </section>
    <section id="contact">
      <ContactSection />
    </section>
  </div>
</template>

<script setup>
import BioSection from '~/components/BioSection.vue'
// import ProjectsSection from '~/components/ProjectsSection.vue'
// import ExperienceSection from '~/components/ExperienceSection.vue'
// import PublicationsSection from '~/components/PublicationsSection.vue'
// import ContactSection from '~/components/ContactSection.vue'
</script>

  
  <style scoped>
  section {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  section h2 {
    margin-top: 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    background-color: #eee;
    margin: 5px 0;
    padding: 10px;
    border-radius: 3px;
  }
  </style>