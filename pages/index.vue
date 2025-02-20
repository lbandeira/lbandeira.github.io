<template>
    <div>
      <section id="educacao">
        <h2>Educação</h2>
        <ul>
          <li>Engenharia de Computação - Cin-UFPE</li>
          <li>Mestranda em Engenharia de Computação - Cin-UFPE</li>
        </ul>
      </section>
  
      <section id="experiencia">
        <h2>Experiência</h2>
        <ul>
          <li>Engenheira de Sistemas Embarcados - Empresa X</li>
          <li>Projetos de Inovação - Projeto Y</li>
        </ul>
      </section>
  
      <section id="projetos">
        <h2>Projetos</h2>
        <ul>
          <li>Projeto A - Descrição breve</li>
          <li>Projeto B - Descrição breve</li>
        </ul>
      </section>
  
      <section id="extracurricular">
        <h2>Extracurricular</h2>
        <ul>
          <li>Participação em Hackathons</li>
          <li>Voluntariado em Projetos Sociais</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    layout: 'default',
  };
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