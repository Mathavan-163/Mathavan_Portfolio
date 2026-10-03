import emailjs from "@emailjs/browser";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  Terminal,
  UserRound,
  X,
  FileCode2,
  Palette,
  Braces,
  Atom,
  Server,
  Database,
  GitBranch
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GREEN = "#5fe442";

const skills = [
  ["HTML", "Frontend", "Markup & semantic UI", FileCode2],
  ["CSS", "Frontend", "Responsive design", Palette],
  ["JavaScript", "Frontend", "Interactive web apps", Braces],
  ["React", "Frontend", "Reusable components", Atom],
  ["Python", "Backend", "Application logic", Code2],
  ["Django", "Backend", "REST & server-side apps", Server],
  ["PostgreSQL", "Database", "SQL & data modeling", Database],
  ["Bootstrap", "UI", "Responsive layouts", Palette],
  ["Git & GitHub", "Tools", "Version control", GitBranch],
  ["REST API", "Architecture", "Frontend/backend communication", Server],
  ["Vercel", "Deployment", "Web deployment", ArrowUpRight]
];

const projects = [
  {
    number: "01",
    title: "Maarameka Ironing Center",
    description:
      "A responsive website for a real ironing business, presenting services, pricing, business information and contact details in a clean customer-friendly layout.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Mathavan-163/Ironing-Center-Website",
    demo: "https://mathavan-163.github.io/Ironing-Center-Website/",
    image: "/assets/project1.png"
  },
  {
    number: "02",
    title: "Library Management System",
    description:
      "A full-stack library management application built with React, Django REST Framework and PostgreSQL, with student records, books, borrowing and role-based features.",
    stack: ["React", "Django", "PostgreSQL"],
    github: "https://github.com/Mathavan-163/library-management-system",
    demo: "https://library-management-system-2-j5yu.onrender.com/",
    image: "/assets/project2.png"
  }
];

const certificates = [
  ["Google AI Essentials", "Google - Online", "/assets/certificate1.jpg"],
  ["Python Programming", "Infosys - Online ", "/assets/certificate2.jpg"],
  ["Fundamentals of Python", "Infosys - Online", "/assets/certificate3.jpg"],
  ["Python Full Stack Development", "NoviTech - Online", "/assets/certificate4.jpg"]
];

