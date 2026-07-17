import { useState } from "react";

// ── DATA ──────────────────────────────────────────────
const services = [
  { icon: "🔍", title: "SEO", desc: "We do First Page SEO. Our top reason to maintain your SEO and bring you to the first page of Google." },
  { icon: "⭐", title: "ORM", desc: "Our ORM services help improve and protect your online reputation with strategic content and review management." },
  { icon: "📱", title: "SMM", desc: "Social Media Marketing to build brand awareness and engage your target audience across all platforms." },
  { icon: "💰", title: "PPC", desc: "Targeted Pay Per Click campaigns to drive instant traffic and measurable ROI for your business." },
  { icon: "✍️", title: "Content Writing", desc: "High-quality, SEO-optimized content that drives traffic, engages readers and converts visitors." },
  { icon: "🖥️", title: "Web Design & Development", desc: "Custom website design and development that reflects your brand and converts visitors into customers." },
  { icon: "📋", title: "Citation Development", desc: "Build consistent local citations across top directories to improve local SEO rankings." },
  { icon: "🔎", title: "Website Audit", desc: "Comprehensive website audit to identify technical SEO issues and opportunities for improvement." },
  { icon: "🏷️", title: "Reseller White Label", desc: "White label digital marketing services for agencies looking to expand their offerings." },
];

const whyUs = [
  { icon: "🏆", title: "Guaranteed Results", desc: "We guarantee first page Google rankings or your money back. Performance-driven SEO you can count on." },
  { icon: "👤", title: "Dedicated Project Manager", desc: "Every client gets a dedicated project manager as their single point of contact throughout." },
  { icon: "💡", title: "Highly Professional Approach", desc: "Our team follows a structured, transparent, and results-focused approach to every project." },
  { icon: "🎧", title: "24/7 Customer Support", desc: "Round-the-clock support to answer your questions and keep your campaigns running smoothly." },
  { icon: "🚀", title: "Advanced Optimization Solution", desc: "Cutting-edge techniques and tools to optimize your digital presence and maximize growth." },
];

const businessNeeds = [
  { icon: "🌍", title: "Worldwide Visibility", desc: "We make your business visible all across the globe, delivering internationally targeted digital campaigns." },
  { icon: "⚙️", title: "Customized Solutions", desc: "Every business is different. We tailor every strategy specifically to your goals, industry, and audience." },
  { icon: "📈", title: "Exponential Growth", desc: "High-ROI digital marketing technology that delivers real exponential business growth." },
  { icon: "📄", title: "Easy & Flexible Contracts", desc: "No lock-in contracts. Flexible plans designed to adapt to your changing business requirements." },
  { icon: "💬", title: "Innovative Ideas to Expand Your Business", desc: "Fresh, creative strategies that help your brand stand out and consistently attract new customers." },
];

const process = [
  { step: "01", title: "Consult", desc: "We understand your business goals and digital challenges in depth." },
  { step: "02", title: "Design", desc: "We create a custom digital strategy tailored specifically for you." },
  { step: "03", title: "Develop", desc: "Our experts execute the strategy with precision and best practices." },
  { step: "04", title: "Deliver", desc: "We deliver measurable results and continuously optimize for growth." },
  { step: "05", title: "Promote", desc: "We promote your brand across all relevant digital channels." },
];

const testimonials = [
  { name: "Anthony Hills", text: "We got a good SEO/SEM developer and I really enjoyed working with JC. His communication and responsiveness were paramount and he was able to also stay strongly self-motivated. He is recommended to all!" },
  { name: "Sarah Johnson", text: "Exceptional results! Our organic traffic increased by 300% in just 6 months. The team is professional, responsive and truly understands digital marketing." },
  { name: "Mark Davis", text: "JC Web Pros transformed our online presence. Their SEO strategies brought us to the first page of Google and our leads doubled within 3 months." },
];

const clients = ["Kinsta", "simple-care", "Client 3", "Client 4", "Client 5", "NI"];

