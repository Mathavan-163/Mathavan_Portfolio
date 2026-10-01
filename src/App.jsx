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

      gsap.to(".orb-one", {
        x: 100,
        y: 80,
        rotate: 90,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".orb-two", {
        x: -120,
        y: -60,
        rotate: -70,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
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

    let width;
    let height;
    let particles;
    let frame;

    const resize = () => {
      width = canvas.width = window.innerWidth * devicePixelRatio;
      height = canvas.height = window.innerHeight * devicePixelRatio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      particles = Array.from(
        {
          length: Math.min(
            170,
            Math.floor(window.innerWidth / 8)
          )
        },
        () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.15 + 0.25,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          alpha: Math.random() * 0.55 + 0.25
        })
      );
    };

    resize();

    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > window.innerWidth) {
          p.vx *= -1;
        }

        if (p.y < 0 || p.y > window.innerHeight) {
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default App;