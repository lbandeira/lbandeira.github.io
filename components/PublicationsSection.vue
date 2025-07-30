<template>
    <section class="publications-section">
        <h2>Publicações</h2>
        <ul>
            <li v-for="(paper, index) in papers" :key="'paper-' + index">
                <strong>{{ paper.title }}</strong> - {{ paper.authors }} ({{ paper.year }})
                <div v-if="paper.link">
                    <a :href="paper.link" target="_blank">Acessar publicação</a>
                </div>
            </li>
        </ul>

        <h2>Prêmios</h2>
        <ul>
            <li v-for="(award, index) in awards" :key="'award-' + index">
                <strong>{{ award.title }}</strong> - {{ award.organization }} ({{ award.year }})
                <div v-if="award.description">
                    <small>{{ award.description }}</small>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const papers = ref([
    {
        title: 'Título do Paper 1',
        authors: 'Autor 1, Autor 2',
        year: 2023,
        link: 'https://exemplo.com/paper1'
    },
    {
        title: 'Título do Paper 2',
        authors: 'Autor 3, Autor 4',
        year: 2022,
        link: ''
    }
])

const awards = ref([
    {
        title: 'Prêmio de Excelência',
        organization: 'Instituição X',
        year: 2023,
        description: 'Reconhecimento pelo melhor artigo científico.'
    },
    {
        title: 'Melhor Apresentação',
        organization: 'Conferência Y',
        year: 2021,
        description: ''
    }
])
</script>

<style scoped>
.publications-section {
    margin: 2rem 0;
}
.publications-section h2 {
    margin-top: 1.5rem;
}
.publications-section ul {
    list-style: none;
    padding: 0;
}
.publications-section li {
    margin-bottom: 1rem;
}
</style>