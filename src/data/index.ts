export const projects = [
  {
    id: "battery",
    title: "Battery Dashboard",
    subtitle: "Moura Connect",
    description:
      "Dashboard de monitoramento em tempo real de baterias via Web Bluetooth. Visualiza tensão, corrente e temperatura com coleta e exportação de dados.",
    tags: ["IoT", "Web BLE", "JavaScript", "Hardware"],
    url: "https://battery.lbandeira.com.br/",
    year: "2024",
    type: "Web App",
  },
  {
    id: "autecla",
    title: "Autecla",
    subtitle: "Tecnologia Assistiva",
    description:
      "Nosso objetivo é auxiliar no tratamento de crianças autistas por meio da concepção de um ecossistema integrado, que vai desde brinquedos inteligentes para a criança à um conjunto de ferramentas para pais e terapeutas.",
    tags: ["Acessibilidade", "React", "Produto", "Impacto Social"],
    url: "http://autecla.com.br/",
    year: "2023",
    type: "Produto",
  },
  {
    id: "autoy",
    title: "Autoy",
    subtitle: "Brinquedo inteligente",
    description:
      "Projeto de brinquedo inteligente para crianças autistas, baseado no tratamento ABA. ",
    tags: ["Maker", "Automação", "Hardware", "Open Source"],
    url: "https://minamaker.notion.site/Autoy-1cfa227432d980799ccbfe9f19d5da28",
    year: "2023",
    type: "Hardware",
  },
];

export const resume = {
  education: [
    {
      degree: "Mestrado em Ciência da Computação",
      institution: "CIn — UFPE",
      period: "2023 — 2026",
      description:
        "Pesquisa em monitoramento em tempo real de baterias automotivas. Foco em aquisição de dados, IoT e processamento de sinais.",
    },
    {
      degree: "Bacharelado em Engenharia da Computação",
      institution: "CIn — UFPE",
      period: "2018 — 2023",
      description:
        "Formação em hardware, software e sistemas embarcados. Trabalho de conclusão na área de sistemas elétricos inteligentes.",
    },
  ],
  experience: [
    {
      role: "Pesquisadora",
      company: "CIn — UFPE",
      period: "2023 — presente",
      description:
        "Desenvolvimento de soluções para monitoramento em tempo real de sistemas elétricos. Projeto e implementação de dashboards e protocolos de comunicação.",
    },
    {
      role: "Desenvolvedora Full Stack",
      company: "Projetos independentes",
      period: "2021 — presente",
      description:
        "Criação de aplicações web com foco em IoT, acessibilidade e cultura Maker. Projetos como Autecla, Autoy e Battery Dashboard.",
    },
  ],
  skills: [
    { category: "Frontend", items: ["Vue.js", "Nuxt", "React", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "REST APIs"] },
    { category: "Hardware / IoT", items: ["Arduino", "ESP32", "Web Bluetooth", "Protocolos IoT"] },
    { category: "Pesquisa", items: ["Sistemas Elétricos", "Aquisição de Dados", "Processamento de Sinais"] },
  ],
};
