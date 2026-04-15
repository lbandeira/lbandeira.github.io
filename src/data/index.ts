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
    subtitle: "Teclado Assistivo",
    description:
      "Teclado virtual assistivo desenvolvido para pessoas com mobilidade reduzida. Projeto de impacto social com foco em acessibilidade e usabilidade.",
    tags: ["Acessibilidade", "React", "Produto", "Impacto Social"],
    url: "http://autecla.com.br/",
    year: "2023",
    type: "Produto",
  },
  {
    id: "autoy",
    title: "Autoy",
    subtitle: "Mina Maker",
    description:
      "Projeto de automação residencial acessível desenvolvido no contexto da cultura Maker. Documentado no Notion como produto open-source.",
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
      period: "2023 — presente",
      description:
        "Pesquisa em monitoramento em tempo real de sistemas elétricos. Foco em aquisição de dados, IoT e processamento de sinais.",
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
