import { resume } from "@/data";
import styles from "./About.module.css";

const links = [
  { label: "GitHub", href: "https://github.com/lbandeira" },
  { label: "LinkedIn", href: "https://linkedin.com/in/laisbandeira" },
  { label: "Currículo Lattes", href: "http://lattes.cnpq.br/" },
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.label} data-num="01">Sobre mim</div>
        <h2 className={styles.title}>
          Engenharia com
          <br />
          <em>propósito.</em>
        </h2>

        <div className={styles.grid}>
          <div className={`${styles.text} reveal`}>
            <p>
              Sou <strong>Lais Bandeira</strong>, engenheira de computação
              formada pelo <strong>CIn-UFPE</strong> em Recife. Atualmente
              curso o mestrado na mesma instituição, onde desenvolvo pesquisa
              em <em>monitoramento em tempo real de sistemas elétricos</em>.
            </p>
            <p>
              Minha trajetória une rigor técnico com criatividade prática:
              construo desde dashboards IoT com Web Bluetooth até teclados
              assistivos para pessoas com mobilidade reduzida. Acredito que a
              tecnologia mais poderosa é aquela que{" "}
              <strong>simplifica a vida das pessoas</strong>.
            </p>
            <p>
              Entusiasta da <em>cultura Maker</em>, acredito no aprendizado
              pelo fazer — protótipos, iterações, e a alegria de ver uma ideia
              ganhar forma física ou digital.
            </p>

            <div className={styles.links}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span>{l.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className={`${styles.skills} reveal reveal-delay-2`}>
            {resume.skills.map((group) => (
              <div key={group.category}>
                <div className={styles.skillLabel}>{group.category}</div>
                <div className={styles.skillTags}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.skillTag}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
