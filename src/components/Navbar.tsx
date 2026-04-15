"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const links = [
  { href: "#about", label: "sobre" },
  { href: "#projects", label: "projetos" },
  { href: "#resume", label: "currículo" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100)
          current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="#hero" className={styles.logo}>
          lb<span>.</span>dev
        </Link>
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`${styles.link} ${active === l.href.slice(1) ? styles.active : ""}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={`${styles.link} ${styles.cta}`}>
              contato
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
