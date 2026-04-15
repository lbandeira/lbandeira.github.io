import { resume } from "@/data";
import styles from "./Resume.module.css";

export default function Resume() {
  return (
    <section id="resume" className={styles.section}>
      <div className="container">
        <div className={styles.label} data-num="03">Currículo</div>
        <h2 className={styles.title}>
          Formação &amp;
          <br />
          <em>experiência.</em>
        </h2>

        <div className={styles.grid}>
          <div className="reveal">
            <div className={styles.colTitle}>// formação acadêmica</div>
            <div className={styles.timeline}>
              {resume.education.map((item, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.line}>
                    <div className={styles.dot} />
                  </div>
                  <div>
                    <div className={styles.period}>{item.period}</div>
                    <div className={styles.role}>{item.degree}</div>
                    <div className={styles.place}>{item.institution}</div>
                    <div className={styles.desc}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className={styles.colTitle}>// experiência</div>
            <div className={styles.timeline}>
              {resume.experience.map((item, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.line}>
                    <div className={styles.dot} />
                  </div>
                  <div>
                    <div className={styles.period}>{item.period}</div>
                    <div className={styles.role}>{item.role}</div>
                    <div className={styles.place}>{item.company}</div>
                    <div className={styles.desc}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.actions} reveal`}>
          <a
            href="https://linkedin.com/in/laisbandeira"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            ver no LinkedIn ↗
          </a>
          <a href="/resume.pdf" className={styles.btnSecondary}>
            download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
