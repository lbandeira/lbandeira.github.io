<template>
    <section class="experience-section">
        <h2>Apresentações e Palestras</h2>
        <div
            v-for="(talk, index) in talks"
            :key="index"
            class="talk-card"
        >
            <h3>{{ talk.titulo }}</h3>
            <p>{{ talk.descricao }}</p>
            <div class="talk-meta">
                <span class="evento">Evento: {{ talk.evento }}</span>
                <a
                    v-if="talk.link"
                    :href="talk.link"
                    target="_blank"
                    rel="noopener"
                    class="talk-link"
                >
                    Ver mais
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const talks = ref([
    {
        titulo: 'Como começar com Vue.js',
        descricao: 'Uma introdução prática ao framework Vue.js para iniciantes.',
        evento: 'FrontInSampa 2023',
        link: 'https://frontinsampa.com/2023/vuejs'
    },
    {
        titulo: 'Boas práticas em JavaScript moderno',
        descricao: 'Dicas e técnicas para escrever código JavaScript limpo e eficiente.',
        evento: 'JSConf Brasil 2022',
        link: 'https://jsconf.com.br/2022/boas-praticas'
    }
    // Adicione mais palestras aqui
])
</script>

<style scoped>
.experience-section {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
h2 {
    margin-bottom: 2rem;
    text-align: center;
}
.talk-card {
    border-bottom: 1px solid #eee;
    padding: 1rem 0;
}
.talk-card:last-child {
    border-bottom: none;
}
.talk-meta {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}
.evento {
    font-weight: bold;
    color: #555;
}
.talk-link {
    color: #42b983;
    text-decoration: underline;
    font-size: 0.95em;
}
</style>