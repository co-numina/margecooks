"use client";
import { useState, useEffect } from "react";

const ca = "PASTE_CA_HERE";

/* Warm kitchen palette */
const CREAM = "#fef9f0";
const WARM = "#fdf4e7";
const BORDER = "#e7e0d5";
const TEXT = "#292524";
const MUTED = "#78716c";
const DIM = "#a8a29e";
const GREEN = "#16a34a";
const GREEN_LIGHT = "#dcfce7";
const MATCHA = "#86efac";

/* ── Recipe Card Viz ── */
function RecipeScroll() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Preheat oven to 350°F", detail: "Line a 9-inch round cake pan with parchment paper." },
    { title: "Sift dry ingredients", detail: "2 cups flour, 3 tbsp ceremonial matcha, 1 tsp baking powder, ½ tsp salt." },
    { title: "Cream butter and sugar", detail: "Beat ¾ cup unsalted butter with 1½ cups sugar until light and fluffy, 3-4 minutes." },
    { title: "Add wet ingredients", detail: "3 large eggs, one at a time. Then 1 tsp vanilla extract and ½ cup whole milk." },
    { title: "Fold in dry mixture", detail: "Alternate flour and ¾ cup buttermilk in 3 additions. Don't overmix." },
    { title: "Bake 30-35 minutes", detail: "Until a toothpick comes out clean. Cool completely before frosting." },
    { title: "Matcha cream frosting", detail: "8oz cream cheese, ½ cup butter, 3 cups powdered sugar, 2 tbsp matcha. Beat until smooth." },
    { title: "Marge says: done ♡", detail: "\"Why buy an expensive matcha cake when you can make it at home for a fraction of the price?\"" },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 3000);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div style={{ background: "white", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", maxWidth: 400 }}>
      <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Recipe in progress</div>
      {steps.map((s, i) => (
        <div key={i} style={{
          display: "flex", gap: 12, padding: "10px 0",
          opacity: i <= step ? 1 : 0.3,
          borderBottom: i < steps.length - 1 ? `1px solid ${BORDER}` : "none",
          transition: "opacity 0.5s"
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
            background: i < step ? GREEN : i === step ? MATCHA : "#f5f5f4",
            border: i === step ? `2px solid ${GREEN}` : "1px solid #e7e5e4",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: i < step ? "white" : i === step ? GREEN : DIM,
            fontWeight: 600, transition: "all 0.5s"
          }}>
            {i < step ? "✓" : i + 1}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, fontFamily: "-apple-system, sans-serif" }}>{s.title}</div>
            {i <= step && <div style={{ fontSize: 12, color: MUTED, marginTop: 2, lineHeight: 1.5 }}>{s.detail}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Copy CA ── */
function CopyCA() {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(ca); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: copied ? GREEN : "transparent", border: `1px solid ${BORDER}`, color: copied ? "white" : MUTED, padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "-apple-system, sans-serif", transition: "all .2s" }}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── Cost comparison ── */
const COSTS = [
  { item: "Matcha cake (bakery)", price: "$45-85", emoji: "🏪" },
  { item: "Matcha cake (Marge's recipe)", price: "$8.40", emoji: "🏠" },
  { item: "Ceremonial matcha (30g)", price: "$12", emoji: "🍵" },
  { item: "Everything else", price: "$6.40", emoji: "🥚" },
  { item: "$MARGE token", price: "priceless", emoji: "💚" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM }}>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 28px", borderBottom: `1px solid ${BORDER}`,
        background: "rgba(254,249,240,0.95)", position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🍰</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: TEXT, fontFamily: "Georgia, serif" }}>$MARGE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", background: "white", border: `1px solid ${BORDER}`, padding: "6px 14px", borderRadius: 6, position: "absolute", left: "50%", transform: "translateX(-50%)", gap: 8, fontFamily: "-apple-system, sans-serif" }}>
          <span style={{ fontSize: 12, color: MUTED }}>CA</span>
          <code style={{ fontSize: 12, color: TEXT }}>{ca}</code>
          <CopyCA />
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 14, color: MUTED, fontFamily: "-apple-system, sans-serif" }}>
          <a href="#recipe" style={{ color: MUTED, textDecoration: "none" }}>Recipe</a>
          <a href="#about" style={{ color: MUTED, textDecoration: "none" }}>About</a>
          <a href="https://knowyourmeme.com/editorials/what-is-the-why-buy-an-expensive-matcha-cake-meme-the-viral-marge-cooks-ai-memes-and-song-explained" target="_blank" rel="noopener" style={{ color: MUTED, textDecoration: "none" }}>KYM</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem 3rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: GREEN_LIGHT, border: "1px solid #bbf7d0", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 24, fontFamily: "-apple-system, sans-serif" }}>
          AI-generated cooking meme — Feb 2026
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, color: TEXT }}>
          Why buy an expensive<br /><span style={{ color: GREEN, fontWeight: 700, fontStyle: "italic" }}>matcha cake?</span>
        </h1>
        <p style={{ fontSize: 18, color: MUTED, maxWidth: 520, margin: "1.5rem auto 0", lineHeight: 1.7, fontFamily: "-apple-system, sans-serif" }}>
          Marge Simpson&apos;s AI-generated cooking show took over the internet. 
          The cake is a lie. The recipe is real. The token is $MARGE.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: "2rem", fontFamily: "-apple-system, sans-serif" }}>
          <a href="#recipe" style={{ padding: "12px 24px", background: GREEN, color: "white", fontWeight: 600, textDecoration: "none", fontSize: 14, borderRadius: 6 }}>See the recipe</a>
          <a href="https://knowyourmeme.com/editorials/what-is-the-why-buy-an-expensive-matcha-cake-meme-the-viral-marge-cooks-ai-memes-and-song-explained" target="_blank" rel="noopener" style={{ padding: "12px 24px", border: `1px solid ${BORDER}`, color: TEXT, textDecoration: "none", fontSize: 14, borderRadius: 6 }}>Read KYM entry</a>
        </div>
      </section>

      {/* Recipe + Cost split */}
      <section id="recipe" style={{ maxWidth: 900, margin: "0 auto", padding: "3.5rem 2rem", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <RecipeScroll />
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: TEXT }}>Cost breakdown</h2>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 20, lineHeight: 1.7, fontFamily: "-apple-system, sans-serif" }}>
            Why buy an expensive matcha cake when you can make one at home for a fraction of the price?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {COSTS.map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "white", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
                <span style={{ fontSize: 14, color: TEXT, fontFamily: "-apple-system, sans-serif" }}>{c.item}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: i === COSTS.length - 1 ? GREEN : TEXT, fontFamily: "-apple-system, sans-serif" }}>{c.price}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "16px", background: GREEN_LIGHT, borderRadius: 8, border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: GREEN, fontFamily: "-apple-system, sans-serif" }}>$36.60 saved</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 4, fontFamily: "-apple-system, sans-serif" }}>per cake vs average bakery price ($45)</div>
          </div>
        </div>
      </section>

      {/* What is this */}
      <section id="about" style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: TEXT }}>What is Marge Cooks?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, fontFamily: "-apple-system, sans-serif" }}>
          {[
            { title: "The meme", desc: "AI-generated videos of Marge Simpson cooking elaborate dishes went viral in late January 2026. The catchphrase: 'Why buy an expensive [food] when you can make it at home?' Paired with a catchy AI-generated song." },
            { title: "The song", desc: "An AI voice singing Marge's cooking instructions over a soothing beat. 'First, take your matcha powder... sift it with the flour...' The song is genuinely calming and people play it unironically." },
            { title: "The spread", desc: "From TikTok to Instagram to YouTube. The format expanded: Marge making sushi, ramen, croissants, boba tea. Every video follows the same formula — and people can't stop watching." },
            { title: "The culture", desc: "Marge Cooks tapped into frustration with overpriced food, nostalgia for home cooking, and the uncanny valley of AI content. It's comfort content meets absurdist humor." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "1.5rem", border: `1px solid ${BORDER}`, borderRadius: 10, background: "white" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: TEXT }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: "2rem", background: "white" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: TEXT }}>Origin & attribution</h2>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, fontFamily: "-apple-system, sans-serif" }}>
            The &quot;Marge Cooks&quot; meme originated in late January 2026 when AI-generated videos of <strong style={{ color: TEXT }}>Marge Simpson</strong> cooking 
            various dishes began circulating on TikTok and Instagram. The videos feature AI-generated visuals of Marge in her kitchen, 
            paired with an AI-generated song narrating recipes. The catchphrase <strong style={{ color: GREEN }}>&quot;Why buy an expensive [X] when you can make it at home?&quot;</strong> became 
            the signature opening. The matcha cake version went most viral, spawning countless parodies and the specific meme documented on {" "}
            <a href="https://knowyourmeme.com/editorials/what-is-the-why-buy-an-expensive-matcha-cake-meme-the-viral-marge-cooks-ai-memes-and-song-explained" target="_blank" rel="noopener" style={{ color: GREEN, textDecoration: "none" }}>Know Your Meme</a>.
          </p>
          <p style={{ fontSize: 15, fontWeight: 600, marginTop: 12, color: TEXT }}>
            The meme is the internet&apos;s. The recipe is Marge&apos;s. The token is ours.
          </p>
        </div>
      </section>

      {/* Why Token */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 2rem", borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: TEXT }}>Why a token?</h2>
        <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, maxWidth: 520, margin: "0 auto", fontFamily: "-apple-system, sans-serif" }}>
          Marge asked the question the internet was afraid to ask: why ARE we paying $45 for a matcha cake? 
          <span style={{ color: GREEN, fontWeight: 600 }}> $MARGE</span> is a tribute to the AI chef who taught millions that the real alpha 
          was in the kitchen all along.
        </p>
      </section>

      {/* The Marge Philosophy */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: TEXT }}>The Marge Philosophy</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, fontFamily: "-apple-system, sans-serif" }}>
          {[
            { q: "Matcha cake", bakery: "$45", home: "$8.40", saved: "$36.60" },
            { q: "Sushi platter", bakery: "$65", home: "$14.20", saved: "$50.80" },
            { q: "Croissants (12)", bakery: "$48", home: "$6.80", saved: "$41.20" },
            { q: "Boba tea (4)", bakery: "$32", home: "$5.60", saved: "$26.40" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "1.5rem", border: `1px solid ${BORDER}`, borderRadius: 10, background: "white", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: TEXT }}>{item.q}</div>
              <div style={{ fontSize: 12, color: MUTED, textDecoration: "line-through" }}>Bakery: {item.bakery}</div>
              <div style={{ fontSize: 12, color: GREEN, fontWeight: 600, marginTop: 4 }}>Marge: {item.home}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: GREEN, marginTop: 8 }}>{item.saved} saved</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "3.5rem 2rem", borderTop: `1px solid ${BORDER}` }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: TEXT }}>FAQ</h2>
        {[
          { q: "Is the matcha cake recipe actually real?", a: "Yes. The recipe in the AI video uses real ingredients in real proportions. Multiple food bloggers have tested it and confirmed it produces a decent matcha cake. AI Marge might be fake, but her recipes work." },
          { q: "Who made the original video?", a: "The original creator is unknown — the format spread virally through TikTok and Instagram with many accounts posting variations. The AI generation tools used include Kling, Runway, and various voice synthesis platforms." },
          { q: "Why is this a token?", a: "Because Marge asked the most important question of 2026: why are we overpaying for everything? $MARGE is a movement. Cook at home. Save money. Buy $MARGE with the savings." },
          { q: "What does the AI song sound like?", a: "Imagine if Marge Simpson had a cooking show produced by lo-fi hip hop beats to study to. It's genuinely soothing. People use it as background music while actually cooking." },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${BORDER}`, fontFamily: "-apple-system, sans-serif" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: TEXT }}>{item.q}</h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8 }}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "2rem 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontFamily: "-apple-system, sans-serif" }}>
        <span style={{ fontSize: 13, color: DIM }}>$MARGE — Why buy expensive when you can cook at home?</span>
        <a href="https://knowyourmeme.com/editorials/what-is-the-why-buy-an-expensive-matcha-cake-meme-the-viral-marge-cooks-ai-memes-and-song-explained" target="_blank" rel="noopener" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>KYM</a>
      </footer>
    </div>
  );
}
