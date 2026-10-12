import { useEffect, useRef, useState, useCallback } from "react";
import { ICONS } from "./toolIcons"; // keep toolIcons.js next to this file

/* =====================================================================
   EDIT THIS BLOCK. Everything clients read lives here.
   Empty values (photo, linkedin, bookingUrl, testimonials) hide their part.
   ===================================================================== */
const PROFILE = {
  name: "Naresh Challa",
  email: "nareshchalla2220@gmail.com",
  phone: "+917095432678",
  phoneLabel: "+91 7095432678",
  whatsapp: "917095432678",
  github: "https://github.com/Naresh2219",
  linkedin: "",              // add your LinkedIn URL
  bookingUrl: "",            // add a Calendly / Cal.com link to show "Book a call"
  resumeUrl: "/Naresh_Challa_Resume.pdf", // put the PDF in your public folder
  photo: "",                 // add "/me.jpg" (public folder) to show your photo
  timezone: "IST (UTC+5:30), Hyderabad",
  hours: "Available for calls 24/7, in IST (UTC+5:30).",
  reply: "I reply within one working day.",
  supportDays: 30,
  roles: ["a business website", "a customer portal", "an online store", "a dashboard"],
};
const SEO = {
  title: "Naresh Challa | Java Full-Stack Developer for hire (React, Spring Boot, AWS)",
  description: "Freelance full-stack developer in Hyderabad. I build web apps and portals in React and Spring Boot and launch them live on AWS.",
};
const PROOF = [
  { value: 1, suffix: "", label: "live production site I deploy and run (ap13news.in)" },
  { value: 3, suffix: "", label: "full-stack projects delivered end to end" },
  { value: 25, suffix: "%", label: "faster response times from backend and query fixes" },
];
const SERVICES = [
  { icon: "window", title: "Websites and web apps", who: "For businesses that need a site or portal that works on phones.", text: "Responsive React and Tailwind front ends, from a business site to a portal with logins and dashboards.", gets: ["Mobile-first design", "Admin area to manage content", "Fast page loads"] },
  { icon: "server", title: "Back end and APIs", who: "For products that need secure logins, data and business rules.", text: "Spring Boot REST APIs with JWT login, role-based access and MySQL or PostgreSQL databases.", gets: ["Secure login and roles", "Clean, documented API", "Tested business logic"] },
  { icon: "rocket", title: "Launch and hosting", who: "For anyone who wants it live without chasing servers.", text: "I deploy to AWS and set up Nginx, SSL and your custom domain, then hand over the keys.", gets: ["Your domain with SSL", "Server in your own account", "Deployment notes"] },
];
const PROJECTS = [
  { name: "Ap13news", kind: "Live", url: "https://ap13news.in", repo: "", image: "",
    role: "Solo developer: front end, back end, database and deployment.",
    problem: "A news channel needed its own website where readers can search and read stories by category.",
    built: "A React front end and a Spring Boot API secured with JWT, with data moved to cloud PostgreSQL. I deployed it on AWS EC2 behind Nginx.",
    results: ["Live on its own domain with SSL", "I run and maintain the server myself", "Readers browse and search by category"],
    stack: ["React.js", "Spring Boot", "PostgreSQL", "AWS"], icons: [["React", "react"], ["Spring Boot", "spring"], ["PostgreSQL", "postgresql"], ["AWS", "aws"]] },
  { name: "Talent Bridge", kind: "Freelance", url: "", repo: "", image: "",
    role: "Developer for both the Spring Boot back end and the React front end.",
    problem: "Recruiters lose hours screening applications by hand, and job seekers apply without knowing if they fit.",
    built: "A job portal for admins, recruiters and job seekers. A rule-based engine scores each applicant on skills, experience and qualification using weights the recruiter sets.",
    results: ["Applicants are shortlisted or rejected automatically", "Job seekers see missing skills before they apply", "Resumes are read for skills on upload"],
    stack: ["React 19", "Spring Boot 3", "Spring Security", "MySQL"], icons: [["React", "react"], ["Spring Boot", "spring"], ["MySQL", "mysql"]] },
  { name: "Happy Shopping", kind: "Self-driven", url: "", repo: "", image: "",
    role: "Led the React front end and connected it to the Spring Boot API.",
    problem: "Shoppers need to find a product, add it to the cart and pay without friction on a phone.",
    built: "A mobile-first online store with catalog, cart, checkout and user dashboards, connected to a Spring Boot API with MySQL.",
    results: ["Full flow from catalog to checkout", "Orders and users stored in MySQL", "Layout designed for phones first"],
    stack: ["React.js", "Tailwind CSS", "Spring Boot", "MySQL"], icons: [["React", "react"], ["Tailwind CSS", "tailwind"], ["Spring Boot", "spring"], ["MySQL", "mysql"]] },
];
const STANDARDS = [
  "Mobile-first layout that works on any screen",
  "Secure login, hashed passwords and role-based access where needed",
  "HTTPS and your own domain at launch",
  "Source code and deployment notes handed over",
  "Clear written scope, price and timeline",
  "Plain-language updates, no jargon",
];
const FIT = {
  good: ["You need a business site, portal, store or dashboard with logins and data", "Your project uses React, or Java with Spring Boot", "You want one person who builds it and puts it online"],
  not: ["You only need a visual design or logo", "You need a native iOS or Android app", "You want a WordPress theme or plugin"],
};
const ENGAGE = [
  { t: "Fixed-price project", d: "A defined scope with a set price and date. Best for new sites, portals and stores." },
  { t: "Fix or extend what you have", d: "I review your existing React or Spring Boot project, then fix bugs or add features." },
  { t: "Ongoing support", d: "A monthly arrangement for updates, small features and keeping the server healthy." },
];
const TESTIMONIALS = [
  // { quote: "Short, real quote from a client.", name: "Client name", role: "Company or role" },
];
const STEPS = [
  { t: "Talk", d: "A short call to understand what you want to build and why." },
  { t: "Scope", d: "You get a written scope, timeline and fixed price before any work starts." },
  { t: "Build", d: "I share working versions as I go, so you see progress and can change direction early." },
  { t: "Launch", d: "I deploy it live on your domain with SSL and walk you through it." },
  { t: "Support", d: `I fix bugs for free for the first ${PROFILE.supportDays} days after launch.` },
];
const FAQ = [
  { q: "Why do you use Java and Spring Boot for the back end?", a: "Java with Spring Boot is a mature, stable choice that many banks, e-commerce sites and large platforms run on. It has strong built-in security, handles growing traffic well, and has a huge pool of developers, so your project is easy to maintain or hand to another developer later." },
  { q: "Why do you use React for the front end?", a: "React builds fast, interactive pages from reusable parts, so new screens and features are quick to add and stay consistent. It is the most widely used front-end library, which means long-term support, plenty of tools, and no risk of being locked to one developer." },
  { q: "Is Java too heavy for a small project?", a: "For a simple brochure site, yes, and I'll tell you so. Java and Spring Boot pay off when you need logins, user roles, a database, payments or business rules, and when you expect the project to grow." },
  { q: "Will my site rank on Google if it's built with React?", a: "Yes, when it's set up properly. I add correct page titles and descriptions, fast loading and clean URLs. If search ranking is your top priority, we can discuss server-side rendering at the scoping stage." },
  { q: "How do you keep my site and user data secure?", a: "Passwords are stored hashed, logins use secure tokens, access is limited by user role, and the site runs on HTTPS. I follow the same approach in my Talent Bridge job portal." },
  { q: "Will it work well on phones?", a: "Yes. I design mobile-first, then scale up to tablets and desktops, and test on different screen sizes before launch." },
  { q: "Can you add features after launch?", a: "Yes. The code is organised in clear layers (screens, API, database), so new features can be added without rewriting what already works. You also own the code." },
  { q: "Which database will you use?", a: "MySQL or PostgreSQL, depending on your needs. Both are reliable and widely supported. I'll recommend one in the written scope." },
  { q: "Do you build with WordPress or no-code tools?", a: "No. I build custom React and Spring Boot applications, which suit projects that need logins, dashboards or custom business logic." },
  { q: "How long does a project take?", a: "A simple business site usually takes 1 to 2 weeks. A portal with logins and dashboards takes about 4 to 8 weeks. The written scope gives you a firm date." },
  { q: "How much does it cost?", a: "I quote a fixed price after a short call, in INR or USD, so there are no surprises. Tell me your budget and I'll tell you what fits." },
  { q: "Will I own the code and the hosting?", a: "Yes. You get the source code, and the server and domain are set up in your own accounts." },
  { q: "Can you fix or extend a site that already exists?", a: "Yes, if it uses React or a Java and Spring Boot back end. Send me the details and I'll tell you honestly if it's a fit." },
  { q: "How do payments work?", a: "For fixed-price projects I usually ask for half to start and half on delivery. You can pay in INR or USD, and I send an invoice for each payment." },
  { q: "What if I want changes mid-project?", a: "Small tweaks are part of the process. Anything that changes the scope is quoted in writing first, so the price never moves without your approval." },
  { q: "What happens after launch?", a: `You get ${PROFILE.supportDays} days of free bug fixes, deployment notes, and the option of ongoing support if you want it.` },
  { q: "How do we communicate?", a: "Email or WhatsApp, plus calls when needed. I keep you updated through the build." },
];
const TOOLS = {
  "Front end": [["React", "react"], ["Tailwind CSS", "tailwind"], ["Bootstrap", "bootstrap"], ["JavaScript", "javascript"], ["HTML5", "html5"], ["CSS3", "css3"]],
  "Back end": [["Java", "java"], ["Spring Boot", "spring"], ["Hibernate", "hibernate"], ["JUnit", "junit"], ["Maven", "maven"]],
  Data: [["MySQL", "mysql"], ["PostgreSQL", "postgresql"]],
  "Cloud and tools": [["AWS", "aws"], ["Nginx", "nginx"], ["Linux", "linux"], ["Git", "git"], ["Postman", "postman"], ["IntelliJ IDEA", "intellij"], ["VS Code", "vscode"]],
};
const FACTS = [
  ["Based in", "Hyderabad, India"],
  ["Focus", "React, Spring Boot, AWS"],
  ["Education", "B.Tech, Electronics and Communications (2023)"],
  ["Experience", "Full-stack internship, one live production site, one freelance portal"],
];
const NAV = [["services", "Services"], ["work", "Work"], ["process", "Process"], ["about", "About"], ["contact", "Contact"]];