function App() {
  const rootRef = useRef(null);
  const cursorRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificateClosing, setCertificateClosing] = useState(false);
  const certificateCloseTimer = useRef(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: true
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray(".stagger-grid").forEach((grid) => {
        gsap.fromTo(
          grid.children,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true
            }
          }
        );
      });

      gsap.to(".hero-code-card", {
        y: -14,
        rotateY: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, rootRef);

    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      if (!cursor) return;

      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", moveCursor);

    const magnetic = document.querySelectorAll(".magnetic");

    magnetic.forEach((item) => {
      const enter = () => item.classList.add("magnetic-active");

      const leave = () => {
        item.classList.remove("magnetic-active");
        item.style.transform = "";
      };

      const move = (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.14;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.14;

        item.style.transform = `translate(${x}px, ${y}px)`;
      };

      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);
      item.addEventListener("mousemove", move);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!selectedCertificate) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCertificateClosing(true);

        window.clearTimeout(certificateCloseTimer.current);

        certificateCloseTimer.current = window.setTimeout(() => {
          setSelectedCertificate(null);
          setCertificateClosing(false);
        }, 220);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(certificateCloseTimer.current);
    };
  }, [selectedCertificate]);

  const closeMenu = () => setMenuOpen(false);

  const closeCertificate = () => {
    setCertificateClosing(true);

    window.clearTimeout(certificateCloseTimer.current);

    certificateCloseTimer.current = window.setTimeout(() => {
      setSelectedCertificate(null);
      setCertificateClosing(false);
    }, 220);
  };

  const openCertificate = (certificate) => {
    window.clearTimeout(certificateCloseTimer.current);
    setCertificateClosing(false);
    setSelectedCertificate(certificate);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (sendingRef.current) return;

    sendingRef.current = true;
    setSending(true);

    try {
      await emailjs.send(
        "service_sc0xf7w",
        "template_d8gktdr",
        {
          name: contactForm.name,
          email: contactForm.email,
          title: contactForm.subject,
          message: contactForm.message
        },
        {
          publicKey: "Y9KPbhEO4Tn0AbFeU"
        }
      );

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      window.alert(
        "Message sent successfully! Thank you for contacting me."
      );
    } catch (error) {
      console.error("EmailJS error:", error);
      window.alert(
        "Sorry, your message could not be sent. Please try again."
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div ref={rootRef} className="app-shell">
      <div ref={cursorRef} className="cursor-dot" />
      <div className="noise" />

      <div className="ambient ambient-one orb-one" />
      <div className="ambient ambient-two orb-two" />

      <ParticleField />

      <nav className="navbar navbar-expand-lg fixed-top site-nav">
        <div className="container py-2">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">M</span>
            <span>Mathavan A</span>
          </a>

          <button
            className="nav-toggle d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {[
              "home",
              "about",
              "skills",
              "projects",
              "certificates",
              "contact"
            ].map((item) => (
              <a key={item} href={`#${item}`} onClick={closeMenu}>
                {item}
              </a>
            ))}

            <a
              className="nav-resume magnetic"
              href="/assets/Mathavan_Resume_22.09.26.pdf"
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero section-pad">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="hero-copy"
                >
                  <div className="eyebrow">
                    <span className="pulse-dot" />
                    AVAILABLE FOR ENTRY-LEVEL ROLES
                  </div>

                  <p className="hero-kicker">HELLO, I'M</p>

                  <h1>
                    Mathavan <span>A</span>
                  </h1>

                  <h2>
                    Python <span>Full Stack</span> Developer
                  </h2>

                  <p className="hero-text">
                    I build modern, responsive web applications with Python,
                    Django, React and PostgreSQL — turning ideas into useful
                    digital products.
                  </p>

                  <div className="hero-actions">
                    <a className="btn-neon magnetic" href="#projects">
                      View Projects <ArrowUpRight size={18} />
                    </a>

                    <a className="btn-ghost magnetic" href="#contact">
                      Contact Me <ArrowUpRight size={18} />
                    </a>
                  </div>

                  <div className="social-row">
                    <a
                      href="https://github.com/Mathavan-163"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={19} />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/mathavan163"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={19} />
                    </a>

                    <a href="mailto:amathavan163@gmail.com">
                      <Mail size={19} />
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="col-lg-6">
                <div className="hero-visual">
                  <div className="hero-code-card">
                    <div className="window-bar">
                      <span />
                      <span />
                      <span />
                      <b>developer.py</b>
                    </div>

                    <div className="code-body">
                      <div>
                        <i>01</i>
                        <span>
                          <em>class</em> Developer:
                        </span>
                      </div>

                      <div>
                        <i>02</i>
                        <span>
                          &nbsp;&nbsp;name = <strong>"Mathavan A"</strong>
                        </span>
                      </div>

                      <div>
                        <i>03</i>
                        <span>
                          &nbsp;&nbsp;role = <strong>"Full Stack"</strong>
                        </span>
                      </div>

                      <div>
                        <i>04</i>
                        <span>
                          &nbsp;&nbsp;backend = [
                          <strong>"Python"</strong>,{" "}
                          <strong>"Django"</strong>]
                        </span>
                      </div>

                      <div>
                        <i>05</i>
                        <span>
                          &nbsp;&nbsp;frontend = [
                          <strong>"React"</strong>, <strong>"JS"</strong>]
                        </span>
                      </div>

                      <div>
                        <i>06</i>
                        <span>
                          &nbsp;&nbsp;database ={" "}
                          <strong>"PostgreSQL"</strong>
                        </span>
                      </div>

                      <div>
                        <i>07</i>
                        <span>
                          &nbsp;&nbsp;passion ={" "}
                          <strong>"Build + Learn"</strong>
                        </span>
                      </div>

                      <div>
                        <i>08</i>
                        <span className="cursor-line">▌</span>
                      </div>
                    </div>
                  </div>

                  <div className="float-chip chip-one">
                    <Code2 size={18} /> React
                  </div>

                  <div className="float-chip chip-two">
                    <Terminal size={18} /> Python
                  </div>

                  <div className="float-chip chip-three">
                    <Sparkles size={18} /> Django
                  </div>

                  <div className="hero-ring ring-one" />
                  <div className="hero-ring ring-two" />
                </div>
              </div>
            </div>

            <a className="scroll-hint" href="#about">
              <ArrowDown size={16} /> Scroll to explore
            </a>
          </div>
        </section>

        <section id="about" className="section-pad">
          <div className="container">
            <SectionHeading
              number="01"
              title="About Me"
              text="A little about my journey into software development."
            />

            <div className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <div className="glass-panel about-panel reveal">
                  <div className="about-profile">
                    <img
                      src="/assets/profile.png"
                      alt="Mathavan A - Web Developer"
                    />

                    <div>
                      <p className="large-copy">
                        I'm <span>Mathavan A</span>, a B.Sc Computer Science
                        graduate from TDMNS College, Kallikulam.
                      </p>

                      <p>
                        I completed Python Full Stack Development training at
                        Login360 and I'm building my career in software
                        development. I enjoy learning new technologies,
                        solving problems and creating clean, responsive web
                        applications through practical projects.
                      </p>
                    </div>
                  </div>

                  <div className="mini-stats">
                    <div>
                      <strong>2023–2026</strong>
                      <span>B.Sc Computer Science</span>
                    </div>

                    <div>
                      <strong>Login360</strong>
                      <span>Python Full Stack</span>
                    </div>

                    <div>
                      <strong>Chennai</strong>
                      <span>Current Location</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="identity-card reveal">
                  <div className="identity-icon">
                    <UserRound size={35} />
                  </div>

                  <span>FOCUS</span>

                  <h3>Build. Learn. Improve.</h3>

                  <p>Frontend + Backend + Database</p>

                  <div className="identity-line" />

                  <div className="identity-meta">
                    <span>
                      <MapPin size={15} /> Chennai, Tamil Nadu
                    </span>

                    <span>
                      <GraduationCap size={15} /> B.Sc Computer Science
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad section-dark">
          <div className="container">
            <SectionHeading
              number="02"
              title="Skills"
              text="Technologies and tools I use to build web applications."
            />

            <div className="row g-3 stagger-grid">
              {skills.map(([name, group, detail, Icon]) => (
                <div className="col-6 col-md-4 col-lg-3" key={name}>
                  <div className="skill-card">
                    <div className="skill-icon">
                      <Icon size={19} strokeWidth={2} />
                    </div>

                    <span>{group}</span>
                    <h3>{name}</h3>
                    <p>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-pad">
          <div className="container">
            <SectionHeading
              number="03"
              title="Selected Projects"
              text="A few projects from my learning and development journey."
            />

            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  className="project-card reveal"
                  key={project.number}
                >
                  <div className="project-visual">
                    <span className="project-number">
                      {project.number}
                    </span>

                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="project-image"
                    />

                    <div className="project-glow" />
                  </div>

                  <div className="project-info">
                    <div className="project-tags">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-links">
                      <a
                        href={project.demo}
                        target={
                          project.demo.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel="noreferrer"
                        className="btn-neon small"
                      >
                        Live Demo <ExternalLink size={15} />
                      </a>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost small"
                      >
                        <Github size={15} /> GitHub
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certificates" className="section-pad section-dark">
          <div className="container">
            <SectionHeading
              number="04"
              title="Certificates"
              text="Courses and certifications that support my technical journey."
            />

            <div className="certificate-grid stagger-grid">
              {certificates.map(([title, issuer, image], index) => (
                <button
                  key={title}
                  type="button"
                  className="certificate-card certificate-button"
                  onClick={() =>
                    openCertificate({ title, issuer, image })
                  }
                  aria-label={`View ${title} certificate`}
                >
                  <span className="certificate-number">
                    0{index + 1}
                  </span>

                  <span className="certificate-image-frame">
                    <img
                      className="certificate-thumb"
                      src={image}
                      alt=""
                    />
                  </span>

                  <Sparkles
                    size={20}
                    className="green-icon certificate-icon"
                  />

                  <h3>{title}</h3>

                  <p>{issuer}</p>

                  <span className="certificate-view">
                    Click to view
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad resume-section">
          <div className="container">
            <div className="resume-panel reveal">
              <div>
                <span className="section-label">05 — RESUME</span>

                <h2>Ready to build something useful.</h2>

                <p>
                  Download my one-page ATS-friendly resume for my education,
                  skills and projects.
                </p>
              </div>

              <a
                className="btn-neon magnetic"
                href="/assets/Mathavan_Resume_22.09.26.pdf"
              >
                Download Resume <Download size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad section-dark">
          <div className="container">
            <SectionHeading
              number="06"
              title="Let's Connect"
              text="Have a role, project or opportunity? Send me a message."
            />

            <div className="row g-4">
              <div className="col-lg-5">
                <div className="contact-info reveal">
                  <a href="mailto:amathavan163@gmail.com">
                    <Mail size={20} />

                    <span>
                      <small>EMAIL</small>
                      amathavan163@gmail.com
                    </span>
                  </a>

                  <a href="tel:+919500997163">
                    <Phone size={20} />

                    <span>
                      <small>PHONE</small>
                      +91 95009 97163
                    </span>
                  </a>

                  <div>
                    <MapPin size={20} />

                    <span>
                      <small>LOCATION</small>
                      Chennai, Tamil Nadu
                    </span>
                  </div>

                  <div className="contact-note">
                    <BriefcaseBusiness size={21} />

                    <p>
                      Open to entry-level software development
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <form
                  className="contact-form reveal"
                  onSubmit={handleContactSubmit}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        placeholder="Your Name"
                        aria-label="Your Name"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        type="email"
                        required
                        placeholder="Your Email"
                        aria-label="Your Email"
                      />
                    </div>

                    <div className="col-12">
                      <input
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        required
                        placeholder="Subject"
                        aria-label="Subject"
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        rows="6"
                        required
                        placeholder="Tell me about the opportunity..."
                        aria-label="Message"
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn-neon magnetic"
                        type="submit"
                        disabled={sending}
                      >
                        {sending ? "Sending..." : "Send Message"}{" "}
                        <Send size={17} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedCertificate && (
        <div
          className={`certificate-modal${
            certificateClosing ? " is-closing" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCertificate.title}
        >
          <button
            type="button"
            className="certificate-modal-backdrop"
            aria-label="Close certificate"
            onClick={closeCertificate}
          />

          <div className="certificate-modal-content">
            <button
              type="button"
              className="certificate-modal-close"
              onClick={closeCertificate}
              aria-label="Close certificate"
            >
              <X size={22} />
            </button>

            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
            />

            <div className="certificate-modal-info">
              <strong>{selectedCertificate.title}</strong>
              <span>{selectedCertificate.issuer}</span>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <strong>Mathavan A</strong>
            <span>Python Full Stack Developer</span>
          </div>

          <a href="#home">
            <ArrowUpRight size={15} /> Back to top
          </a>

          <small>© 2026 Mathavan A. Built with React.</small>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ number, title, text }) {
  return (
    <div className="section-heading reveal">
      <span className="section-label">{number} —</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let dust = [];
    let nebulaLayers = [];
    let galaxyTexture;
    let frame;
    let lastFrame = -40;
    let lastTime = 0;
    let nextShootingStar = 0;
    let shootingStar = null;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const createRandom = (seed) => {
      let state = seed >>> 0;

      return () => {
        state += 0x6d2b79f5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      };
    };

    const smooth = (value) => value * value * (3 - 2 * value);

    const createNoiseGrid = (columns, rows, random) => {
      const values = new Float32Array((columns + 1) * (rows + 1));

      for (let index = 0; index < values.length; index += 1) {
        values[index] = random();
      }

      return { columns, rows, values };
    };

    const sampleNoise = (grid, x, y) => {
      const gridX = x * grid.columns;
      const gridY = y * grid.rows;
      const left = Math.floor(gridX);
      const top = Math.floor(gridY);
      const right = Math.min(left + 1, grid.columns);
      const bottom = Math.min(top + 1, grid.rows);
      const fractionX = smooth(gridX - left);
      const fractionY = smooth(gridY - top);
      const topLeft = grid.values[top * (grid.columns + 1) + left];
      const topRight = grid.values[top * (grid.columns + 1) + right];
      const bottomLeft = grid.values[bottom * (grid.columns + 1) + left];
      const bottomRight = grid.values[bottom * (grid.columns + 1) + right];
      const upper = topLeft + (topRight - topLeft) * fractionX;
      const lower = bottomLeft + (bottomRight - bottomLeft) * fractionX;

      return upper + (lower - upper) * fractionY;
    };

    const createNebulaTexture = (seed, color, direction) => {
      const texture = document.createElement("canvas");
      texture.width = Math.max(240, Math.floor(width * 0.38));
      texture.height = Math.max(240, Math.floor(height * 0.38));
      const textureContext = texture.getContext("2d");
      const random = createRandom(seed);
      const grids = [
        createNoiseGrid(5, 5, random),
        createNoiseGrid(11, 11, random),
        createNoiseGrid(23, 23, random),
        createNoiseGrid(47, 47, random)
      ];
      const image = textureContext.createImageData(
        texture.width,
        texture.height
      );

      for (let y = 0; y < texture.height; y += 1) {
        const normalizedY = y / texture.height;

        for (let x = 0; x < texture.width; x += 1) {
          const normalizedX = x / texture.width;
          const noise =
            sampleNoise(grids[0], normalizedX, normalizedY) * 0.48 +
            sampleNoise(grids[1], normalizedX, normalizedY) * 0.27 +
            sampleNoise(grids[2], normalizedX, normalizedY) * 0.17 +
            sampleNoise(grids[3], normalizedX, normalizedY) * 0.08;
          const centerLine = direction === "violet"
            ? 0.17 + normalizedX * 0.63 + Math.sin(normalizedX * 8 + seed) * 0.035
            : 0.78 - normalizedX * 0.55 + Math.sin(normalizedX * 7 + seed) * 0.04;
          const distance = Math.abs(normalizedY - centerLine);
          const widthFactor = direction === "violet" ? 0.062 : 0.074;
          const band = Math.exp(-(distance * distance) / widthFactor);
          const secondaryBand = Math.exp(
            -((distance - 0.105) * (distance - 0.105)) / 0.004
          );
          const turbulentCloud = Math.max(0, noise - 0.36) * 3;
          const edgeDensity =
            0.12 + 0.88 * Math.pow(Math.abs(normalizedX - 0.5) * 2, 1.45);
          const intensity = Math.min(
            0.68,
            turbulentCloud * (band * 0.72 + secondaryBand * 0.2) * edgeDensity
          );

          if (intensity < 0.025) continue;

          const pixel = (y * texture.width + x) * 4;
          const colorShift = (noise - 0.5) * 45;
          image.data[pixel] = Math.max(0, color[0] + colorShift);
          image.data[pixel + 1] = Math.max(0, color[1] + colorShift);
          image.data[pixel + 2] = Math.max(0, color[2] + colorShift);
          image.data[pixel + 3] = intensity * 205;
        }
      }

      textureContext.putImageData(image, 0, 0);
      return texture;
    };

    const createGalaxyTexture = (random) => {
      const texture = document.createElement("canvas");
      const coreTexture = document.createElement("canvas");
      const armsTexture = document.createElement("canvas");
      const textureContext = texture.getContext("2d");
      const coreContext = coreTexture.getContext("2d");
      const armsContext = armsTexture.getContext("2d");
      const textureSize = 700;
      texture.width = textureSize;
      texture.height = textureSize;
      coreTexture.width = textureSize;
      coreTexture.height = textureSize;
      armsTexture.width = textureSize;
      armsTexture.height = textureSize;

      const coreGlow = coreContext.createRadialGradient(
        textureSize / 2,
        textureSize / 2,
        2,
        textureSize / 2,
        textureSize / 2,
        textureSize * 0.47
      );
      coreGlow.addColorStop(0, "rgba(245, 248, 255, 0.98)");
      coreGlow.addColorStop(0.018, "rgba(183, 208, 255, 0.68)");
      coreGlow.addColorStop(0.1, "rgba(77, 139, 247, 0.31)");
      coreGlow.addColorStop(0.3, "rgba(70, 80, 185, 0.1)");
      coreGlow.addColorStop(1, "rgba(20, 43, 108, 0)");
      coreContext.fillStyle = coreGlow;
      coreContext.fillRect(
        0,
        0,
        textureSize,
        textureSize
      );

      armsContext.translate(textureSize / 2, textureSize / 2);
      for (let arm = 0; arm < 2; arm += 1) {
        for (let point = 0; point < 4200; point += 1) {
          const progress = Math.pow(random(), 0.78);
          const radius = (0.025 + Math.pow(progress, 0.92) * 0.43) * textureSize +
            Math.sin(progress * 15 + arm) * textureSize * 0.004;
          const angle = arm * Math.PI + progress * Math.PI * 3.2 +
            Math.sin(progress * 11 + arm) * 0.08;
          const spread = (0.008 + progress * 0.06) * textureSize;
          const jitterX = (random() + random() + random() - 1.5) * spread;
          const jitterY = (random() + random() + random() - 1.5) * spread;
          const x = Math.cos(angle) * radius + jitterX;
          const y = Math.sin(angle) * radius + jitterY;
          const size = random() * 2 + 0.45;
          const brightness = random() * 0.5 + 0.24;

          armsContext.fillStyle = random() > 0.74
            ? `rgba(164, 143, 255, ${brightness})`
            : random() > 0.84
              ? `rgba(215, 229, 255, ${brightness})`
              : `rgba(92, 162, 255, ${brightness})`;
          armsContext.fillRect(x, y, size, size);
        }
      }

      textureContext.translate(textureSize / 2, textureSize / 2);
      textureContext.scale(1, 0.58);
      textureContext.drawImage(coreTexture, -textureSize / 2, -textureSize / 2);
      textureContext.drawImage(armsTexture, -textureSize / 2, -textureSize / 2);

      return { image: texture, core: coreTexture, arms: armsTexture };
    };

    const createStars = (random) => {
      const count = Math.min(3200, Math.max(1100, Math.floor(width * 2.15)));

      return Array.from({ length: count }, () => {
        const depth = random();
        const distant = depth < 0.76;
        const foreground = depth > 0.97;
        const gold = random() < 0.009;

        return {
          x: random() * width,
          y: random() * height,
          radius: distant
            ? random() * 0.42 + 0.16
            : foreground
              ? random() * 0.58 + 0.78
              : random() * 0.45 + 0.43,
          alpha: distant
            ? random() * 0.29 + 0.2
            : foreground
              ? random() * 0.23 + 0.7
              : random() * 0.32 + 0.4,
          twinkle: true,
          twinkleAmount: random() * 0.26 + 0.18,
          phase: random() * Math.PI * 2,
          pulseSpeed: random() * 0.0002 + 0.00008,
          driftX: (random() - 0.5) * (distant ? 0.0002 : foreground ? 0.001 : 0.00048),
          driftY: (random() - 0.5) * (distant ? 0.00016 : foreground ? 0.00078 : 0.00038),
          glow: random() < (foreground ? 0.55 : 0.12),
          flare: foreground && random() < 0.045,
          gold
        };
      });
    };

    const createDust = (random) => {
      const count = Math.min(220, Math.max(70, Math.floor((width * height) / 9000)));
      const colors = [
        [220, 232, 255],
        [153, 190, 255],
        [191, 171, 255]
      ];

      return Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        radius: random() * 0.65 + 0.25,
        alpha: random() * 0.045 + 0.012,
        driftX: (random() - 0.5) * 0.000045,
        driftY: (random() - 0.5) * 0.000045,
        color: colors[Math.floor(random() * colors.length)]
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const random = createRandom(Math.floor(Math.random() * 0xffffffff));
      nebulaLayers = [
        {
          texture: createNebulaTexture(
            Math.floor(random() * 1000),
            [66, 49, 155],
            "violet"
          ),
          phase: random() * Math.PI * 2,
          opacity: 0.7
        },
        {
          texture: createNebulaTexture(
            Math.floor(random() * 1000),
            [30, 96, 190],
            "blue"
          ),
          phase: random() * Math.PI * 2,
          opacity: 0.74
        }
      ];
      galaxyTexture = createGalaxyTexture(random);
      stars = createStars(random);
      dust = createDust(random);
      shootingStar = null;
      nextShootingStar = 0;
      lastTime = 0;
    };

    const drawNebula = (time) => {
      nebulaLayers.forEach((layer) => {
        const driftX = Math.sin(time * 0.000025 + layer.phase) * width * 0.009;
        const driftY = Math.cos(time * 0.000022 + layer.phase) * height * 0.009;
        const scale = 1.035 + Math.sin(time * 0.000015 + layer.phase) * 0.012;

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = layer.opacity * (0.92 + Math.sin(time * 0.00009 + layer.phase) * 0.08);
        ctx.translate(width / 2 + driftX, height / 2 + driftY);
        ctx.scale(scale, scale);
        ctx.drawImage(layer.texture, -width * 0.55, -height * 0.55, width * 1.1, height * 1.1);
        ctx.restore();
      });
    };

    const drawGalaxy = (time) => {
      const size = Math.min(width * 0.56, height * 0.8, 820);
      const centerX = width * 0.82 + Math.sin(time * 0.00003) * width * 0.008;
      const centerY = height * 0.25 + Math.cos(time * 0.000027) * height * 0.009;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.88 + Math.sin(time * 0.00016) * 0.045;
      ctx.translate(centerX, centerY);
      const scale = 1 + Math.sin(time * 0.00008) * 0.006;
      ctx.scale(scale, scale * 0.58);
      ctx.drawImage(galaxyTexture.core, -size / 2, -size / 2, size, size);
      ctx.rotate(time * 0.000035);
      ctx.drawImage(galaxyTexture.arms, -size / 2, -size / 2, size, size);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.24;
      ctx.drawImage(
        galaxyTexture.image,
        width * 0.09,
        height * 0.12,
        size * 0.19,
        size * 0.19
      );
      ctx.restore();
    };

    const drawShootingStar = (time, delta) => {
      if (reducedMotion) return;

      if (!shootingStar && time >= nextShootingStar) {
        const angle = Math.random() * Math.PI * 2;
        const duration = 7000;
        const tailLength = Math.max(85, Math.min(width * 0.12, 155));
        const speed =
          (width * 0.96 + tailLength + 20) /
          duration;
        shootingStar = {
          x: width * (0.08 + Math.random() * 0.84),
          y: height * (0.08 + Math.random() * 0.84),
          angle,
          speed,
          age: 280,
          duration,
          tailLength
        };
        nextShootingStar = time + 14000 + Math.random() * 2000;
      }

      if (!shootingStar) return;

      shootingStar.age += delta;
      const progress = Math.min(1, shootingStar.age / shootingStar.duration);

      if (progress >= 1) {
        shootingStar = null;
        return;
      }

      const headX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.speed * shootingStar.age;
      const headY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.speed * shootingStar.age;
      const tailLength = shootingStar.tailLength;
      const tailX = headX - Math.cos(shootingStar.angle) * tailLength;
      const tailY = headY - Math.sin(shootingStar.angle) * tailLength;
      const trail = ctx.createLinearGradient(tailX, tailY, headX, headY);
      trail.addColorStop(0, "rgba(255, 215, 106, 0)");
      trail.addColorStop(0.58, "rgba(255, 215, 106, 0.08)");
      trail.addColorStop(0.88, "rgba(255, 232, 163, 0.3)");
      trail.addColorStop(1, "rgba(255, 250, 224, 0.88)");
      const fadeIn = Math.min(1, shootingStar.age / 180);
      const fadeOut = Math.min(1, (shootingStar.duration - shootingStar.age) / 750);
      const opacity = fadeIn * fadeOut;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = opacity * 0.78;
      ctx.strokeStyle = trail;
      ctx.lineWidth = 1.7;
      ctx.shadowColor = "rgba(255, 215, 106, 0.7)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();

      const headGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 10);
      headGlow.addColorStop(0, "rgba(255, 255, 239, 0.9)");
      headGlow.addColorStop(0.2, "rgba(255, 239, 179, 0.72)");
      headGlow.addColorStop(0.55, "rgba(255, 215, 106, 0.32)");
      headGlow.addColorStop(1, "rgba(255, 215, 106, 0)");
      ctx.fillStyle = headGlow;
      ctx.shadowBlur = 7;
      ctx.beginPath();
      ctx.arc(headX, headY, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 252, 230, 0.9)";
      ctx.shadowColor = "rgba(255, 232, 163, 0.8)";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(headX, headY, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = (time) => {
      if (!reducedMotion && time - lastFrame < 16) {
        frame = requestAnimationFrame(draw);
        return;
      }

      const delta = lastTime ? Math.min(time - lastTime, 64) : 32;
      lastFrame = time;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#02030a";
      ctx.fillRect(0, 0, width, height);
      drawNebula(reducedMotion ? 0 : time);
      drawGalaxy(reducedMotion ? 0 : time);

      stars.forEach((star) => {
        if (!reducedMotion) {
          star.x += star.driftX * delta;
          star.y += star.driftY * delta;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        const twinkle = !reducedMotion && star.twinkle
          ? 1 - star.twinkleAmount * (0.5 - 0.5 * Math.sin(time * star.pulseSpeed + star.phase))
          : 1;
        const brightness = Math.min(1, star.alpha * twinkle * (star.gold ? 1.12 : 1));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgba(255, 232, 163, ${brightness})`
          : `rgba(232, 240, 255, ${brightness})`;
        ctx.shadowColor = star.glow
          ? star.gold
            ? `rgba(255, 215, 106, ${brightness})`
            : `rgba(171, 202, 255, ${brightness})`
          : "transparent";
        ctx.shadowBlur = star.glow ? star.radius * (star.gold ? 3.2 : 2.8) : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (star.flare) {
          ctx.save();
          ctx.globalAlpha = brightness * 0.62;
          ctx.strokeStyle = "rgba(222, 235, 255, 0.9)";
          ctx.lineWidth = 0.4;
          ctx.shadowColor = "rgba(163, 198, 255, 0.6)";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(star.x - 3, star.y);
          ctx.lineTo(star.x + 3, star.y);
          ctx.moveTo(star.x, star.y - 3);
          ctx.lineTo(star.x, star.y + 3);
          ctx.stroke();
          ctx.restore();
        }
      });

      dust.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.driftX * delta;
          particle.y += particle.driftY * delta;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.join(",")}, ${particle.alpha})`;
        ctx.fill();
      });

      drawShootingStar(time, delta);

      if (!reducedMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      resize();
      draw(0);
    };

    resize();
    window.addEventListener("resize", handleResize);
    draw(0);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default App;