// ── COMPONENT ─────────────────────────────────────────
export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#333", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroOverlay}></div>
        <div style={s.heroContent}>
          <p style={s.heroTag}>THE BEST WAY TO MAKE YOUR ONLINE PRESENCE JUST GOT FOUND</p>
          <h1 style={s.heroTitle}>Transform Your Business with<br /><span style={{ color: "#e8501a" }}>India's Top Digital Marketing Experts</span></h1>
          <p style={s.heroDesc}>Gain millions of customers and strategy on how to achieved business through Google helpful update. Experience a one-on-one brand building strategy on how to achieve, link building and develop your brand to gain more clients. Your success is guaranteed. Your patience is requested.</p>
          <div style={s.heroBtns}>
            <a href="#services" style={s.btnOrange}>Our Services</a>
            <a href="#contact" style={s.btnOutline}>Get Free Quote</a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={s.section}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>WHAT WE OFFER</span>
            <h2 style={s.sectionTitle}>OUR SERVICES</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.servicesGrid}>
            {services.map((sv) => (
              <div key={sv.title} style={s.serviceCard}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,80,26,0.15)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"}
              >
                <div style={s.serviceIcon}>{sv.icon}</div>
                <h3 style={s.serviceTitle}>{sv.title}</h3>
                <p style={s.serviceDesc}>{sv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ ...s.section, background: "#f8f9fa" }}>
        <div style={s.container}>
          <div style={s.whyGrid}>
            <div style={s.whyLeft}>
              <span style={s.sectionTag}>OUR EDGE</span>
              <h2 style={{ ...s.sectionTitle, textAlign: "left", marginBottom: "8px" }}>WHY JC WEB PROS?</h2>
              <div style={{ ...s.titleUnderline, margin: "0 0 24px 0" }}></div>
              {whyUs.map((w) => (
                <div key={w.title} style={s.whyItem}>
                  <div style={s.whyIcon}>{w.icon}</div>
                  <div>
                    <h4 style={s.whyItemTitle}>{w.title}</h4>
                    <p style={s.whyItemDesc}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.whyRight}>
              <div style={s.whyImageBox}>
                <div style={s.whyImagePlaceholder}>
                  <span style={{ fontSize: "80px" }}>💼</span>
                  <p style={{ color: "#fff", fontSize: "18px", fontWeight: "600", marginTop: "16px" }}>Digital Marketing Experts</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>India's #1 Agency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR BUSINESS NEEDS ── */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>SOLUTIONS</span>
            <h2 style={s.sectionTitle}>WHAT YOUR BUSINESS NEEDS?</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.needsGrid}>
            <div style={s.needsLeft}>
              <div style={s.phoneBox}>
                <div style={s.phoneMock}>
                  <div style={s.phoneScreen}>
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>📱</div>
                    <p style={{ color: "#fff", fontSize: "13px", textAlign: "center" }}>Mobile Optimized</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={s.needsRight}>
              {businessNeeds.map((n) => (
                <div key={n.title} style={s.needItem}>
                  <div style={s.needIcon}>{n.icon}</div>
                  <div>
                    <h4 style={s.needTitle}>{n.title}</h4>
                    <p style={s.needDesc}>{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ ...s.section, background: "#1a1a2e" }}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={{ ...s.sectionTag, background: "rgba(232,80,26,0.15)", color: "#e8501a" }}>OUR WORK</span>
            <h2 style={{ ...s.sectionTitle, color: "#fff" }}>Take a Look at Real-World Outcomes We've Achieved</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.portfolioGrid}>
            {[
              { tag: "SEO", title: "Increased 90,000 Impressions", result: "+90K Impressions" },
              { tag: "PPC", title: "Understand Profitable 'The Tradition' SEO Above to After all Within a Month", result: "x3 Traffic" },
              { tag: "Google", title: "Transformed Overall Traffic To 99.92% Google Search Console Proved With 60% to 25%", result: "99.92% Growth" },
              { tag: "SEO", title: "Turned Website Speed: Mobile Speed from 18 to 98 (Desktop from 47 to Perfect)", result: "98 Speed Score" },
              { tag: "Google", title: "Implemented Page 1 Positions: 1 Position with 100 Linking Optimization & SEO", result: "Page 1 Ranking" },
              { tag: "Google", title: "Ranked 31 on Google Maps & Google SERPs with 3,000 Listing Optimizations & SEO", result: "31 Maps Ranking" },
            ].map((p, i) => (
              <div key={i} style={s.portfolioCard}>
                <div style={s.portfolioImgBox}>
                  <span style={s.portfolioTag}>{p.tag}</span>
                  <div style={s.portfolioResult}>{p.result}</div>
                </div>
                <div style={s.portfolioBody}>
                  <p style={s.portfolioTitle}>{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ ...s.section, background: "#f8f9fa" }}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>HOW WE WORK</span>
            <h2 style={s.sectionTitle}>Complete Digital Marketing Solutions for Your Business</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.processGrid}>
            {process.map((p) => (
              <div key={p.step} style={s.processCard}>
                <div style={s.processStep}>{p.step}</div>
                <h4 style={s.processTitle}>{p.title}</h4>
                <p style={s.processDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ ...s.section, background: "#1a1a2e" }}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={{ ...s.sectionTag, background: "rgba(232,80,26,0.15)", color: "#e8501a" }}>OUR CUSTOMERS</span>
            <h2 style={{ ...s.sectionTitle, color: "#fff" }}>PEOPLE ARE SAYING (TESTIMONIALS)</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.testimonialBox}>
            <div style={s.testimonialQuote}>"</div>
            <p style={s.testimonialText}>{testimonials[activeTestimonial].text}</p>
            <p style={s.testimonialAuthor}>— {testimonials[activeTestimonial].name}</p>
            <div style={s.testimonialDots}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  style={{ ...s.dot, background: i === activeTestimonial ? "#e8501a" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section style={{ ...s.section, padding: "40px 0" }}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <h2 style={{ ...s.sectionTitle, fontSize: "22px" }}>OUR CLIENTS</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.clientsRow}>
            {clients.map((c) => (
              <div key={c} style={s.clientLogo}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" style={{ ...s.section, background: "#f8f9fa" }}>
        <div style={s.container}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>GET IN TOUCH</span>
            <h2 style={s.sectionTitle}>REQUEST AN OFFER</h2>
            <div style={s.titleUnderline}></div>
          </div>
          <div style={s.formGrid}>
            {[
              { name: "name", placeholder: "Your Name *", type: "text" },
              { name: "email", placeholder: "Your Email *", type: "email" },
              { name: "phone", placeholder: "Your Phone", type: "tel" },
              { name: "service", placeholder: "Service Required", type: "text" },
            ].map((f) => (
              <input key={f.name} type={f.type} name={f.name} placeholder={f.placeholder}
                value={formData[f.name]} onChange={handleInput} style={s.formInput} />
            ))}
            <textarea name="message" placeholder="Your Message *" rows={4}
              value={formData.message} onChange={handleInput}
              style={{ ...s.formInput, gridColumn: "1 / -1", resize: "vertical" }}
            />
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button style={s.submitBtn}
                onMouseEnter={e => e.target.style.background = "#c94010"}
                onMouseLeave={e => e.target.style.background = "#e8501a"}
              >
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ── STYLES ────────────────────────────────────────────
const s = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 24px" },
  section: { padding: "70px 0" },

  sectionHead: { textAlign: "center", marginBottom: "50px" },
  sectionTag: { display: "inline-block", padding: "6px 16px", background: "#fff0eb", color: "#e8501a", borderRadius: "20px", fontSize: "12px", fontWeight: "700", letterSpacing: "1px", marginBottom: "12px" },
  sectionTitle: { fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "12px", textTransform: "uppercase" },
  titleUnderline: { width: "50px", height: "3px", background: "#e8501a", margin: "0 auto", borderRadius: "2px" },

  // HERO
  hero: { minHeight: "600px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", position: "relative", padding: "80px 24px" },
  heroOverlay: { position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600') center/cover", opacity: 0.08 },
  heroContent: { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1, maxWidth: "700px" },
  heroTag: { fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: "#e8501a", textTransform: "uppercase", marginBottom: "16px" },
  heroTitle: { fontSize: "clamp(28px, 4vw, 46px)", fontWeight: "900", color: "#fff", lineHeight: "1.15", marginBottom: "20px" },
  heroDesc: { fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8", marginBottom: "32px", maxWidth: "600px" },
  heroBtns: { display: "flex", gap: "16px", flexWrap: "wrap" },
  btnOrange: { padding: "14px 32px", background: "#e8501a", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px", letterSpacing: "0.5px" },
  btnOutline: { padding: "14px 32px", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px" },

  // SERVICES
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" },
  serviceCard: { padding: "28px 24px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.3s", border: "1px solid #f0f0f0" },
  serviceIcon: { fontSize: "32px", marginBottom: "14px" },
  serviceTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "10px" },
  serviceDesc: { fontSize: "13px", color: "#777", lineHeight: "1.7" },

  // WHY US
  whyGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" },
  whyLeft: {},
  whyItem: { display: "flex", gap: "16px", marginBottom: "24px", alignItems: "flex-start" },
  whyIcon: { width: "44px", height: "44px", background: "#fff0eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 },
  whyItemTitle: { fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "4px" },
  whyItemDesc: { fontSize: "13px", color: "#777", lineHeight: "1.6" },
  whyRight: { display: "flex", justifyContent: "center" },
  whyImageBox: { width: "100%", maxWidth: "440px" },
  whyImagePlaceholder: { background: "linear-gradient(135deg, #e8501a, #ff7043)", borderRadius: "16px", padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "380px" },

  // BUSINESS NEEDS
  needsGrid: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", alignItems: "center" },
  needsLeft: { display: "flex", justifyContent: "center" },
  phoneBox: {},
  phoneMock: { width: "180px", height: "340px", background: "#1a1a2e", borderRadius: "32px", padding: "20px 12px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" },
  phoneScreen: { background: "linear-gradient(135deg, #e8501a, #ff7043)", borderRadius: "22px", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  needsRight: { display: "flex", flexDirection: "column", gap: "20px" },
  needItem: { display: "flex", gap: "16px", alignItems: "flex-start" },
  needIcon: { width: "40px", height: "40px", background: "#fff0eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 },
  needTitle: { fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "4px" },
  needDesc: { fontSize: "13px", color: "#777", lineHeight: "1.6" },

  // PORTFOLIO
  portfolioGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  portfolioCard: { background: "rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" },
  portfolioImgBox: { height: "160px", background: "linear-gradient(135deg, #e8501a22, #1a1a2e)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "20px" },
  portfolioTag: { position: "absolute", top: "12px", left: "12px", background: "#e8501a", color: "#fff", padding: "3px 10px", borderRadius: "3px", fontSize: "11px", fontWeight: "700" },
  portfolioResult: { fontSize: "22px", fontWeight: "900", color: "#e8501a", textAlign: "center" },
  portfolioBody: { padding: "16px" },
  portfolioTitle: { fontSize: "12px", color: "#bbb", lineHeight: "1.5" },

  // PROCESS
  processGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" },
  processCard: { textAlign: "center", padding: "28px 16px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" },
  processStep: { width: "48px", height: "48px", background: "#e8501a", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "900", margin: "0 auto 16px" },
  processTitle: { fontSize: "15px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px" },
  processDesc: { fontSize: "12px", color: "#777", lineHeight: "1.6" },

  // TESTIMONIALS
  testimonialBox: { maxWidth: "720px", margin: "0 auto", textAlign: "center", padding: "40px", background: "rgba(255,255,255,0.04)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" },
  testimonialQuote: { fontSize: "80px", color: "#e8501a", lineHeight: "0.8", marginBottom: "20px", display: "block" },
  testimonialText: { fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: "1.8", marginBottom: "20px", fontStyle: "italic" },
  testimonialAuthor: { fontSize: "14px", fontWeight: "700", color: "#e8501a", marginBottom: "24px" },
  testimonialDots: { display: "flex", gap: "8px", justifyContent: "center" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer" },

  // CLIENTS
  clientsRow: { display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", alignItems: "center" },
  clientLogo: { padding: "16px 32px", background: "#f8f9fa", borderRadius: "8px", border: "1px solid #eee", fontSize: "14px", fontWeight: "700", color: "#555", minWidth: "120px", textAlign: "center" },

  // FORM
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "800px", margin: "0 auto" },
  formInput: { padding: "14px 16px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", background: "#fff", outline: "none", width: "100%" },
  submitBtn: { padding: "15px 48px", background: "#e8501a", color: "#fff", border: "none", borderRadius: "4px", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", transition: "background 0.2s" },
};