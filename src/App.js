import { useState, useEffect, useRef } from "react";
import {
  Leaf, Award, Sparkles, Car,
  MapPin, Clock, Phone, Mail,
  ChevronDown, Star, Heart, Menu, X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND COLORS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  primary:   "#E8185C",
  dark:      "#C0144E",
  light:     "#FDE8F0",
  pale:      "#FFF0F5",
  border:    "#F9C0D5",
  footerBg:  "#160008",
  footerBdr: "#3a0015",
};

// ─────────────────────────────────────────────────────────────────────────────
// 🔴 LOGO PATH — update to your actual file
// Option A (src/assets): import logo from "./assets/frensco-logo.png"; const LOGO_SRC = logo;
// Option B (public):     const LOGO_SRC = "/frensco-logo.png";
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_SRC = "/frensco-logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const NAV = ["About", "Features", "Gallery", "Contact"];

const FEATURES = [
  { icon: Leaf,     title: "Farm-Fresh Produce",   desc: "Sourced daily from local farms and trusted suppliers. Every vegetable, fruit, and herb arrives at peak freshness — no exceptions."       },
  { icon: Award,    title: "Premium Brands",        desc: "Curated selection of 5,000+ national and international brands, from everyday staples to specialty imports."                             },
  { icon: Sparkles, title: "Spotless Environment",  desc: "Cleaned and sanitised multiple times daily. Our store meets the highest hygiene standards so you can shop with total peace of mind."   },
  { icon: Car,      title: "Easy Parking",          desc: "Spacious, well-lit parking for 100+ vehicles. No more circling the block — your shopping trip starts stress-free."                    },
];

const STATS = [
  { value: "10+",  label: "Years Serving Surat" },
  { value: "5K+",  label: "Products In-Store"   },
  { value: "500+", label: "Happy Families Daily" },
  { value: "4.9★", label: "Customer Rating"      },
];

const GALLERY_ITEMS = [
  "Store Entrance", "Fresh Produce Aisle", "Premium Brands Section",
  "Billing & Checkout", "Dairy & Frozen", "Bakery Corner",
];

const INFO_CARDS = [
  { icon: MapPin, title: "Store Address",  lines: ["Frensco Supermarket,", "Ring Road, Vesu,", "Surat, Gujarat — 395007"] },
  { icon: Clock,  title: "Store Timings",  lines: ["Mon – Sat: 8:00 AM – 10:00 PM", "Sunday: 9:00 AM – 9:00 PM", "Open on all holidays"] },
  { icon: Phone,  title: "Call Us",        lines: ["+91 98765 43210", "+91 87654 32109"] },
  { icon: Mail,   title: "Email",          lines: ["hello@frensco.in", "support@frensco.in"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// BRAND LOGO
// ─────────────────────────────────────────────────────────────────────────────
function BrandLogo({ height = 44, invert = false }) {
  const [failed, setFailed] = useState(false);
  const imgStyle = {
    height,
    width: "auto",
    objectFit: "contain",
    filter: invert ? "brightness(0) invert(1)" : "none",
  };
  if (failed) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: invert ? "rgba(255,255,255,0.22)" : C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 900, fontSize: 18,
        }}>F</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 18, lineHeight: 1, color: invert ? "#fff" : "#111" }}>Frensco</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: invert ? "rgba(255,255,255,0.7)" : C.primary }}>Supermarket</div>
        </div>
      </div>
    );
  }
  return <img src={LOGO_SRC} alt="Frensco Supermarket" style={imgStyle} onError={() => setFailed(true)} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar({ drawerOpen, setDrawerOpen }) {
  const y = useScrollY();
  const solid = y > 60;
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    transition: "all 0.4s ease",
    background: solid ? "rgba(255,255,255,0.97)" : "transparent",
    backdropFilter: solid ? "blur(12px)" : "none",
    boxShadow: solid ? "0 1px 0 rgba(232,24,92,0.12)" : "none",
    borderBottom: solid ? `1px solid ${C.border}` : "none",
  };

  const linkStyle = (hover) => ({
    background: "none", border: "none", cursor: "pointer",
    fontSize: 14, fontWeight: 500, padding: "4px 0",
    color: solid ? (hover ? C.primary : "#555") : "rgba(255,255,255,0.88)",
    transition: "color 0.2s",
  });

  return (
    <header style={navStyle}>
      <div className="container-xl" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <BrandLogo height={42} invert={!solid} />

          {/* Desktop links */}
          <nav className="d-none d-md-flex" style={{ alignItems: "center", gap: 32 }}>
            {NAV.map((l) => (
              <HoverButton key={l} onClick={() => go(l.toLowerCase())}
                baseStyle={linkStyle(false)} hoverColor={C.primary} solidNav={solid}>
                {l}
              </HoverButton>
            ))}
            <button onClick={() => go("contact")} style={{
              background: C.primary, color: "#fff", border: "none", borderRadius: 50,
              padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 18px rgba(232,24,92,0.4)", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Visit Us
            </button>
          </nav>

          {/* Mobile toggle */}
          <button className="d-md-none" onClick={() => setDrawerOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: solid ? "#333" : "#fff", padding: 4,
          }}>
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden", transition: "max-height 0.3s ease, opacity 0.3s ease",
        maxHeight: drawerOpen ? 280 : 0, opacity: drawerOpen ? 1 : 0,
        background: "#fff", borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {NAV.map((l) => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontSize: 16, fontWeight: 500, color: "#444", padding: 0,
            }}>{l}</button>
          ))}
          <button onClick={() => go("contact")} style={{
            background: C.primary, color: "#fff", border: "none", borderRadius: 50,
            padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Visit Us</button>
        </div>
      </div>
    </header>
  );
}

