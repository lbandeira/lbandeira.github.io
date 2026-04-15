import { projects } from "@/data";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div className={styles.label} data-num="02">
          Projetos
        </div>
        <h2 className={styles.title}>
          Coisas que
          <br />
          <em>construí.</em>
        </h2>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} reveal reveal-delay-${i + 1}`}
            >
              <div className={styles.num}>
                {String(i + 1).padStart(3, "0")} — {p.year}
              </div>
              <div className={styles.sub}>{p.type} · {p.subtitle}</div>
              <div className={styles.cardTitle}>{p.title}</div>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <div className={styles.arrow}>↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
