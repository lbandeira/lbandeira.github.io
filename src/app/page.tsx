import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div style={{ width: "100%", height: "1px", background: "var(--line)", position: "relative", zIndex: 1 }} />
        <About />
        <div style={{ width: "100%", height: "1px", background: "var(--line)", position: "relative", zIndex: 1 }} />
        <Projects />
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }} />
        <Resume />
        <div style={{ width: "100%", height: "1px", background: "var(--line)", position: "relative", zIndex: 1 }} />
        <Contact />
      </main>
      <ScrollReveal />
    </>
  );
}