/* ---------- helpers ---------- */
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const waLink = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent("Hi Naresh, I'd like to talk about a project.")}`;
const mailLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent("New project enquiry")}`;
const ctaHref = PROFILE.bookingUrl || "#contact";
const openChat = (e) => { if (PROFILE.bookingUrl) return; e.preventDefault(); window.dispatchEvent(new Event("open-chat")); };

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}
function useTyped(words) {
  const [text, setText] = useState(reduced() ? words[0] : "");
  useEffect(() => {
    if (reduced()) return;
    let w = 0, c = 0, del = false, t;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let wait = del ? 35 : 75;
      if (!del && c === word.length) { del = true; wait = 1500; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      t = setTimeout(tick, wait);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [words]);
  return text;
}
function useActive() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------- components ---------- */
function Counter({ value, suffix }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(reduced() ? value : 0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) { setN(value); return; }
    const s = performance.now();
    let raf;
    const step = (now) => { const p = Math.min((now - s) / 1200, 1); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}
function Reveal({ children, as: Tag = "div", className = "", i = 0 }) {
  const [ref, seen] = useInView();
  return <Tag ref={ref} style={i ? { transitionDelay: `${i * 90}ms` } : undefined} className={`reveal ${seen ? "in" : ""} ${className}`}>{children}</Tag>;
}
function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}
function Typed() {
  const t = useTyped(PROFILE.roles);
  return <span>{t}</span>;
}
const BRAND_TAGS = ["Full-stack developer", "React + Spring Boot", "Open for new projects"];
function DevAvatar() {
  return (
    <svg viewBox="0 0 48 48" className="avsvg" aria-hidden="true">
      <defs><linearGradient id="avbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2B3FA8" /><stop offset="1" stopColor="#5B3FD0" /></linearGradient></defs>
      <rect width="48" height="48" fill="url(#avbg)" />
      <rect x="9" y="28" width="30" height="14" rx="7" fill="#3556F0" />
      <rect x="20" y="25" width="8" height="8" rx="3" fill="#E8B88F" />
      <circle cx="24" cy="19" r="9.5" fill="#F0C7A0" />
      <path d="M14.5 18c0-7 5-10.500 9.500-10.500S33.500 11 33.500 18c-3-4-7-5.500-10-5.500s-6 1.500-9 5.500z" fill="#1B2438" />
      <path d="M13.500 20c0-9 5-13.500 10.500-13.500S34.500 11 34.500 20" fill="none" stroke="#0A1226" strokeWidth="2" strokeLinecap="round" />
      <rect x="11.500" y="18" width="4" height="7" rx="2" fill="#0A1226" /><rect x="32.500" y="18" width="4" height="7" rx="2" fill="#0A1226" />
      <rect x="16" y="35" width="16" height="9" rx="1.500" fill="#0A1226" opacity=".92" />
      <path d="M19 38h5M19 40.500h8M19 43h4" stroke="#46DDA0" strokeWidth="1.200" strokeLinecap="round" />
      <circle cx="21.200" cy="19.500" r=".9" fill="#1B2438" /><circle cx="26.800" cy="19.500" r=".9" fill="#1B2438" />
      <path d="M21.500 23c1.500 1.200 3.500 1.200 5 0" fill="none" stroke="#A0613A" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function Letter3D({ c, delay = 0 }) {
  return (
    <span className="n3d"><span className="n3d-in" style={{ animationDelay: `${delay}s` }}>
      {Array.from({ length: 7 }, (_, k) => <span key={k} className={k === 0 ? "nf" : "nb"} style={{ "--k": k }}>{c}</span>)}
    </span></span>
  );
}
function Brand() {
  const tag = useTyped(BRAND_TAGS);
  let n = 0;
  return (
    <a className="brand" href="#top" aria-label={`${PROFILE.name}, back to top`} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); }}>
      <span className="mono" aria-hidden="true"><DevAvatar /></span>
      <span className="bname" aria-hidden="true">
        <span className="bline"><i className="br">&lt;</i>
          {PROFILE.name.split(" ").map((w, wi) => (
            <span key={wi} className="word">{[...w].map((c, ci) => { const i = n++; return ci === 0 ? <Letter3D key={i} c={c} delay={wi * -2.5} /> : <span key={i} className="ch" style={{ "--i": i }}>{c}</span>; })}</span>
          ))}
          <i className="br">/&gt;</i></span>
        <small>{tag}<i className="bcaret" /></small>
      </span>
    </a>
  );
}
function Clock() {
  const fmt = () => new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 20000); return () => clearInterval(id); }, []);
  return <>It's {t} in Hyderabad (IST) right now.</>;
}
function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const move = (e) => {
    if (reduced() || e.pointerType === "touch") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${-((clientY - r.top) / r.height - 0.5) * 8}deg`);
      el.style.setProperty("--ry", `${((clientX - r.left) / r.width - 0.5) * 10}deg`);
    });
  };
  const leave = () => { const el = ref.current; if (el) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); } };
  return <div ref={ref} className={`tiltcard ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}
