"use client";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = window.scrollY > 100 ? "0" : "1";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={`${styles.left} reveal`}>
          <div className={styles.tag}>Engenheira · Pesquisadora · Maker</div>
          <h1 className={styles.name}>
            Lais
            <br />
            <em>Bandeira</em>
          </h1>
          <p className={styles.subtitle}>
            Sistemas elétricos,
            <br />
            cultura Maker, impacto real.
          </p>
          <p className={styles.bio}>
            Formada em Engenharia da Computação pelo CIn-UFPE, atualmente
            mestranda pesquisando soluções para monitoramento em tempo real
            de sistemas elétricos. Movida pela curiosidade e pela vontade
            de transformar ideias em soluções que facilitem o dia a dia das
            pessoas.
          </p>
          <div className={styles.actions}>
            <a href="#projects" className={styles.btnPrimary}>
              ver projetos →
            </a>
            <a href="#resume" className={styles.btnSecondary}>
              currículo
            </a>
          </div>
        </div>

        <div className={`${styles.right} reveal reveal-delay-2`}>
          <div className={styles.imgWrap}>
            <div className={styles.imgFrame} />
            <div className={styles.imgBg}>
              {/*
                Substitua pelo componente Image do Next.js quando tiver a foto:
                <Image src="/foto.jpg" alt="Lais Bandeira" fill style={{ objectFit: 'cover' }} />
              */}
              <div className={styles.placeholder}>
                <span className={styles.initials}>LB</span>
              </div>
            </div>
            <div className={styles.coords}>8.0476° S, 34.8770° W</div>
          </div>
        </div>
      </div>

      <div ref={scrollHintRef} className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  );
}