// Hover-aware button helper
function HoverButton({ children, onClick, baseStyle, hoverColor, solidNav }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...baseStyle, color: solidNav ? (hov ? hoverColor : "#555") : "rgba(255,255,255,0.88)" }}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #B01248 0%, #E8185C 50%, #FF4D8D 100%)",
      display: "flex", alignItems: "center",
    }}>
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: -160, right: -160, width: 580, height: 580,
        borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.22) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: -100, width: 440, height: 440,
        borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "140px 24px 100px" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 18px", borderRadius: 50, marginBottom: 32,
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", fontSize: 14, fontWeight: 500,
        }}>
          <Star size={13} fill="#fff" oclor="#fff" /> Surat's Most Trusted Supermarket
        </div>

        {/* Hero Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <BrandLogo height={100} invert={true} />
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800,
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "#fff",
          lineHeight: 1.1, marginBottom: 20,
          textShadow: "0 2px 24px rgba(0,0,0,0.15)",
        }}>
          Fresh. Always.{" "}
          <em style={{ color: "rgba(255,255,255,0.82)" }}>For Everyone.</em>
        </h1>

        <p style={{
          maxWidth: 620, margin: "0 auto 40px",
          fontSize: "clamp(1rem, 2vw, 1.18rem)",
          color: "rgba(255,255,255,0.82)", lineHeight: 1.7,
        }}>
          Surat's favourite neighbourhood supermarket — where quality, variety, and
          genuine warmth come together under one roof every single day.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => go("about")} style={{
            background: "#fff", color: C.primary, border: "none", borderRadius: 50,
            padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 8px 28px rgba(0,0,0,0.18)", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Discover Our Story
          </button>
          <button onClick={() => go("contact")} style={{
            background: "transparent", color: "#fff",
            border: "2px solid rgba(255,255,255,0.45)", borderRadius: 50,
            padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            Get Directions
          </button>
        </div>

        {/* Scroll hint */}
        <button onClick={() => go("about")} style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.55)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={18} style={{ animation: "bounce 1.5s infinite" }} />
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const [ref, vis] = useInView();

  return (
    <section id="about" style={{ padding: "96px 0", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} className="row align-items-center g-5"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.7s ease" }}>

          {/* Text column */}
          <div className="col-12 col-lg-6">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary }}>
              Our Story
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111",
              lineHeight: 1.15, margin: "12px 0 24px",
            }}>
              More Than a Store.<br />
              <span style={{ color: C.primary }}>A Community.</span>
            </h2>
            <p style={{ fontSize: 17, color: "#444", lineHeight: 1.75, marginBottom: 16 }}>
              Frensco Supermarket was born from a simple belief: every family in Surat
              deserves access to fresh, high-quality groceries in a clean, welcoming
              environment — without compromise.
            </p>
            <p style={{ color: "#666", lineHeight: 1.75, marginBottom: 16 }}>
              We handpick every product on our shelves, insist on strict hygiene standards,
              and train our staff to treat every customer like a neighbour. Because to us,
              that's exactly what you are.
            </p>
            <p style={{ color: "#666", lineHeight: 1.75, marginBottom: 28 }}>
              From sun-ripened fruits to international pantry staples, freshly baked bread
              to premium dairy — everything under our roof is chosen with your family's
              health and happiness in mind.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Hygiene First", "Variety & Choice", "Warm Service", "Fair Pricing"].map((t) => (
                <span key={t} style={{
                  padding: "7px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600,
                  background: C.light, color: C.dark, border: `1px solid ${C.border}`,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats column */}
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              {STATS.map(({ value, label }) => (
                <div key={label} className="col-6">
                  <div style={{
                    padding: "28px 20px", borderRadius: 18, textAlign: "center",
                    background: `linear-gradient(135deg, ${C.pale}, ${C.light})`,
                    border: `1px solid ${C.border}`,
                  }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 800, color: C.primary }}>{value}</div>
                    <div style={{ fontSize: 13, color: "#777", fontWeight: 500, marginTop: 6 }}>{label}</div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <div style={{
                  padding: "22px 24px", borderRadius: 18,
                  background: `linear-gradient(135deg, ${C.dark}, ${C.primary})`,
                  display: "flex", alignItems: "flex-start", gap: 16,
                }}>
                  <Heart size={22} style={{ color: "rgba(255,255,255,0.7)", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Our Promise to You</div>
                    <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                      If you're ever unhappy with a product, we make it right. No receipts needed,
                      no questions asked. That's the Frensco guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────────────────────
function Features() {
  const [ref, vis] = useInView();

  return (
    <section id="features" style={{ padding: "96px 0", background: "#f8f9fa" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 60px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary }}>
            Why Frensco
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#111", lineHeight: 1.2, margin: "12px 0 0",
          }}>
            Everything You Need,<br />
            <span style={{ color: C.primary }}>All In One Place</span>
          </h2>
        </div>

        <div ref={ref} className="row g-4"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.7s ease" }}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="col-12 col-sm-6 col-lg-3"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <FeatureCard Icon={Icon} title={title} desc={desc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ Icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "28px 24px", borderRadius: 18, background: "#fff", height: "100%",
        border: hov ? `1px solid ${C.border}` : "1px solid #eee",
        boxShadow: hov ? "0 20px 40px rgba(232,24,92,0.09)" : "none",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.3s ease",
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, marginBottom: 20,
        background: `${C.primary}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hov ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s",
      }}>
        <Icon size={22} color={C.primary} strokeWidth={2} />
      </div>
      <h5 style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 10 }}>{title}</h5>
      <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────
function Gallery() {
  const [ref, vis] = useInView();

  return (
    <section id="gallery" style={{ padding: "96px 0", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary }}>
            Inside Frensco
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#111", lineHeight: 1.2, margin: "12px 0 12px",
          }}>
            A Store Worth <span style={{ color: C.primary }}>Visiting</span>
          </h2>
          <p style={{ color: "#888", fontSize: 15, margin: 0 }}>
            Step inside and experience the difference. Replace the placeholders below with your supermarket photos.
          </p>
        </div>

        <div ref={ref} className="row g-3"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "all 0.7s ease" }}>
          {GALLERY_ITEMS.map((label, i) => (
            <GalleryPlaceholder key={label} label={label}
              colClass={i === 0 || i === 3 ? "col-12 col-md-8" : "col-12 col-md-4"} />
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "#aaa" }}>
          Replace each placeholder div with{" "}
          <code style={{ background: "#f1f1f1", padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>
            &lt;img src="..." style="width:100%;height:100%;object-fit:cover" /&gt;
          </code>
        </p>
      </div>
    </section>
  );
}

function GalleryPlaceholder({ label, colClass }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={colClass}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          minHeight: 200, borderRadius: 18, position: "relative",
          background: `linear-gradient(135deg, ${C.pale}, ${C.light})`,
          border: hov ? `2px dashed ${C.primary}` : `2px dashed ${C.border}`,
          transition: "border-color 0.2s", overflow: "hidden",
        }}>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 10, padding: 16, textAlign: "center",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", background: C.light,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={16} color={C.primary} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{label}</span>
          <span style={{ fontSize: 11, padding: "4px 14px", borderRadius: 50, background: C.light, color: C.primary }}>
            Add your photo here
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: "96px 0", background: "#f8f9fa" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 60px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.primary }}>
            Find Us
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#111", lineHeight: 1.2, margin: "12px 0 0",
          }}>
            Come Say <span style={{ color: C.primary }}>Hello</span>
          </h2>
        </div>

        <div className="row g-4">
          {/* Info cards */}
          <div className="col-12 col-lg-5">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {INFO_CARDS.map(({ icon: Icon, title, lines }) => (
                <InfoCard key={title} Icon={Icon} title={title} lines={lines} />
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="col-12 col-lg-7">
            <div style={{
              minHeight: 420, borderRadius: 20,
              background: `linear-gradient(135deg, ${C.pale}, ${C.light})`,
              border: `2px dashed ${C.border}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 16, padding: 40, textAlign: "center",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: C.light,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <MapPin size={24} color={C.primary} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: C.dark, margin: "0 0 6px" }}>Google Maps Embed</p>
                <p style={{ fontSize: 13, color: C.primary, maxWidth: 280, margin: "0 auto" }}>
                  Replace this placeholder with a Google Maps{" "}
                  <code style={{ background: C.light, padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>
                    &lt;iframe&gt;
                  </code>{" "}
                  to show your exact store location.
                </p>
              </div>
              <a href="https://maps.google.com/?q=Vesu,Surat,Gujarat" target="_blank" rel="noreferrer"
                style={{
                  marginTop: 8, fontSize: 13, fontWeight: 600, padding: "10px 24px",
                  borderRadius: 50, background: C.light, color: C.dark,
                  textDecoration: "none", transition: "background 0.2s",
                }}>
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ Icon, title, lines }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: 16, padding: "18px 20px", borderRadius: 16, background: "#fff",
        border: hov ? `1px solid ${C.border}` : "1px solid #eee",
        boxShadow: hov ? "0 8px 24px rgba(232,24,92,0.07)" : "none",
        transition: "all 0.25s ease",
      }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: C.light, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={18} color={C.primary} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 4 }}>{title}</div>
        {lines.map((l) => <p key={l} style={{ margin: 0, fontSize: 13, color: "#777", lineHeight: 1.6 }}>{l}</p>)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.footerBg, color: "#fff", padding: "48px 0" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="row align-items-center gy-4">
          <div className="col-12 col-md-4 text-center text-md-start">
            <BrandLogo height={40} invert={true} />
          </div>
          <div className="col-12 col-md-4">
            <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
              {NAV.map((l) => (
                <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "none", border: "none", cursor: "pointer", fontSize: 13,

                    
                    color: C.border, transition: "color 0.2s", padding: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = C.border)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            <span style={{ fontSize: 13, color: C.border, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              Made with <Heart size={13} fill={C.primary} color={C.primary} /> in Surat
            </span>
          </div>
        </div>
        
        <hr style={{ borderColor: C.footerBdr, margin: "32px 0 20px" }} />
        <p style={{ textAlign: "center", fontSize: 12, color: "#7a003a", margin: 0 }}>
          © {new Date().getFullYear()} Frensco Supermarket. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOUNCE KEYFRAME (injected once)
// ─────────────────────────────────────────────────────────────────────────────
const bounceStyle = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Google Font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&display=swap";
    document.head.appendChild(link);

    // Bounce keyframe
    const style = document.createElement("style");
    style.textContent = bounceStyle;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <main>
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