function Spotlight({ children }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const move = useCallback((e) => {
    if (e.pointerType === "touch") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
      el.style.setProperty("--px", ((clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--py", ((clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }, []);
  return <header className="hero" ref={ref} onPointerMove={move}>{children}</header>;
}
function StatusPanel() {
  const lines = ["Spring Boot API on AWS EC2", "Nginx reverse proxy", "SSL certificate active", "Cloud PostgreSQL database"];
  const [shown, setShown] = useState(reduced() ? lines.length : 0);
  useEffect(() => {
    if (reduced() || shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <aside className="panel" aria-label="Live project status">
      <div className="panel-head"><span className="dot" aria-hidden="true" /> ap13news.in is running</div>
      <ul>{lines.map((l, i) => <li key={l} className={i < shown ? "on" : ""}><span>{l}</span><span className="ok">OK</span></li>)}</ul>
      <a href="https://ap13news.in" target="_blank" rel="noopener noreferrer">Open the live site</a>
    </aside>
  );
}
function Frame({ p }) {
  return (
    <div className="frame" aria-hidden={!p.image}>
      <div className="bar"><i /><i /><i /><span>{p.url ? p.url.replace("https://", "") : p.name.toLowerCase().replace(/\s/g, "") + ".app"}</span></div>
      {p.image ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" /> : <div className="ph"><b>{p.name}</b><span>{p.stack.slice(0, 2).join(" + ")}</span></div>}
    </div>
  );
}
function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <div className="plist">
      {PROJECTS.map((p, i) => {
        const o = open === i;
        return (
          <article key={p.name} className="proj">
            <button className="proj-head" aria-expanded={o} onClick={() => setOpen(o ? -1 : i)}>
              <span className="proj-name">{p.name}</span>
              <span className="mini">{p.icons.map(([l, k]) => <Tile key={l} label={l} path={k} />)}</span>
              <span className={`badge ${p.kind.toLowerCase().replace(/\W/g, "")}`}>{p.kind}</span>
              <span className="plus" aria-hidden="true">{o ? "−" : "+"}</span>
            </button>
            <div className="proj-body" style={{ gridTemplateRows: o ? "1fr" : "0fr" }}>
              <div>
                <div className="case">
                  <div>
                    <p className="role"><b>My role:</b> {p.role}</p>
                    <h4>The problem</h4><p>{p.problem}</p>
                    <h4>What I built</h4><p>{p.built}</p>
                    <h4>The result</h4>
                    <ul className="facts">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
                    <p className="stack-line">{p.stack.join(", ")}</p>
                    <div className="btns">
                      {p.url && <a className="btn main small" href={p.url} target="_blank" rel="noopener noreferrer">Open live site</a>}
                      {p.repo && <a className="btn small" href={p.repo} target="_blank" rel="noopener noreferrer">View code on GitHub</a>}
                    </div>
                  </div>
                  <Frame p={p} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
const GLYPH = {
  window: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /><path d="M8 14l-2 2 2 2M16 14l2 2-2 2M13 13l-2 6" /></>,
  server: <><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01M12 7h6M12 17h6" /></>,
  rocket: <><path d="M5 19c0-3 1-4 3-5l6-6c2-2 5-3 7-3 0 2-1 5-3 7l-6 6c-1 2-2 3-5 3-1 0-2 0-2-2z" /><circle cx="15.5" cy="8.5" r="1.5" /><path d="M5 13c-2 .5-3 2-3 5 3 0 4.500-1 5-3M11 19c-.5 2-2 3-5 3" /></>,
};
function Glyph({ name }) {
  return <span className="glyph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{GLYPH[name]}</svg></span>;
}
function Tile({ label, path }) {
  const src = ICONS[path];
  return (
    <span className="tile" title={label} role="img" aria-label={label}>
      {src ? <img src={src} alt="" loading="lazy" /> : <b>{label.slice(0, 2)}</b>}
    </span>
  );
}
function Tools() {
  return (
    <div className="tools">
      {Object.entries(TOOLS).map(([group, items]) => (
        <div key={group} className="toolgroup">
          <h4>{group}</h4>
          <div className="tilerow">{items.map(([label, path]) => <Tile key={label} label={label} path={path} />)}</div>
        </div>
      ))}
    </div>
  );
}
function DevArt() {
  const code = [[60, 90, "#8FA8FF"], [80, 120, "#FFC25C"], [80, 70, "#46DDA0"], [100, 140, "#8FA8FF"], [100, 90, "#FF8FA3"], [80, 60, "#46DDA0"], [60, 40, "#FFC25C"], [60, 110, "#8FA8FF"]];
  return (
    <svg viewBox="0 0 420 330" role="img" aria-label="Illustration of a developer working at a desk with code on the screen" className="devart">
      <defs><linearGradient id="dbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3556F0" stopOpacity=".25" /><stop offset="1" stopColor="#F5A524" stopOpacity=".22" /></linearGradient></defs>
      <rect width="420" height="330" rx="26" fill="url(#dbg)" />
      <rect x="34" y="52" width="236" height="170" rx="12" fill="#0A1226" stroke="#26365A" strokeWidth="2" />
      <circle cx="52" cy="68" r="4" fill="#FF6B6B" /><circle cx="66" cy="68" r="4" fill="#FFC25C" /><circle cx="80" cy="68" r="4" fill="#46DDA0" />
      {code.map(([x, w, c], i) => <rect key={i} x={x - 6} y={88 + i * 16} width={w} height="7" rx="3.5" fill={c} opacity=".9" />)}
      <rect x="140" y="222" width="24" height="26" fill="#26365A" /><rect x="112" y="246" width="80" height="8" rx="4" fill="#26365A" />
      <rect x="18" y="272" width="384" height="14" rx="7" fill="#0A1226" opacity=".85" />
      <rect x="232" y="246" width="26" height="26" rx="5" fill="#FFC25C" /><path d="M258 252h8a6 6 0 0 1 0 14h-8" fill="none" stroke="#FFC25C" strokeWidth="4" />
      <rect x="296" y="168" width="96" height="108" rx="40" fill="#3556F0" />
      <rect x="332" y="150" width="24" height="26" rx="8" fill="#E8B88F" />
      <circle cx="344" cy="128" r="32" fill="#F0C7A0" />
      <path d="M312 122c0-26 18-40 34-40s30 12 30 36c-10-14-24-20-40-18-10 2-18 8-24 22z" fill="#1B2438" />
      <path d="M308 128c0-34 22-52 40-52s38 18 38 52" fill="none" stroke="#0A1226" strokeWidth="6" strokeLinecap="round" />
      <rect x="298" y="122" width="14" height="24" rx="7" fill="#0A1226" /><rect x="380" y="122" width="14" height="24" rx="7" fill="#0A1226" />
    </svg>
  );
}
const CUBE = ["react", "spring", "java", "aws", "mysql", "git"];
function AboutVisual() {
  const box = useRef(null);
  const tilt = useRef(null);
  const move = (e) => {
    if (reduced()) return;
    const r = box.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.setProperty("--rx", `${-y * 16}deg`);
    tilt.current.style.setProperty("--ry", `${x * 20}deg`);
  };
  const leave = () => { tilt.current.style.setProperty("--rx", "0deg"); tilt.current.style.setProperty("--ry", "0deg"); };
  return (
    <div className="visual" ref={box} onPointerMove={move} onPointerLeave={leave}>
      <div className="tilt" ref={tilt}>
        {PROFILE.photo ? <img className="photo" src={PROFILE.photo} alt={PROFILE.name} /> : <DevArt />}
        <span className="chipf c1"><Tile label="React" path="react" /></span>
        <span className="chipf c3"><Tile label="AWS" path="aws" /></span>
        <div className="cubewrap" aria-hidden="true">
          <div className="cube">{CUBE.map((k, i) => <div key={k} className={`face f${i + 1}`}><img src={ICONS[k]} alt="" /></div>)}</div>
        </div>
      </div>
    </div>
  );
}
function Faq() {
  const [open, setOpen] = useState(-1);
  const [all, setAll] = useState(false);
  const list = all ? FAQ : FAQ.slice(0, 6);
  return (
    <div>
      {list.map((f, i) => (
        <div key={f.q} className="faq">
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{f.q}</span><span aria-hidden="true">{open === i ? "−" : "+"}</span></button>
          <div className="proj-body" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}><div><p>{f.a}</p></div></div>
        </div>
      ))}
      {FAQ.length > 6 && <button className="btn small more" onClick={() => setAll(!all)}>{all ? "Show fewer questions" : `Show all ${FAQ.length} questions`}</button>}
    </div>
  );
}
function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", budget: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setSent(false); };
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email address.";
    if (f.message.trim().length < 10) er.message = "Tell me a little more (at least 10 characters).";
    setErr(er);
    if (Object.keys(er).length) return;
    const body = `${f.message}\n\nBudget: ${f.budget || "not sure yet"}\nFrom: ${f.name} (${f.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("New project enquiry from " + f.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <form onSubmit={submit} noValidate className="form">
      {[["name", "Your name", "text"], ["email", "Your email", "email"]].map(([k, label, type]) => (
        <label key={k}>{label}
          <input type={type} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} />
          {err[k] && <span className="err" id={`e-${k}`} role="alert">{err[k]}</span>}
        </label>
      ))}
      <label>Budget (optional)
        <input type="text" value={f.budget} onChange={set("budget")} placeholder="For example: $1,500 or ₹60,000" />
      </label>
      <label>What do you want to build?
        <textarea rows="5" value={f.message} onChange={set("message")} aria-invalid={!!err.message} aria-describedby={err.message ? "e-message" : undefined} />
        {err.message && <span className="err" id="e-message" role="alert">{err.message}</span>}
      </label>
      <button className="btn main" type="submit">Send my project details</button>
      {sent && <p className="note" role="status">Your email app should open with the message ready to send.</p>}
    </form>
  );
}


/* ---------- chat assistant: guides a client, then sends the details to WhatsApp ---------- */
const TYPES = ["Business website", "Web app or portal", "Online store", "Fix or extend existing", "Something else"];
const TIMES = ["As soon as possible", "Within a month", "2 to 3 months", "Flexible"];
const PROMPT = {
  type: "What would you like to build?",
  features: "In a sentence or two, what should it do? For example: customers log in, book a slot and pay online.",
  timeline: "When do you need it?",
  budget: "Do you have a budget in mind? A rough number is fine.",
  name: "Last thing: what's your name?",
};
const CHIPS = { type: TYPES, timeline: TIMES, budget: ["Not sure yet"] };
const INTENTS = [
  { k: ["pay", "payment", "advance", "invoice", "upfront"], faq: "payments work" },
  { k: ["cost", "price", "pricing", "rate", "rates", "charge", "quote", "how much", "fees"], faq: "How much does it cost" },
  { k: ["how long", "timeline", "deadline", "weeks", "duration", "time"], faq: "How long does a project" },
  { k: ["after launch", "support", "warranty", "free fixes"], faq: "after launch" },
  { k: ["wordpress", "wix", "shopify", "no code", "nocode"], faq: "WordPress" },
  { k: ["heavy", "overkill"], faq: "Is Java too heavy" },
  { k: ["java", "spring", "backend", "back end"], faq: "Why do you use Java" },
  { k: ["react", "frontend", "front end"], faq: "Why do you use React" },
  { k: ["seo", "google", "rank"], faq: "rank on Google" },
  { k: ["secure", "security", "safe", "hack", "password"], faq: "keep my site and user data secure" },
  { k: ["mobile", "mobiles", "phone", "phones", "responsive", "tablet", "tablets"], faq: "work well on phones" },
  { k: ["database", "mysql", "postgres", "sql"], faq: "Which database" },
  { k: ["own", "ownership", "source code", "hosting"], faq: "own the code" },
  { k: ["existing", "fix", "bug", "extend", "redesign"], faq: "existing" },
  { k: ["scope", "revision", "changes"], faq: "changes mid-project" },
  { k: ["later", "maintain", "maintenance", "new features"], faq: "add features after launch" },
  { k: ["communicate", "communication", "updates"], faq: "How do we communicate" },
];
const has = (t, k) => new RegExp(`\\b${k}\\b`, "i").test(t);
const waUrl = (text) => `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`;
const summaryText = (d) => `Hi Naresh, I found your portfolio and would like to discuss a project.\n\nName: ${d.name}\nProject type: ${d.type}\nWhat it should do: ${d.features}\nTimeline: ${d.timeline}\nBudget: ${d.budget}\n\nSent from your portfolio chat.`;

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [step, setStep] = useState("idle");
  const [data, setData] = useState({});
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const list = useRef(null), input = useRef(null), started = useRef(false), seen = useRef(false), ids = useRef(0);

  const say = (m, delay = 450) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((x) => [...x, { id: ++ids.current, from: "bot", ...m }]); }, reduced() ? 0 : delay);
  };
  const me = (t) => setMsgs((x) => [...x, { id: ++ids.current, from: "me", text: t }]);

  useEffect(() => {
    const o = () => { seen.current = true; setNudge(false); setOpen(true); };
    window.addEventListener("open-chat", o);
    const t = setTimeout(() => { if (!seen.current) setNudge(true); }, 8000);
    return () => { window.removeEventListener("open-chat", o); clearTimeout(t); };
  }, []);
  useEffect(() => {
    if (!open) return;
    seen.current = true;
    if (!started.current) {
      started.current = true;
      say({ text: "Hi! I'm Naresh's assistant. Tell me about your project in a few quick steps and I'll send the details straight to Naresh on WhatsApp. You can also ask me a question any time.", chips: ["Start my project", "Ask a question"] }, 300);
    }
    const t = setTimeout(() => input.current && input.current.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);
  useEffect(() => { if (list.current) list.current.scrollTop = list.current.scrollHeight; }, [msgs, typing, open]);

  const start = () => { setData({}); setStep("type"); say({ text: "Great! " + PROMPT.type, chips: TYPES }); };
  const advance = (key, value, nextStep) => {
    const d = { ...data, [key]: value };
    setData(d);
    if (nextStep === "done") {
      setStep("done");
      say({ text: `Thanks, ${value}! Here is what I'll send to Naresh. Tap WhatsApp to send it, and he'll reply there.`, summary: d, chips: ["Start over", "Ask a question"] }, 600);
    } else {
      setStep(nextStep);
      say({ text: PROMPT[nextStep], chips: CHIPS[nextStep] });
    }
  };
  const answer = (t) => {
    const q = t.toLowerCase();
    if (/\b(hi|hello|hey|hola|namaste)\b/.test(q) && q.length < 25) return say({ text: "Hello! Would you like to start a project, or do you have a question?", chips: ["Start my project", "Ask a question"] });
    if (/\b(hire|start|quote|get started)\b/.test(q) && /project|hire|quote|started/.test(q)) return start();
    if (/\b(whatsapp|call|call me|phone number|your number|number|email|e-mail|reach you|contact)\b/.test(q)) return say({ text: `You can reach Naresh on WhatsApp, by email (${PROFILE.email}) or by phone (${PROFILE.phoneLabel}). ${PROFILE.hours} ${PROFILE.reply}`, link: { href: waUrl("Hi Naresh, I found your portfolio and have a question."), label: "Open WhatsApp" }, chips: ["Start my project"] });
    if (/(available|availability|free to|when can)/.test(q)) return say({ text: `Naresh is taking new projects now. ${PROFILE.hours} ${PROFILE.reply}`, chips: ["Start my project"] });
    if (/(portfolio|examples?|samples?|previous|past work|your work)/.test(q)) return say({ text: "A good example is ap13news.in, a live news site Naresh built and runs on AWS. You can also open the Work section above to see each project's problem, build and result.", link: { href: "https://ap13news.in", label: "Open ap13news.in" }, chips: ["Start my project"] });
    if (["ios", "android", "native", "app store", "play store", "flutter", "react native"].some((k) => has(q, k))) return say({ text: "I build web apps and portals (React and Spring Boot) that work well on phones, but I don't build native iOS or Android apps. If a web app would do the job, I'd be glad to help.", chips: ["Start my project", "Ask another question"] });
    const hit = INTENTS.find((i) => i.k.some((k) => has(q, k)));
    const faq = hit && FAQ.find((f) => f.q.includes(hit.faq));
    if (faq) return say({ text: faq.a, chips: ["Start my project", "Ask another question"] });
    say({ text: "I'm not sure about that one, so it's best to ask Naresh directly. I can send your question to him on WhatsApp.", link: { href: waUrl(`Hi Naresh, I found your portfolio and have a question: ${t}`), label: "Send question on WhatsApp" }, chips: ["Start my project", "Ask another question"] });
  };
  const handle = (raw) => {
    const t = raw.trim();
    if (!t) return;
    setText("");
    if (t === "Start my project" || t === "Start over") { me(t); return start(); }
    if (t === "Ask a question" || t === "Ask another question") { me(t); return say({ text: "Sure, ask me anything about cost, timelines, technology or how we work. Or pick one:", chips: ["How much does it cost?", "How long does it take?", "Why React and Java?", "Do I own the code?"] }); }
    me(t);
    const inFlow = ["type", "features", "timeline", "budget", "name"].includes(step);
    if (inFlow && t.endsWith("?")) { answer(t); setTimeout(() => say({ text: "Back to your project: " + PROMPT[step], chips: CHIPS[step] }, 700), 900); return; }
    if (step === "type") return advance("type", t, "features");
    if (step === "features") return advance("features", t, "timeline");
    if (step === "timeline") return advance("timeline", t, "budget");
    if (step === "budget") return advance("budget", t, "name");
    if (step === "name") return advance("name", t, "done");
    answer(t);
  };

  const last = msgs[msgs.length - 1];
  const chips = last && last.from === "bot" && !typing ? last.chips : null;
  const placeholder = { type: "Or type your own", features: "Describe what it should do", timeline: "Or type a date", budget: "For example: $1,500 or ₹60,000", name: "Your name" }[step] || "Type a message";

  return (
    <div className="chat">
      {open && (
        <div className="chatwin" role="dialog" aria-label="Chat with Naresh's assistant" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <div className="chathead">
            <span className="chatav">NC</span>
            <div><b>Naresh's assistant</b><small><span className="dot" aria-hidden="true" /> Online, replies instantly</small></div>
            <button className="chatx" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatlist" ref={list} role="log" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`msg ${m.from}`}>
                {m.text}
                {m.summary && (
                  <div className="sum">
                    {[["Name", m.summary.name], ["Project", m.summary.type], ["It should", m.summary.features], ["Timeline", m.summary.timeline], ["Budget", m.summary.budget]].map(([k, v]) => <div key={k}><b>{k}:</b> {v}</div>)}
                    <div className="sumbtns">
                      <a className="btn small wa" href={waUrl(summaryText(m.summary))} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
                      <a className="btn small ghost" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("New project enquiry from " + m.summary.name)}&body=${encodeURIComponent(summaryText(m.summary))}`}>Send by email</a>
                    </div>
                  </div>
                )}
                {m.link && <a className="btn small wa linkbtn" href={m.link.href} target="_blank" rel="noopener noreferrer">{m.link.label}</a>}
              </div>
            ))}
            {typing && <div className="msg bot dots" aria-label="Typing"><span /><span /><span /></div>}
          </div>
          {chips && <div className="qchips">{chips.map((c) => <button key={c} className="qchip" onClick={() => handle(c)}>{c}</button>)}</div>}
          <form className="chatform" onSubmit={(e) => { e.preventDefault(); handle(text); }}>
            <input ref={input} value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label="Your message" maxLength={400} />
            <button type="submit" aria-label="Send message" disabled={!text.trim()}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}
      {!open && nudge && <div className="nudge" role="status">Have a project? Chat with me <button aria-label="Dismiss" onClick={() => setNudge(false)}>×</button></div>}
      {!open && (
        <button className="chatfab" aria-label="Chat with Naresh's assistant" aria-expanded="false" onClick={() => { seen.current = true; setNudge(false); setOpen(true); }}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></svg>
        </button>
      )}
    </div>
  );
}


/* ---------- 3D landing page (shown first) ---------- */
const LP_TAGS = ["Java full-stack developer", "React + Spring Boot", "Web apps that go live on AWS"];
const LP_RING = ["react", "spring", "java", "aws", "mysql", "postgresql", "nginx", "git", "tailwind", "javascript"];
const LP_CUBES = [[-36, -30, -140, 74, 0], [38, -26, -300, 56, -4], [-42, 24, -380, 92, -8], [42, 32, 70, 46, -2], [-12, -42, -460, 62, -6], [16, 42, -220, 52, -9]];
const LP_STARS = Array.from({ length: 46 }, (_, i) => ({ l: (i * 53) % 100, t: (i * 29 + 7) % 100, s: 1 + (i % 3) * 0.7, d: (i * 0.37) % 4 }));

function Word3D({ text }) {
  return (
    <span className="ex" aria-hidden="true">
      {[...text].map((c, i) => (
        <span key={i} className="exl" style={{ "--i": i }}>
          {Array.from({ length: 14 }, (_, k) => <span key={k} className={k === 0 ? "exf" : "exb"} style={{ "--k": k }}>{c}</span>)}
        </span>
      ))}
    </span>
  );
}
function LpCount() {
  const [n, setN] = useState(5);
  useEffect(() => { const id = setInterval(() => setN((x) => Math.max(1, x - 1)), 1000); return () => clearInterval(id); }, []);
  return <>Entering in {n}s</>;
}
function LpTag() { const t = useTyped(LP_TAGS); return <span>{t}</span>; }

function Landing({ leaving, onEnter }) {
  const root = useRef(null), btn = useRef(null), raf = useRef(0);
  useEffect(() => {
    if (btn.current) btn.current.focus({ preventScroll: true });
    const key = (e) => { if (e.key === "Escape" || (e.key === "Enter" && document.activeElement === document.body)) onEnter(); };
    window.addEventListener("keydown", key);
    const auto = setTimeout(onEnter, 5000);   // moves on to the portfolio by itself after 5 seconds
    return () => { window.removeEventListener("keydown", key); clearTimeout(auto); };
  }, [onEnter]);
  const move = (e) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = root.current; if (!el) return;
      el.style.setProperty("--ry", `${(clientX / window.innerWidth - 0.5) * 28}deg`);
      el.style.setProperty("--rx", `${-(clientY / window.innerHeight - 0.5) * 16}deg`);
      el.style.setProperty("--gx", `${(clientX / window.innerWidth - 0.5) * -60}px`);
    });
  };
  return (
    <section className={`lp ${leaving ? "leave" : ""}`} ref={root} onPointerMove={move} aria-label="Introduction">
      <style>{LANDING_CSS}</style>
      <div className="lp-bg" aria-hidden="true">
        {LP_STARS.map((st, i) => <i key={i} style={{ left: `${st.l}%`, top: `${st.t}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }} />)}
        <b className="lp-beam" /><b className="lp-beam b2" />
        <b className="lp-ripple" /><b className="lp-ripple r2" /><b className="lp-ripple r3" />
      </div>
      <div className="lp-floor" aria-hidden="true" />
      <div className="lp-stage"><div className="lp-fly"><div className="lp-sway">
        <h1 className="lp-h1" aria-label="Welcome to my portfolio">
          <small>Hello there</small>
          <Word3D text="WELCOME" />
          <span className="lp-sub">to my portfolio</span>
        </h1>
        <div className="lp-tilt" aria-hidden="true">
          <div className="ring">{LP_RING.map((k, i) => <span key={k} className="lp-tile" style={{ "--i": i }}><img src={ICONS[k]} alt="" /></span>)}</div>
        </div>
        <div className="lp-tilt t2" aria-hidden="true">
          <div className="ring r2">{Array.from({ length: 28 }, (_, i) => <span key={i} className={`dotp ${i % 3 === 0 ? "gold" : ""}`} style={{ "--i": i }} />)}</div>
        </div>
        {LP_CUBES.map(([x, y, z, sz, d], i) => (
          <span key={i} className="cube3" aria-hidden="true" style={{ "--x": `${x}vw`, "--y": `${y}vh`, "--z": `${z}px`, "--s": `${sz}px`, "--d": `${d}s` }}>
            <span className="cb"><i /><i /><i /><i /><i /><i /></span>
          </span>
        ))}
      </div></div></div>
      <div className="lp-top"><span className="lp-chip"><span className="dot" aria-hidden="true" /> Available for new projects</span></div>
      <div className="lp-ui">
        <p className="lp-typed"><LpTag /><i className="lp-caret" aria-hidden="true" /></p>
        <button className="lp-cta" ref={btn} onClick={onEnter}>
          Enter now
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <div className="lp-bar" aria-hidden="true"><i /></div>
        <p className="lp-hint"><LpCount /> &middot; move your mouse or drag to look around</p>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
function Portfolio() {
  const [dark, setDark] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const active = useActive();
  const [menu, setMenu] = useState(false);
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => bar.current && bar.current.classList.toggle("stuck", window.scrollY > 24)); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.title = SEO.title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = SEO.description;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "ProfessionalService", name: `${PROFILE.name}, Full-Stack Developer`,
      description: SEO.description, email: PROFILE.email, telephone: PROFILE.phone,
      areaServed: "Worldwide", address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
      sameAs: [PROFILE.github, PROFILE.linkedin].filter(Boolean),
    });
    document.head.appendChild(ld);
    return () => ld.remove();
  }, []);

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <style>{CSS}</style>
      <a className="skip" href="#services">Skip to content</a>
      <Progress />
      <header className="topbar" ref={bar}><div className="wrap">
        <nav aria-label="Main">
          <Brand />
          <div className="links">
            <div className={`navlinks ${menu ? "open" : ""}`}>
              {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className={`nl ${active === id ? "cur" : ""}`} aria-current={active === id ? "true" : undefined}>{label}</a>)}
            </div>
            <button className="theme" role="switch" aria-checked={dark} aria-label="Dark mode" title={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark(!dark)}>
              <span className="tk" aria-hidden="true">
                <i className="knob" />
                <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              </span>
            </button>
            <a className="btn main small hire" href={ctaHref} onClick={openChat}>{PROFILE.bookingUrl ? "Book a call" : "Hire me"}</a>
            <button className="burger" aria-expanded={menu} aria-label="Toggle menu" onClick={() => setMenu(!menu)}><i /><i /><i /></button>
          </div>
        </nav>
      </div></header>
      <div className="band top"><div className="wrap">
        

        <Spotlight>
          <div>
            <p className="avail"><span className="dot" aria-hidden="true" /> Available for new projects</p>
            <h1>I build web apps and portals<span className="grad">for small businesses.</span></h1>
            <p className="typed" aria-live="off">Right now I could build you <Typed /><i className="caret" aria-hidden="true" /></p>
            <p className="lead">Java full-stack developer in Hyderabad. React on the front, Spring Boot behind it, live on AWS with your own domain. You get a fixed price and a written scope before I start.</p>
            <div className="btns">
              <a className="btn main" href={ctaHref} onClick={openChat}>{PROFILE.bookingUrl ? "Book a free call" : "Start a project"}</a>
              <a className="btn" href={waLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
            <p className="meta verify">Check my work yourself: <a href="https://ap13news.in" target="_blank" rel="noopener noreferrer">live site</a>, <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>, <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">resume</a>.</p>
            <p className="meta"><Clock /> {PROFILE.reply}</p>
          </div>
          <div className="stage">
            <StatusPanel />
            <span className="chipf c4"><Tile label="React" path="react" /></span>
            <span className="chipf c5"><Tile label="Spring Boot" path="spring" /></span>
            <span className="chipf c6"><Tile label="AWS" path="aws" /></span>
          </div>
        </Spotlight>
      </div></div>
      <div className="wrap">
        <div className="stats">
          {PROOF.map((s) => <div key={s.label}><strong><Counter value={s.value} suffix={s.suffix} /></strong><span>{s.label}</span></div>)}
        </div>
      </div>

      <section id="services"><div className="wrap">
        <Reveal as="h2">What I can build for you</Reveal>
        <div className="grid3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} i={i}>
              <Tilt className="card">
                <Glyph name={s.icon} />
                <h3>{s.title}</h3><p className="who">{s.who}</p>
                <p>{s.text}</p><ul className="facts stack">{s.gets.map((g) => <li key={g}>{g}</li>)}</ul>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div></section>

      <section id="work"><div className="wrap">
        <Reveal as="h2">Recent projects</Reveal>
        <p className="sub">Each one shows the problem, what I built and what it achieved.</p>
        <Projects />
      </div></section>

      {TESTIMONIALS.length > 0 && (
        <section><div className="wrap">
          <Reveal as="h2">What clients say</Reveal>
          <div className="quotes">{TESTIMONIALS.map((t) => <figure key={t.name}><blockquote>{t.quote}</blockquote><figcaption>{t.name}, {t.role}</figcaption></figure>)}</div>
        </div></section>
      )}

      <section id="process"><div className="wrap">
        <Reveal as="h2">How we work together</Reveal>
        <ol className="steps">{STEPS.map((s) => <li key={s.t}><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
      </div></section>

      <section id="terms"><div className="wrap">
        <Reveal as="h2">What you get, and who I'm right for</Reveal>
        <div className="cols">
          <div><h3>Every project includes</h3><ul className="facts stack">{STANDARDS.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div>
            <h3>I'm a good fit if</h3><ul className="facts stack">{FIT.good.map((x) => <li key={x}>{x}</li>)}</ul>
            <h3 className="gap">I'm not the right fit if</h3><ul className="facts stack no">{FIT.not.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <div className="grid3">{ENGAGE.map((e) => <div key={e.t} className="card"><h3>{e.t}</h3><p>{e.d}</p></div>)}</div>
      </div></section>

      <section id="about"><div className="wrap">
        <Reveal as="h2">About me</Reveal>
        <div className="aboutTop">
          <AboutVisual />
          <div>
            <p className="bio">Hi, I'm {PROFILE.name}, a Java full-stack developer in Hyderabad. I build web applications from start to finish: the React front end, the Spring Boot API, the database, and the deployment on AWS.</p>
            <p className="lead">I moved into software from an Electronics and Communications degree through hands-on projects and a full-stack internship, where fixes to queries and backend logic made the application 25% faster. Today I run a live news portal on my own AWS server and have delivered a job portal as a freelance project.</p>
            <p className="lead">Before developing full time, I spent two years at Wipro in data validation and quality control, which is where my habit of accuracy, deadlines and clear reporting comes from. With clients, that means a written scope, plain-language updates, and code you own.</p>
            <dl className="facts-grid">{FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <p className="links2">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              {PROFILE.linkedin && <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">Download resume</a>
            </p>
          </div>
        </div>
        <h3 className="toolhead">Tools I work with</h3>
        <Tools />
      </div></section>

      <section><div className="wrap">
        <Reveal as="h2">Questions clients ask</Reveal>
        <Faq />
      </div></section>

      <section id="contact" className="band"><div className="wrap two">
        <div>
          <Reveal as="h2">Tell me about your project</Reveal>
          <p className="lead">Share what you want to build and when you need it. I'll reply with next steps and a rough timeline. {PROFILE.reply}</p>
          <p><a className="plain" href={mailLink}>{PROFILE.email}</a></p>
          <p><a className="plain" href={`tel:${PROFILE.phone}`}>{PROFILE.phoneLabel}</a></p>
          <p><a className="plain" href={waLink} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></p>
          <p><a className="plain" href="#contact" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("open-chat")); }}>Or chat with my assistant</a></p>
          <p className="meta">{PROFILE.hours}</p>
        </div>
        <ContactForm />
      </div></section>

      <ChatBot />
      <footer><div className="wrap">{PROFILE.name}, Java full-stack developer, Hyderabad, India.</div></footer>
      <a className="sticky" href={ctaHref} onClick={openChat}>{PROFILE.bookingUrl ? "Book a free call" : "Start a project"}</a>
    </div>
  );
}


const initialPhase = () => (typeof window !== "undefined" && (window.location.hash.length > 1 || /[?&]skip/.test(window.location.search)) ? "site" : "landing");
export default function App() {
  const [phase, setPhase] = useState(initialPhase);
  const busy = useRef(false);
  const enter = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setPhase("leaving");
    setTimeout(() => { window.scrollTo(0, 0); setPhase("site"); }, reduced() ? 60 : 1300);
  }, []);
  return (
    <>
      <div className={phase === "leaving" ? "enter-anim" : undefined}>{phase !== "landing" && <Portfolio />}</div>
      {phase !== "site" && <Landing leaving={phase === "leaving"} onEnter={enter} />}
    </>
  );
}

/* ---------- styles ---------- */
const CSS = `
.app{--bg:#F5F7FB;--panel:#fff;--ink:#0F1A2E;--soft:#506077;--line:#DCE3EE;--accent:#3556F0;--on:#fff;--live:#12935F;--amber:#F5A524;
  --shadow:0 1px 2px rgba(15,26,46,.06),0 14px 34px rgba(15,26,46,.08);
  --display:"Bricolage Grotesque","Segoe UI",system-ui,sans-serif;--text:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;
  min-height:100vh;background:var(--bg);color:var(--ink);font:400 1.0625rem/1.6 var(--text);transition:background .3s,color .3s}
.app.dark{--bg:#0B1220;--panel:#131D31;--ink:#E9EEF7;--soft:#9DB0C7;--line:#243349;--accent:#7C9BFF;--on:#0B1220;--live:#3DD598;--shadow:0 1px 2px rgba(0,0,0,.4),0 14px 34px rgba(0,0,0,.35)}
.band,.topbar{--ink:#F4F7FD;--soft:rgba(244,247,253,.72);--line:rgba(255,255,255,.16);--panel:rgba(255,255,255,.07);--accent:#8FA8FF;--on:#0A1226;--live:#46DDA0;color:var(--ink)}
.band{background:#0A1226;position:relative;overflow:hidden}
.topbar{position:fixed;top:0;left:0;right:0;z-index:55;padding-top:env(safe-area-inset-top,0px);transition:background .3s,box-shadow .3s,border-color .3s;border-bottom:1px solid transparent}
.topbar.stuck{background:rgba(10,18,38,.93);-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4);border-bottom-color:rgba(255,255,255,.12);box-shadow:0 10px 30px rgba(0,0,0,.28)}
.topbar nav{padding:20px 0;transition:padding .3s}.topbar.stuck nav{padding:9px 0}
.topbar.stuck .mono{width:38px;height:38px}
html{scroll-padding-top:84px}
.band::before{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(700px 380px at 85% 0%,rgba(79,110,255,.45),transparent 70%),radial-gradient(500px 300px at 0% 100%,rgba(245,165,36,.18),transparent 70%),
  linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px) 0 0/48px 48px;
  -webkit-mask-image:linear-gradient(#000 60%,transparent);mask-image:linear-gradient(#000 60%,transparent)}
.band>.wrap{position:relative}
.app *,.app *::before,.app *::after{box-sizing:border-box}
:where(.app) a{color:inherit}
.app :focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:4px}
.app h1,.app h2,.app h3,.app h4{font-family:var(--display);line-height:1.08;margin:0;letter-spacing:-.02em}
.app button,.app select{font:inherit;color:inherit;cursor:pointer}
.wrap{max-width:1080px;margin:0 auto;padding:0 clamp(16px,4vw,24px)}
.progress{position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--amber));transform-origin:0 50%;z-index:70}
nav{display:flex;justify-content:space-between;align-items:center;padding:22px 0;gap:12px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}
.mono{position:relative;width:44px;height:44px;transition:width .3s,height .3s,transform .35s cubic-bezier(.3,1.6,.5,1);border-radius:13px;overflow:hidden;display:grid;place-items:center;flex:none}
.mono::before{content:"";position:absolute;inset:-70%;background:conic-gradient(#8FA8FF,#B88CFF,#FFB86B,#46DDA0,#8FA8FF);animation:spin2 6s linear infinite}
.mono::after{content:"";position:absolute;inset:2px;border-radius:11px;background:#0A1226}
@keyframes spin2{to{transform:rotate(360deg)}}
.avsvg{position:relative;z-index:1;width:calc(100% - 4px);height:calc(100% - 4px);margin:2px;border-radius:11px;display:block}
.n3d{display:inline-block;perspective:420px;margin-right:2px;font-size:1.3em;line-height:1}
.n3d-in{position:relative;display:inline-block;transform-style:preserve-3d;animation:swing 5s ease-in-out infinite}
.nf{position:relative;display:inline-block;background:linear-gradient(135deg,#fff 30%,#B9CBFF);-webkit-background-clip:text;background-clip:text;color:transparent;transform:translateZ(7px)}
.nb{position:absolute;left:0;top:0;transform:translateZ(calc(7px - var(--k)*2px));color:color-mix(in srgb,#4A6BFF calc(100% - var(--k)*10%),#1A2A6B)}
@keyframes swing{0%,100%{transform:rotateY(-32deg) rotateX(6deg)}50%{transform:rotateY(32deg) rotateX(-6deg)}}
@keyframes spinN{to{transform:rotateY(360deg)}}
.brand:hover .n3d-in{animation:spinN 1.1s cubic-bezier(.3,1.2,.4,1) 1;animation-delay:0s!important}
.brand:hover .mono{transform:rotate(-8deg) scale(1.08)}
.bname{display:flex;flex-direction:column;line-height:1.1}
.bline{display:flex;align-items:baseline;font:700 1.2rem var(--display);letter-spacing:-.01em;white-space:nowrap}
.word{display:inline-flex}.word+.word{margin-left:.32em}
.ch{display:inline-block;color:#fff;animation:sweep 7s ease-in-out infinite;animation-delay:calc(var(--i)*.12s);transition:transform .3s cubic-bezier(.3,1.8,.5,1);transition-delay:calc(var(--i)*22ms)}
@keyframes sweep{0%,62%,100%{color:#fff}72%{color:#FFC25C}82%{color:#9CB4FF}}
.brand:hover .ch{transform:translateY(-5px)}
.br{font-style:normal;color:#8FA8FF;font-weight:500;opacity:0;max-width:0;overflow:hidden;transition:opacity .3s,max-width .35s,margin .35s}
.brand:hover .br,.brand:focus-visible .br{opacity:1;max-width:1.6em}
.brand:hover .br:first-child{margin-right:.3em}.brand:hover .br:last-child{margin-left:.3em}
.bname small{margin-top:4px;font-size:.78rem;color:var(--soft);min-height:1.1em;letter-spacing:.01em}
.bcaret{display:inline-block;width:7px;height:2px;background:var(--amber);margin-left:3px;vertical-align:baseline;animation:blink 1s steps(1) infinite}
.links{display:flex;align-items:center;gap:4px}.navlinks{display:flex;align-items:center;gap:2px}.burger{display:none;background:none;border:1.5px solid var(--line);border-radius:10px;width:42px;height:38px;padding:0;margin-left:6px;flex-direction:column;align-items:center;justify-content:center;gap:4px}.burger i{width:18px;height:2px;background:var(--ink);border-radius:2px;transition:transform .2s,opacity .2s}.burger[aria-expanded="true"] i:nth-child(1){transform:translateY(6px) rotate(45deg)}.burger[aria-expanded="true"] i:nth-child(2){opacity:0}.burger[aria-expanded="true"] i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
nav{position:relative}
.nl{text-decoration:none;color:var(--soft);font-size:.95rem;padding:6px 11px;border-radius:99px}
.nl:hover,.nl.cur{color:var(--ink);background:rgba(255,255,255,.1)}
.theme{background:none;border:0;padding:0;margin:0 8px 0 6px;color:var(--soft)}
.tk{position:relative;display:flex;align-items:center;justify-content:space-between;width:68px;height:36px;padding:0 9px;border-radius:99px;border:1.5px solid var(--line);background:rgba(255,255,255,.08);transition:background .3s,border-color .3s}
.tk svg{position:relative;z-index:1;width:18px;height:18px;transition:color .3s,transform .5s cubic-bezier(.3,1.4,.5,1)}
.knob{position:absolute;top:3px;left:3px;width:27px;height:27px;border-radius:50%;background:linear-gradient(135deg,#FFC25C,#FF9F43);box-shadow:0 2px 8px rgba(0,0,0,.35);transition:transform .35s cubic-bezier(.3,1.4,.5,1),background .3s}
.theme[aria-checked="true"] .knob{transform:translateX(32px);background:linear-gradient(135deg,#9CB4FF,#B88CFF)}
.theme[aria-checked="false"] .sun,.theme[aria-checked="true"] .moon{color:#0A1226}
.theme[aria-checked="false"] .sun{transform:rotate(90deg)}
.theme:hover .tk{border-color:var(--accent)}
.hero{--mx:70%;--my:30%;display:grid;grid-template-columns:1.3fr 1fr;gap:56px;align-items:center;padding:calc(var(--nav-h,84px) + 24px) 0 120px;
  background:radial-gradient(380px circle at var(--mx) var(--my),rgba(143,168,255,.16),transparent 70%)}
.hero h1{font-size:clamp(2.3rem,4.7vw,3.7rem);font-weight:700;color:#fff;line-height:1.06}
.grad{display:block;width:fit-content;padding-bottom:.08em;background:linear-gradient(100deg,#8FA8FF,#B88CFF 50%,#FFB86B);-webkit-background-clip:text;background-clip:text;color:transparent}
.avail{display:inline-flex;align-items:center;gap:10px;margin:0 0 18px;font-weight:500;font-size:.92rem;border:1px solid var(--line);border-radius:99px;padding:5px 14px;background:var(--panel);backdrop-filter:blur(6px)}
.typed{margin:22px 0 6px;color:var(--soft)}.typed span{color:#fff;font-weight:500}
.caret{display:inline-block;width:2px;height:1.1em;background:var(--amber);margin-left:3px;vertical-align:text-bottom;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.lead{max-width:38em;color:var(--soft);margin:10px 0 24px}
.meta{color:var(--soft);font-size:.9rem;margin:14px 0 0}
.btns{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-block;padding:13px 24px;border-radius:10px;text-decoration:none;font-weight:500;border:1.5px solid var(--ink);background:none;transition:transform .15s,box-shadow .15s}
.btn.main{background:linear-gradient(135deg,var(--accent),color-mix(in srgb,var(--accent) 60%,#6B4BFF));border-color:transparent;color:var(--on);box-shadow:0 8px 22px color-mix(in srgb,var(--accent) 35%,transparent)}
.btn.small{padding:8px 16px;font-size:.92rem}
.btn:hover{transform:translateY(-2px)}
.stage{position:relative;transform:translate3d(calc(var(--px,0)*-14px),calc(var(--py,0)*-10px),0);transition:transform .25s ease-out;will-change:transform}
.stage .chipf{translate:calc(var(--px,0)*-30px) calc(var(--py,0)*-22px);transition:translate .25s ease-out}
.c4{top:-24px;right:22px}.c5{bottom:-46px;left:34px;animation-delay:-2s}.c6{bottom:-46px;right:40px;animation-delay:-3.5s}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:22px 24px;backdrop-filter:blur(10px);box-shadow:0 24px 60px rgba(0,0,0,.35)}
.panel-head{display:flex;align-items:center;gap:10px;font:700 1.05rem var(--display);margin-bottom:12px}
.dot{width:10px;height:10px;border-radius:50%;background:var(--live);flex:none;animation:pulse 2.4s ease-out 3}
@keyframes pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--live) 60%,transparent)}100%{box-shadow:0 0 0 12px transparent}}
.panel ul{list-style:none;margin:0 0 14px;padding:0}
.panel li{display:flex;justify-content:space-between;gap:16px;padding:9px 0;border-top:1px solid var(--line);font-size:.95rem;opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s}
.panel li.on{opacity:1;transform:none}.ok{color:var(--live);font-weight:500}.panel a{font-size:.95rem}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin:-72px 0 8px;position:relative;z-index:2;background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:28px 32px;box-shadow:var(--shadow)}
.stats strong{display:block;font:700 3rem/1.1 var(--display);color:var(--accent)}.stats strong span{font:inherit;color:inherit}.stats>div>span{display:block;color:var(--soft);font-size:.95rem;margin-top:4px}
section{padding:clamp(48px,8vw,72px) 0;content-visibility:auto;contain-intrinsic-size:auto 720px}
section h2{font-size:clamp(1.8rem,3.6vw,2.6rem);margin-bottom:12px}
section h2::after{content:"";display:block;width:56px;height:4px;border-radius:4px;margin-top:14px;background:linear-gradient(90deg,var(--accent),var(--amber))}
#contact h2::after{background:linear-gradient(90deg,#8FA8FF,#FFC25C)}
section>.wrap>h2,.two h2{margin-bottom:28px}
.sub{color:var(--soft);margin:-14px 0 26px}
#work,#terms,#about{background:linear-gradient(180deg,color-mix(in srgb,var(--panel) 70%,transparent),color-mix(in srgb,var(--accent) 5%,var(--bg)))}
#services{background:radial-gradient(600px 300px at 90% 0%,color-mix(in srgb,var(--accent) 8%,transparent),transparent)}
.reveal{opacity:0;transform:translateY(14px);transition:opacity .6s,transform .6s}.reveal.in{opacity:1;transform:none}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:20px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:26px;box-shadow:var(--shadow);transition:transform .2s,border-color .2s}
.grid3>.reveal{display:flex}.grid3>.reveal>.card{flex:1}
.tiltcard{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .2s ease-out,border-color .2s,box-shadow .2s}
@media (hover:hover){.card:hover{border-color:var(--accent);box-shadow:0 18px 40px color-mix(in srgb,var(--accent) 22%,transparent)}}
.glyph{display:grid;place-items:center;width:52px;height:52px;border-radius:14px;margin-bottom:16px;color:#fff;background:linear-gradient(135deg,var(--accent),#7A5BFF);box-shadow:0 8px 18px color-mix(in srgb,var(--accent) 30%,transparent)}
.glyph svg{width:26px;height:26px}
.card h3{font-size:1.3rem;margin-bottom:8px}.card p{margin:0 0 12px;color:var(--soft)}.card .who{color:var(--ink);font-weight:500;font-size:.95rem}
.facts{list-style:none;margin:0 0 12px;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px;font-weight:500;font-size:.95rem}
.facts.stack{flex-direction:column;gap:9px}
.facts li::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--live);margin-right:9px}
.facts.no li::before{background:none;border:2px solid var(--soft)}
.plist{display:flex;flex-direction:column;gap:16px}
.proj{background:var(--panel);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow);overflow:hidden}
.proj-head{width:100%;display:flex;align-items:center;gap:14px;background:none;border:0;padding:24px 26px;text-align:left}
.proj-name{font:700 1.6rem var(--display)}
.mini{display:flex;gap:6px;flex:1;margin-left:10px}.mini .tile{width:34px;height:34px;border-radius:10px}.mini .tile img{width:20px;height:20px}
.proj-head:hover .plus{background:var(--accent);color:var(--on)}
.badge{font-size:.8rem;font-weight:500;border:1px solid var(--line);border-radius:99px;padding:2px 11px;color:var(--soft)}
.badge.live{color:var(--live);border-color:var(--live)}.badge.freelance{color:var(--accent);border-color:var(--accent)}
.plus{font-size:1.4rem;width:2rem;height:2rem;line-height:1.8rem;text-align:center;border-radius:50%;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}
.proj-body{display:grid;transition:grid-template-rows .35s ease}.proj-body>div{overflow:hidden}
.case{display:grid;grid-template-columns:1.2fr 1fr;gap:36px;padding:4px 26px 30px}
.case h4{font-size:1rem;margin:16px 0 4px;color:var(--accent)}.case h4:first-of-type{margin-top:6px}
.case p{margin:0 0 6px;color:var(--soft);max-width:60ch}.stack-line{color:var(--ink)!important;font-size:.95rem;margin:4px 0 16px!important;font-weight:500}
.role{color:var(--ink)!important}
.frame{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--bg);align-self:start;box-shadow:var(--shadow)}
.bar{display:flex;align-items:center;gap:6px;padding:10px 12px;border-bottom:1px solid var(--line);background:var(--panel)}
.bar i{width:10px;height:10px;border-radius:50%;background:#FF6B6B}.bar i:nth-child(2){background:#FFC25C}.bar i:nth-child(3){background:#46DDA0}
.bar span{margin-left:8px;font-size:.8rem;color:var(--soft)}
.frame img{display:block;width:100%;height:auto}
.ph{aspect-ratio:16/10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 22%,transparent),color-mix(in srgb,var(--amber) 14%,transparent))}
.ph b{font:700 1.5rem var(--display)}.ph span{color:var(--soft);font-size:.9rem}
.quotes{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.quotes figure{margin:0;padding:26px;border:1px solid var(--line);border-radius:18px;background:var(--panel);box-shadow:var(--shadow)}
.quotes blockquote{margin:0 0 12px;font-size:1.1rem}.quotes figcaption{color:var(--soft);font-size:.92rem}
.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;counter-reset:s}
.steps li{counter-increment:s;background:var(--panel);border:1px solid var(--line);border-top:4px solid var(--accent);border-radius:14px;padding:18px;box-shadow:var(--shadow)}
.steps li::before{content:counter(s);display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--accent);color:var(--on);font:700 .9rem var(--display)}
.steps h3{font-size:1.2rem;margin:10px 0 6px}.steps p{margin:0;color:var(--soft);font-size:.96rem}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:8px}
.cols>div{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:26px;box-shadow:var(--shadow)}
.cols h3{font-size:1.2rem;margin-bottom:12px}.cols .gap{margin-top:22px}
.aboutTop{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:48px;align-items:start}
.visual{position:relative;perspective:1100px;padding:14px 18px 40px 6px}
.tilt{position:relative;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .18s ease-out}
.tilt::before{content:"";position:absolute;inset:20px -16px -20px 18px;border-radius:26px;background:linear-gradient(135deg,var(--accent),var(--amber));opacity:.4;transform:translateZ(-60px)}
.tilt .devart,.tilt .photo{transform:translateZ(0)}
.cubewrap{position:absolute;right:22px;bottom:-30px;width:92px;height:92px;perspective:520px;transform:translateZ(120px)}
.cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:spin 18s linear infinite}
.face{position:absolute;inset:0;display:grid;place-items:center;background:#fff;border:1px solid #DCE3EE;border-radius:14px;backface-visibility:hidden;box-shadow:inset 0 0 18px rgba(53,86,240,.08)}
.face img{width:46px;height:46px;object-fit:contain}
.f1{transform:rotateY(0deg) translateZ(46px)}.f2{transform:rotateY(90deg) translateZ(46px)}.f3{transform:rotateY(180deg) translateZ(46px)}
.f4{transform:rotateY(-90deg) translateZ(46px)}.f5{transform:rotateX(90deg) translateZ(46px)}.f6{transform:rotateX(-90deg) translateZ(46px)}
@keyframes spin{from{transform:rotateX(-24deg) rotateY(0deg)}to{transform:rotateX(-24deg) rotateY(360deg)}}
#about{overflow-x:clip}
.devart,.photo{display:block;width:100%;height:auto;border-radius:26px;box-shadow:var(--shadow)}
.photo{aspect-ratio:4/5;object-fit:cover}
.chipf{transform:translateZ(70px);position:absolute;background:#fff;border-radius:16px;padding:6px;box-shadow:0 10px 28px rgba(15,26,46,.25);animation:floaty 5s ease-in-out infinite}
.chipf .tile{box-shadow:none;width:44px;height:44px}
.c1{top:-6px;left:-6px}.c3{bottom:-22px;left:22%;animation-delay:-3.2s}
@keyframes floaty{0%,100%{transform:translateZ(70px)}50%{transform:translateZ(70px) translateY(-8px)}}
.bio{font:500 1.35rem/1.4 var(--display);letter-spacing:-.01em;margin:0 0 16px}
.aboutTop .lead{margin:0 0 14px;max-width:none}
.facts-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0 0}
.facts-grid>div{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.facts-grid dt{color:var(--soft);font-size:.82rem;margin-bottom:2px}.facts-grid dd{margin:0;font-weight:500;font-size:.95rem}
.toolhead{font-size:1.4rem;margin:56px 0 20px}
.tools{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px}
.toolgroup{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:20px;box-shadow:var(--shadow)}
.toolgroup h4{font-size:.95rem;color:var(--soft);margin-bottom:14px}
.tilerow{display:flex;flex-wrap:wrap;gap:12px}
.tile{width:54px;height:54px;border-radius:14px;background:#fff;border:1px solid var(--line);display:grid;place-items:center;transition:transform .2s}
.tile:hover{transform:translateY(-4px) scale(1.06)}
.tile img{width:32px;height:32px;object-fit:contain}.tile b{color:#14202E;font-size:.9rem}
.links2{display:flex;flex-wrap:wrap;gap:20px;margin:22px 0 0}.links2 a{text-underline-offset:4px;font-weight:500}
.faq{background:var(--panel);border:1px solid var(--line);border-radius:14px;margin-bottom:10px;padding:0 20px}
.faq>button{width:100%;display:flex;justify-content:space-between;gap:16px;background:none;border:0;padding:18px 0;text-align:left;font-weight:500;font-size:1.05rem}
.more{margin-top:8px;color:var(--ink)}
.faq p{margin:0 0 18px;color:var(--soft);max-width:62ch}
.two{display:grid;grid-template-columns:1fr 1fr;gap:56px}
#contact{padding:80px 0}
.plain{text-decoration:underline;text-underline-offset:4px}
.form{display:flex;flex-direction:column;gap:16px;background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:28px;backdrop-filter:blur(8px)}
.form label{display:flex;flex-direction:column;gap:6px;font-weight:500;font-size:.95rem}
.form input,.form textarea,.form select{font:inherit;background:rgba(255,255,255,.08);color:#fff;border:1.5px solid var(--line);border-radius:10px;padding:12px 14px}
.form select option{color:#000}
.form [aria-invalid="true"]{border-color:#FF8A8A}.err{color:#FF9B9B;font-weight:400;font-size:.88rem}
.note{margin:0;color:var(--live)}.form .btn{align-self:flex-start}
footer{padding:28px 0 90px;color:var(--soft);font-size:.9rem}
.sticky{display:none}
.chat{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:60;font-family:var(--text)}
.chatfab{width:60px;height:60px;border-radius:50%;border:0;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#3556F0,#7A5BFF);box-shadow:0 12px 30px rgba(53,86,240,.45);animation:ring 2.6s ease-out 3;transition:transform .2s}
.chatfab:hover{transform:scale(1.07)}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(122,91,255,.55),0 12px 30px rgba(53,86,240,.45)}100%{box-shadow:0 0 0 18px rgba(122,91,255,0),0 12px 30px rgba(53,86,240,.45)}}
.nudge{position:absolute;right:72px;bottom:10px;white-space:nowrap;background:#fff;color:#14202E;font-size:.92rem;font-weight:500;padding:10px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 10px 30px rgba(15,26,46,.25);display:flex;align-items:center;gap:10px;animation:fade .3s}
.nudge button{background:none;border:0;color:#506077;font-size:1.1rem;line-height:1;padding:0 2px}
.chatwin{display:flex;flex-direction:column;width:min(390px,calc(100vw - 24px));height:min(580px,calc(100dvh - 40px));background:#0F1A33;color:#EAF0FF;border:1px solid rgba(255,255,255,.14);border-radius:22px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.5);animation:pop .25s ease-out}
@keyframes pop{from{opacity:0;transform:translateY(14px) scale(.97)}}
.chathead{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(135deg,#1A2A55,#241B5C);border-bottom:1px solid rgba(255,255,255,.12)}
.chathead b{display:block;font:700 1rem var(--display)}.chathead small{display:flex;align-items:center;gap:6px;color:#B9C7E6;font-size:.8rem}
.chatav{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font:700 .95rem var(--display);background:linear-gradient(135deg,#8FA8FF,#FFB86B);color:#0A1226;flex:none}
.chatx{margin-left:auto;background:rgba(255,255,255,.1);border:0;color:#fff;width:34px;height:34px;border-radius:50%;font-size:1.3rem;line-height:1}
.chatlist{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}
.msg{max-width:86%;padding:10px 14px;border-radius:16px;font-size:.95rem;line-height:1.45;white-space:pre-wrap;word-break:break-word;animation:fade .25s}
.msg.bot{align-self:flex-start;background:rgba(255,255,255,.09);border-bottom-left-radius:4px}
.msg.me{align-self:flex-end;background:linear-gradient(135deg,#4F6BFF,#6B4BFF);color:#fff;border-bottom-right-radius:4px}
.msg.dots{display:flex;gap:5px;padding:14px 16px}.dots span{width:7px;height:7px;border-radius:50%;background:#B9C7E6;animation:bounce 1s infinite}.dots span:nth-child(2){animation-delay:.15s}.dots span:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
.sum{margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.18);font-size:.9rem;display:flex;flex-direction:column;gap:4px}
.sumbtns{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.btn.wa{background:#25D366;border-color:#25D366;color:#06351A!important;font-weight:600;box-shadow:none}
.btn.ghost{border-color:rgba(255,255,255,.4);color:#fff!important}
.linkbtn{display:inline-block;margin-top:10px}
.qchips{display:flex;flex-wrap:wrap;gap:8px;padding:4px 14px 10px}
.qchip{background:transparent;border:1.5px solid #8FA8FF;color:#D4E1FF;border-radius:99px;padding:7px 13px;font-size:.88rem;transition:background .15s}
.qchip:hover{background:rgba(143,168,255,.18)}
.chatform{display:flex;gap:8px;padding:10px 12px 12px;border-top:1px solid rgba(255,255,255,.12);background:#0C152B}
.chatform input{flex:1;min-width:0;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.16);border-radius:12px;padding:11px 14px;color:#fff;font:inherit;font-size:.95rem}
.chatform input::placeholder{color:#8EA0C4}
.chatform button{width:46px;border:0;border-radius:12px;background:linear-gradient(135deg,#3556F0,#7A5BFF);color:#fff;display:grid;place-items:center}
.chatform button:disabled{opacity:.45}
@media (max-width:760px){
  .chat{bottom:calc(78px + env(safe-area-inset-bottom,0px));right:14px}
  .chatwin{position:fixed;left:8px;right:8px;bottom:8px;width:auto;height:min(78dvh,620px)}
  .nudge{right:68px;max-width:calc(100vw - 100px);white-space:normal}
}

.skip{position:absolute;left:-999px;top:8px;background:var(--accent);color:var(--on)!important;padding:8px 14px;border-radius:6px;z-index:60}.skip:focus{left:8px}
.verify a{text-underline-offset:3px}
@media (max-width:1000px){
  .hero{gap:32px}.case,.aboutTop{grid-template-columns:1fr}.visual{max-width:480px;margin:0 auto;width:100%}.mini{display:none}.hero h1{font-size:clamp(2.1rem,6vw,3.2rem)}
}
@media (max-width:760px){
  .hero,.two,.cols,.facts-grid{grid-template-columns:1fr;gap:28px}.hero{padding-bottom:96px}.stats{margin-top:-60px;padding:22px}.stage{margin:0 12px;transform:none}
  .burger{display:flex}
  .navlinks{display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;flex-direction:column;align-items:stretch;background:#0F1A33;border:1px solid var(--line);border-radius:14px;padding:8px;z-index:30;box-shadow:0 18px 40px rgba(0,0,0,.45)}
  .navlinks.open{display:flex}.nl{padding:12px 14px;font-size:1rem}
  .hire{display:none}
  .sticky{display:block;position:fixed;left:16px;right:16px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:40;text-align:center;text-decoration:none;
    background:linear-gradient(135deg,var(--accent),#6B4BFF);color:#fff!important;font-weight:500;padding:14px;border-radius:12px;box-shadow:0 8px 26px rgba(0,0,0,.3)}
}
@media (max-width:480px){
  .tk{width:60px;height:34px;padding:0 8px}.knob{width:25px;height:25px}.theme[aria-checked="true"] .knob{transform:translateX(26px)}
  .mono{width:38px;height:38px;border-radius:11px}.mono b{font-size:.95rem}.bline{font-size:1.05rem}.brand{gap:9px}
  .btns .btn{flex:1 1 100%;text-align:center}.proj-head{padding:18px}.proj-name{font-size:1.3rem}.case{padding:4px 18px 24px}.tile{width:48px;height:48px}.form{padding:20px}.stats strong{font-size:2.4rem}
}
@media (prefers-reduced-motion:reduce){.app *,.app *::before,.app *::after{animation:none!important;transition:none!important}.reveal,.panel li{opacity:1;transform:none}}
`;

const LANDING_CSS = `
.lp{--lpf:"Bricolage Grotesque","Segoe UI",system-ui,sans-serif;--lpt:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;--R:clamp(150px,31vw,420px);
  position:fixed;inset:0;z-index:100;overflow:hidden;color:#fff;font-family:var(--lpt);perspective:1100px;touch-action:none;user-select:none;-webkit-user-select:none;
  background:radial-gradient(900px 520px at 72% 8%,rgba(79,110,255,.38),transparent 70%),radial-gradient(700px 420px at 8% 95%,rgba(245,165,36,.16),transparent 70%),#060B1A}
.lp *,.lp *::before,.lp *::after{box-sizing:border-box}
.lp.leave{pointer-events:none;animation:lpfade .6s .7s forwards}
.lp.leave .lp-ui,.lp.leave .lp-top{opacity:0;transition:opacity .3s}
.enter-anim{animation:appFade 1.3s ease-out both}
@keyframes appFade{from{opacity:0}to{opacity:1}}
@keyframes lpfade{to{opacity:0}}
.lp-bg i{position:absolute;border-radius:50%;background:#fff;opacity:.7;animation:twinkle 3.5s ease-in-out infinite}
@keyframes twinkle{50%{opacity:.1}}
.lp-floor{position:absolute;left:-60%;right:-60%;bottom:-6%;height:62%;transform:rotateX(72deg);transform-origin:50% 100%;
  background-image:linear-gradient(rgba(143,168,255,.5) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(143,168,255,.5) 1.5px,transparent 1.5px);
  background-size:64px 64px;background-position:var(--gx,0) 0;animation:floor 2.6s linear infinite;
  -webkit-mask-image:linear-gradient(transparent,#000 55%);mask-image:linear-gradient(transparent,#000 55%)}
@keyframes floor{to{background-position:var(--gx,0) 64px}}
.lp-stage,.lp-fly,.lp-sway{position:absolute;inset:0;transform-style:preserve-3d}
.lp-stage{transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .15s ease-out}
.lp-fly{transition:transform 1.2s cubic-bezier(.5,0,.8,.3),opacity .6s .5s}
.lp.leave .lp-fly{transform:translateZ(1100px);opacity:0}
.lp-sway{display:grid;place-content:center;justify-items:center;animation:sway 9s ease-in-out infinite;padding-bottom:12vh}
@keyframes sway{0%,100%{transform:rotateY(-7deg) rotateX(2deg)}50%{transform:rotateY(7deg) rotateX(-2deg)}}
.lp-h1{margin:0;text-align:center;position:relative;transform-style:preserve-3d;font-family:var(--lpf);animation:bob 5s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(-10px) translateZ(20px)}}
.lp-h1 small{display:block;font:500 clamp(.95rem,2.2vw,1.3rem) var(--lpt);color:#9DB0C7;margin-bottom:6px;letter-spacing:.06em;transform:translateZ(40px);animation:lpin .9s .2s both}
.lp-sub{display:block;margin-top:10px;font:500 clamp(1rem,2.6vw,1.6rem) var(--lpt);letter-spacing:.22em;color:#C7D3EA;transform:translateZ(36px);text-shadow:0 0 22px rgba(143,168,255,.7);animation:lpin 1s 1.5s both}
@keyframes lpin{from{opacity:0;transform:translateZ(40px) translateY(14px)}to{opacity:1;transform:translateZ(40px)}}
.ex{display:inline-flex;transform-style:preserve-3d;font:800 clamp(2.6rem,11.5vw,9rem)/1 var(--lpf);letter-spacing:.015em}
.exl{position:relative;display:inline-block;transform-style:preserve-3d;animation:letterIn 1.1s cubic-bezier(.2,1.2,.3,1) both,wave 3.4s ease-in-out infinite;animation-delay:calc(var(--i)*.09s),calc(1.5s + var(--i)*.14s)}
@keyframes letterIn{from{transform:translateZ(-900px) rotateX(-95deg) translateY(80px)}to{transform:none}}
@keyframes wave{0%,100%{transform:translateY(0) translateZ(0)}50%{transform:translateY(-12px) translateZ(28px)}}
.exf{position:relative;display:block;background:linear-gradient(110deg,#B9CBFF 20%,#fff 38%,#FFE3A8 50%,#fff 62%,#B9CBFF 80%);-webkit-background-clip:text;background-clip:text;color:transparent;transform:translateZ(22px)}
.exb{position:absolute;left:0;top:0;display:block;transform:translateZ(calc(22px - var(--k)*3.6px));color:color-mix(in srgb,#5B7BFF calc(100% - var(--k)*6.5%),#14204F)}
.lp-tilt{position:absolute;left:50%;top:44%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(-24deg)}
.ring{position:absolute;left:0;top:0;transform-style:preserve-3d;animation:orbit 28s linear infinite}
@keyframes orbit{to{transform:rotateY(360deg)}}
.lp-tile{position:absolute;left:-32px;top:-32px;width:64px;height:64px;border-radius:17px;background:#fff;display:grid;place-items:center;
  box-shadow:0 12px 32px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.5);transform:rotateY(calc(var(--i)*36deg)) translateZ(var(--R))}
.lp-tile img{width:38px;height:38px;object-fit:contain}
.cube3{position:absolute;left:calc(50% + var(--x));top:calc(50% + var(--y));width:var(--s);height:var(--s);margin:calc(var(--s)/-2) 0 0 calc(var(--s)/-2);transform:translateZ(var(--z));transform-style:preserve-3d}
.cb{position:absolute;inset:0;transform-style:preserve-3d;animation:cbspin 16s linear infinite;animation-delay:var(--d)}
.cb i{position:absolute;inset:0;border:1.5px solid rgba(143,168,255,.6);background:rgba(143,168,255,.07);box-shadow:inset 0 0 22px rgba(143,168,255,.18)}
.cb i:nth-child(1){transform:translateZ(calc(var(--s)/2))}.cb i:nth-child(2){transform:rotateY(180deg) translateZ(calc(var(--s)/2))}
.cb i:nth-child(3){transform:rotateY(90deg) translateZ(calc(var(--s)/2))}.cb i:nth-child(4){transform:rotateY(-90deg) translateZ(calc(var(--s)/2))}
.cb i:nth-child(5){transform:rotateX(90deg) translateZ(calc(var(--s)/2))}.cb i:nth-child(6){transform:rotateX(-90deg) translateZ(calc(var(--s)/2))}
@keyframes cbspin{to{transform:rotateX(360deg) rotateY(360deg)}}
.lp-top{position:absolute;top:calc(20px + env(safe-area-inset-top,0px));left:0;right:0;display:flex;justify-content:center;z-index:5}
.lp-chip{display:inline-flex;align-items:center;gap:10px;font-weight:500;font-size:.92rem;border:1px solid rgba(255,255,255,.18);border-radius:99px;padding:6px 16px;background:rgba(255,255,255,.07);backdrop-filter:blur(8px)}
.lp-chip .dot{width:10px;height:10px;border-radius:50%;background:#46DDA0;animation:lppulse 2.2s ease-out infinite}
@keyframes lppulse{0%{box-shadow:0 0 0 0 rgba(70,221,160,.6)}100%{box-shadow:0 0 0 12px transparent}}
.lp-ui{position:absolute;left:0;right:0;bottom:calc(5vh + env(safe-area-inset-bottom,0px));z-index:5;display:flex;flex-direction:column;align-items:center;gap:16px;padding:0 16px;text-align:center}
.lp-typed{margin:0;font-size:clamp(1.05rem,2.6vw,1.35rem);color:#fff;font-weight:500;min-height:1.6em;text-shadow:0 2px 14px rgba(6,11,26,.9)}
.lp-caret{display:inline-block;width:2px;height:1.1em;background:#FFC25C;margin-left:3px;vertical-align:text-bottom;animation:lpblink 1s steps(1) infinite}
@keyframes lpblink{50%{opacity:0}}
.lp-cta{display:inline-flex;align-items:center;gap:12px;padding:16px 32px;border:0;border-radius:99px;font:600 1.08rem var(--lpt);color:#0A1226;cursor:pointer;
  background:linear-gradient(135deg,#9CB4FF,#FFC25C);box-shadow:0 0 0 0 rgba(156,180,255,.55),0 18px 44px rgba(79,110,255,.45);animation:ctapulse 2.6s ease-out infinite;transition:transform .2s}
@keyframes ctapulse{0%{box-shadow:0 0 0 0 rgba(156,180,255,.55),0 18px 44px rgba(79,110,255,.45)}70%,100%{box-shadow:0 0 0 22px rgba(156,180,255,0),0 18px 44px rgba(79,110,255,.45)}}
.lp-cta:hover{transform:translateY(-3px) scale(1.04)}.lp-cta svg{transition:transform .2s}.lp-cta:hover svg{transform:translateX(4px)}
.lp-hint{margin:0;font-size:.85rem;color:#8EA0C4}
.lp-bar{width:min(320px,70vw);height:4px;border-radius:4px;background:rgba(255,255,255,.14);overflow:hidden}
.lp-bar i{display:block;height:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#9CB4FF,#FFC25C);animation:lpfill 5s linear forwards}
@keyframes lpfill{to{transform:scaleX(1)}}
.lp-tilt.t2{transform:rotateX(-24deg) rotateZ(9deg)}
.ring.r2{animation:orbit 38s linear infinite reverse}
.dotp{position:absolute;left:-3px;top:-3px;width:6px;height:6px;border-radius:50%;background:#9CB4FF;box-shadow:0 0 12px #9CB4FF;transform:rotateY(calc(var(--i)*12.857deg)) translateZ(calc(var(--R)*1.3))}
.dotp.gold{background:#FFC25C;box-shadow:0 0 14px #FFC25C;width:8px;height:8px;left:-4px;top:-4px}
.lp-ripple{position:absolute;left:50%;top:44%;width:110vmin;height:110vmin;border:2px solid rgba(143,168,255,.55);border-radius:50%;transform:translate(-50%,-50%) scale(.04);opacity:0;animation:ripple 5s ease-out infinite}
.lp-ripple.r2{animation-delay:1.7s}.lp-ripple.r3{animation-delay:3.4s}
@keyframes ripple{0%{transform:translate(-50%,-50%) scale(.04);opacity:.9}100%{transform:translate(-50%,-50%) scale(1.1);opacity:0}}
.lp-beam{position:absolute;top:-25%;left:-20%;width:34vmax;height:150%;background:linear-gradient(90deg,transparent,rgba(143,168,255,.13),transparent);transform:rotate(24deg);animation:beam 11s ease-in-out infinite}
.lp-beam.b2{animation-delay:-5.5s;background:linear-gradient(90deg,transparent,rgba(255,194,92,.09),transparent)}
@keyframes beam{0%{transform:translateX(0) rotate(24deg)}50%{transform:translateX(130vw) rotate(24deg)}100%{transform:translateX(0) rotate(24deg)}}
.lp-skip{background:none;border:0;color:#C7D3EA;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0}
.lp :focus-visible{outline:3px solid #9CB4FF;outline-offset:4px;border-radius:99px}
@media (max-width:760px){.lp{--R:clamp(125px,47vw,200px)}.lp-tilt{top:42%;transform:rotateX(-34deg)}.lp-tilt.t2{transform:rotateX(-34deg) rotateZ(9deg)}.lp-ripple{top:42%}.dotp:nth-child(3n+2){display:none}.ex{font-size:clamp(2.6rem,13.5vw,5rem)}.lp-tile{width:52px;height:52px;left:-26px;top:-26px;border-radius:14px}.lp-tile img{width:30px;height:30px}
  .cube3:nth-of-type(n+4){display:none}.lp-sway{padding-bottom:16vh}.lp-hint{font-size:.8rem}}
@media (prefers-reduced-motion:reduce){.lp *,.lp *::before,.lp *::after{animation:none!important;transition:none!important}}
`;
