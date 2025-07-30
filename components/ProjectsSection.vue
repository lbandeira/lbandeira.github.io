<template>
    <section class="projects-section">
        <button class="toggle-btn left-btn" @click="isOpen = !isOpen">
            {{ isOpen ? 'Ocultar Projetos' : 'Mostrar Projetos' }}
        </button>
        <transition name="fade">
            <div v-if="isOpen">
                <h2>Meus Projetos</h2>
                <div class="projects-gallery">
                    <div
                        v-for="project in projects"
                        :key="project.id"
                        class="project-card"
                        @click="openProject(project.link)"
                        tabindex="0"
                        @keyup.enter="openProject(project.link)"
                    >
                        <img :src="project.image" :alt="project.title" class="project-image" />
                        <div class="project-info">
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const projects = ref([
    {
        id: 1,
        title: 'Projeto 1',
        description: 'Descrição breve do projeto 1.',
        image: '/images/projeto1.png',
        link: 'https://github.com/seuusuario/projeto1'
    },
    {
        id: 2,
        title: 'Projeto 2',
        description: 'Descrição breve do projeto 2.',
        image: '/images/projeto2.png',
        link: 'https://github.com/seuusuario/projeto2'
    },
    // Adicione mais projetos aqui
])

function openProject(link) {
    window.open(link, '_blank')
}
</script>

<style scoped>
.toggle-btn {
    display: block;
    margin: 0 auto 1.5rem auto;
    padding: 0.7rem 1.5rem;
    background: #0078d4;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}
.toggle-btn:hover {
    background: #005fa3;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* restante do seu CSS permanece igual */
.projects-section {
    padding: 2rem;
    background: #f9f9f9;
}

.projects-section h2 {
    text-align: center;
    margin-bottom: 2rem;
}

.projects-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.project-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    width: 280px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    outline: none;
    display: flex;
    flex-direction: column;
}

.project-card:focus,
.project-card:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.project-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.project-info {
    padding: 1rem;
}

.project-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
}

.project-info p {
    margin: 0;
    color: #555;
    font-size: 0.95rem;
}
</style>