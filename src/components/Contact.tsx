import styles from "./Contact.module.css";

const contactLinks = [
  {
    label: "Email",
    handle: "lais@lbandeira.com.br",
    href: "mailto:lais@lbandeira.com.br",
  },
  {
    label: "LinkedIn",
    handle: "in/laisbandeira",
    href: "https://linkedin.com/in/laisbandeira",
  },
  {
    label: "GitHub",
    handle: "@lbandeira",
    href: "https://github.com/lbandeira",
  },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className="reveal">
              <div className={styles.label} data-num="04">Contato</div>
              <h2 className={styles.headline}>
                Vamos
                <br />
                construir algo
                <br />
                <em>juntos?</em>
              </h2>
              <p className={styles.sub}>
                Aberta a conversas sobre pesquisa, colaborações em projetos,
                oportunidades ou simplesmente trocar ideias sobre tecnologia e
                inovação.
              </p>
            </div>

            <div className={`${styles.links} reveal reveal-delay-2`}>
              {contactLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span className={styles.linkName}>{l.label}</span>
                  <span className={styles.linkHandle}>{l.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.copy}>
            © 2025 <span>Lais Bandeira</span> — Recife, PE
          </div>
          <div className={styles.built}>Next.js · Vercel · feito com cuidado</div>
        </div>
      </footer>
    </>
  );
}
