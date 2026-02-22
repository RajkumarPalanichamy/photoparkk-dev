'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Sun, Zap, Lightbulb } from "lucide-react";

// ─── Shape Data ───────────────────────────────────────────────────────────────
const shapeData = [
    {
        name: "Portrait",
        tag: "Most Popular",
        subtitle: "3 : 4 Ratio",
        description: "Elegant vertical format perfect for solo portraits and cherished memories.",
        route: "/shop/backlight/portrait",
        img: "/assets/frontend_assets/BacklightPhotoFrames/BacklightPortrait.jpeg",
        shape: "portrait",
    },
    {
        name: "Landscape",
        tag: "Best Seller",
        subtitle: "4 : 3 Ratio",
        description: "Captivating horizontal view ideal for landscapes, group photos, and scenic vistas.",
        route: "/shop/backlight/landscape",
        img: "/assets/frontend_assets/BacklightPhotoFrames/LandScape.jpeg",
        shape: "landscape",
    },
    {
        name: "Square",
        tag: "Classic",
        subtitle: "1 : 1 Ratio",
        description: "The timeless balanced format for social media favorites and modern decor.",
        route: "/shop/backlight/square",
        img: "/assets/frontend_assets/BacklightPhotoFrames/Square.jpeg",
        shape: "square",
    },
];

const guarantees = [
    "Uniformed LED backlight distribution",
    "Brilliant HD resolution with deep blacks",
    "Energy-efficient low voltage power supply",
    "Ships in 4–6 business days",
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const BacklightShop = () => {
    const router = useRouter();

    return (
        <>
            <style>{`
                /* ── ALL STYLES SCOPED UNDER .backlight-page ── */
                .backlight-page {
                    font-family: 'Poppins', sans-serif;
                    background: #FAF8F4;
                    color: #1d1d1f;
                    min-height: 100vh;
                }

                /* ── Hero ── */
                .backlight-page .bp-hero {
                    position: relative;
                    width: 100%;
                    min-height: 78vh;
                    background: linear-gradient(160deg, #0a0f1e 0%, #1a1a2e 55%, #0a0a1a 100%);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .backlight-page .bp-hero-bg-img {
                    position: absolute; inset: 0; width: 100%; height: 100%;
                    object-fit: cover; object-position: center 30%;
                    opacity: 0.3;
                    filter: saturate(0.8) brightness(0.8);
                }
                .backlight-page .bp-hero-overlay {
                    position: absolute; inset: 0;
                    background: radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
                                linear-gradient(to right, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.6) 55%, rgba(10,15,30,0.2) 100%);
                }
                .backlight-page .bp-hero-content {
                    position: relative; z-index: 2;
                    max-width: 1260px; margin: 0 auto;
                    padding: 80px 48px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    align-items: center;
                    width: 100%;
                }
                .backlight-page .bp-hero-eyebrow {
                    display: inline-flex; align-items: center; gap: 10px;
                    margin-bottom: 24px;
                }
                .backlight-page .bp-hero-eyebrow-line {
                    width: 40px; height: 1px;
                    background: linear-gradient(90deg, #fbbf24, #f59e0b);
                }
                .backlight-page .bp-hero-eyebrow-text {
                    font-size: 11px; letter-spacing: 3.5px; text-transform: uppercase;
                    color: #fbbf24; font-weight: 500;
                }
                .backlight-page .bp-hero-h1 {
                    font-family: 'Poppins', sans-serif;
                    font-size: clamp(2.4rem, 5.5vw, 4.4rem);
                    font-weight: 700; line-height: 1.08;
                    color: #f5f5f7; letter-spacing: -0.5px;
                    margin-bottom: 20px;
                }
                .backlight-page .bp-hero-h1 em { font-style: normal; color: #fbbf24; text-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
                .backlight-page .bp-hero-p {
                    font-size: 15px; line-height: 1.85;
                    color: rgba(245,245,247,0.7);
                    font-weight: 300; max-width: 440px;
                    margin-bottom: 40px;
                }
                .backlight-page .bp-hero-cta {
                    display: inline-flex; align-items: center; gap: 12px;
                    padding: 14px 32px;
                    background: #0071e3;
                    color: #fff; font-size: 13px; font-weight: 600;
                    letter-spacing: 1.2px; text-transform: uppercase;
                    border: none; border-radius: 6px; cursor: pointer;
                    transition: all 0.3s;
                    text-decoration: none;
                    box-shadow: 0 4px 20px rgba(0,113,227,0.4);
                }
                .backlight-page .bp-hero-cta:hover {
                    background: #0077ed;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0,113,227,0.5);
                }
                .backlight-page .bp-hero-right {
                    display: flex; flex-direction: column; gap: 12px;
                    align-items: flex-end;
                }
                .backlight-page .bp-hero-tag {
                    background: rgba(251, 191, 36, 0.15);
                    border: 1px solid rgba(251, 191, 36, 0.35);
                    border-radius: 4px;
                    padding: 4px 12px;
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: #fbbf24; align-self: flex-start;
                    margin-bottom: 8px;
                }
                .backlight-page .bp-hero-features {
                    list-style: none;
                    display: flex; flex-direction: column; gap: 10px;
                    width: 100%;
                    padding: 0; margin: 0;
                }
                .backlight-page .bp-hero-feature-item {
                    display: flex; align-items: center; gap: 10px;
                    font-size: 13px; color: rgba(245,245,247,0.75); font-weight: 300;
                }
                .backlight-page .bp-hero-feature-dot {
                    width: 4px; height: 4px; border-radius: 50%;
                    background: #fbbf24; flex-shrink: 0;
                    box-shadow: 0 0 8px #fbbf24;
                }

                /* ── Steps Bar ── */
                .backlight-page .bp-steps-bar {
                    background: #fff;
                    border-bottom: 1px solid #e5e5e5;
                    padding: 0 48px;
                }
                .backlight-page .bp-steps-inner {
                    max-width: 1260px; margin: 0 auto;
                    display: flex; align-items: stretch;
                }
                .backlight-page .bp-step-item {
                    display: flex; align-items: center; gap: 14px;
                    padding: 22px 0; flex: 1;
                    border-right: 1px solid #e5e5e5;
                    position: relative;
                }
                .backlight-page .bp-step-item:last-child { border-right: none; padding-right: 0; }
                .backlight-page .bp-step-item:not(:first-child) { padding-left: 36px; }
                .backlight-page .bp-step-num {
                    width: 36px; height: 36px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: 600; flex-shrink: 0;
                }
                .backlight-page .bp-step-num.active { background: #0071e3; color: #fff; }
                .backlight-page .bp-step-num.inactive { background: #f5f5f5; color: #a3a3a3; }
                .backlight-page .bp-step-text-label {
                    font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;
                }
                .backlight-page .bp-step-text-label.active { color: #1d1d1f; }
                .backlight-page .bp-step-text-label.inactive { color: #a3a3a3; }
                .backlight-page .bp-step-text-sub { font-size: 11px; color: #a3a3a3; font-weight: 300; }

                /* ── Section: Choose Shape ── */
                .backlight-page .bp-choose-section {
                    max-width: 1260px;
                    margin: 0 auto;
                    padding: 80px 48px 100px;
                }
                .backlight-page .bp-section-header {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    margin-bottom: 56px;
                    gap: 24px;
                }
                .backlight-page .bp-section-eyebrow {
                    display: inline-block;
                    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
                    color: #0071e3; font-weight: 600; margin-bottom: 12px;
                }
                .backlight-page .bp-section-h2 {
                    font-family: 'Poppins', sans-serif;
                    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
                    font-weight: 700; color: #1d1d1f; line-height: 1.2;
                    letter-spacing: -0.5px;
                }
                .backlight-page .bp-section-h2 em { font-style: normal; color: #0071e3; }
                .backlight-page .bp-section-divider {
                    flex-shrink: 0;
                    height: 1px; width: 80px;
                    background: linear-gradient(90deg, #0071e3, transparent);
                    margin-bottom: 6px;
                }

                /* ── Cards Grid ── */
                .backlight-page .bp-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 28px;
                }
                @media (max-width: 1024px) {
                    .backlight-page .bp-cards-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .backlight-page .bp-cards-grid { grid-template-columns: 1fr; }
                    .backlight-page .bp-hero-content { grid-template-columns: 1fr; padding: 60px 24px; }
                    .backlight-page .bp-hero-right { display: none; }
                    .backlight-page .bp-choose-section { padding: 56px 24px 80px; }
                    .backlight-page .bp-section-header { flex-direction: column; align-items: flex-start; }
                    .backlight-page .bp-steps-bar { padding: 0 24px; }
                }

                /* ── Card ── */
                .backlight-page .bp-shape-card {
                    background: #fff;
                    border-radius: 16px;
                    border: 1px solid #e5e5e5;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    display: flex; flex-direction: column;
                }
                .backlight-page .bp-shape-card:hover {
                    border-color: #0071e3;
                    transform: translateY(-8px);
                    box-shadow: 0 24px 60px rgba(0,113,227,0.15), 0 4px 20px rgba(0,0,0,0.06);
                }
                .backlight-page .bp-card-image-area {
                    position: relative;
                    height: 220px;
                    background: #f5f5f7;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden;
                }
                .backlight-page .bp-card-image-bg {
                    position: absolute; inset: 0;
                    background: linear-gradient(160deg, #f5f5f7 0%, #e8eaf0 100%);
                }
                .backlight-page .bp-card-tag {
                    position: absolute; top: 14px; left: 14px; z-index: 5;
                    background: #0071e3; color: #fff;
                    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
                    font-weight: 600; padding: 4px 10px; border-radius: 4px;
                }
                .backlight-page .bp-card-image-wrap {
                    position: relative; z-index: 2;
                    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                    filter: drop-shadow(0 12px 32px rgba(0,0,0,0.18));
                }
                .backlight-page .bp-shape-card:hover .bp-card-image-wrap { transform: scale(1.05); }
                .backlight-page .bp-card-img {
                    display: block; object-fit: cover;
                    transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
                    border: 2px solid #000;
                }
                .backlight-page .bp-shape-card:hover .bp-card-img { transform: scale(1.06); }
                .backlight-page .bp-card-gloss {
                    position: absolute; inset: 0; z-index: 3; pointer-events: none;
                    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.0) 50%, rgba(255,251,235,0.1) 100%);
                }
                .backlight-page .bp-card-body {
                    padding: 24px 26px 26px;
                    flex: 1; display: flex; flex-direction: column;
                    gap: 10px;
                }
                .backlight-page .bp-card-header-row {
                    display: flex; align-items: center; justify-content: space-between;
                }
                .backlight-page .bp-card-name {
                    font-family: 'Poppins', sans-serif;
                    font-size: 17px; font-weight: 600; color: #1d1d1f;
                    letter-spacing: -0.2px;
                }
                .backlight-page .bp-card-subtitle {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: #0071e3; font-weight: 600;
                    background: #e6f2ff; border: 1px solid #bfdbfe;
                    padding: 3px 8px; border-radius: 4px;
                }
                .backlight-page .bp-card-desc {
                    font-size: 12.5px; color: #737373; line-height: 1.7; font-weight: 300;
                }
                .backlight-page .bp-card-footer {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-top: 6px; padding-top: 16px;
                    border-top: 1px solid #f5f5f5;
                }
                .backlight-page .bp-card-cta-text {
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    font-weight: 600; color: #0071e3;
                }
                .backlight-page .bp-card-arrow {
                    width: 32px; height: 32px; border-radius: 50%;
                    background: #e6f2ff; border: 1px solid #bfdbfe;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.3s;
                }
                .backlight-page .bp-shape-card:hover .bp-card-arrow {
                    background: #0071e3; border-color: #0071e3;
                }

                /* ── Guarantee Strip ── */
                .backlight-page .bp-guarantee-strip {
                    background: linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 100%);
                    padding: 40px 48px;
                }
                .backlight-page .bp-guarantee-inner {
                    max-width: 1260px; margin: 0 auto;
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 20px;
                }
                .backlight-page .bp-guarantee-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: 15px; font-weight: 600; color: #f5f5f7;
                    letter-spacing: 0.2px;
                }
                .backlight-page .bp-guarantee-items {
                    display: flex; flex-wrap: wrap; gap: 24px;
                }
                .backlight-page .bp-guarantee-item {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 12px; color: rgba(245,245,247,0.65); font-weight: 300;
                }
                .backlight-page .bp-guarantee-check {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: rgba(0,113,227,0.25); border: 1px solid rgba(0,113,227,0.5);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
            `}</style>

            <div className="backlight-page">

                {/* ── HERO ─────────────────────────────────────────────── */}
                <section className="bp-hero">
                    <img
                        src="/assets/frontend_assets/BacklightPhotoFrames/BacklightBanner.jpeg"
                        alt="Backlight Header Backdrop"
                        className="bp-hero-bg-img"
                    />
                    <div className="bp-hero-overlay" />

                    <div className="bp-hero-content">
                        <div>
                            <div className="bp-hero-eyebrow">
                                <div className="bp-hero-eyebrow-line" />
                                <span className="bp-hero-eyebrow-text">Illuminated Collection</span>
                            </div>

                            <h1 className="bp-hero-h1">
                                Every Detail,<br />
                                <em>Glow</em>ing with<br />
                                Life.
                            </h1>

                            <p className="bp-hero-p">
                                Transform your photos into radiant masterpieces. Our premium
                                LED backlight frames bring unmatched depth, vibrance, and warmth to your home.
                            </p>

                            <button
                                className="bp-hero-cta"
                                onClick={() => {
                                    document.getElementById('shapes')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Start Designing
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="bp-hero-right">
                            <div className="bp-hero-tag">Premium LED Tech</div>
                            <ul className="bp-hero-features">
                                {[
                                    { icon: <Sun size={14} />, text: "Edge-lit LED technology for even glow" },
                                    { icon: <Zap size={14} />, text: "High-contrast fabric print surfaces" },
                                    { icon: <Lightbulb size={14} />, text: "Energy-efficient & long-lasting bulbs" },
                                    { icon: <Check size={14} />, text: "Slim-profile design, easy wall mounting" },
                                ].map((feat, i) => (
                                    <li key={i} className="bp-hero-feature-item">
                                        <div className="bp-hero-feature-dot" />
                                        {feat.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── STEPS BAR ────────────────────────────────────────── */}
                <div className="bp-steps-bar">
                    <div className="bp-steps-inner">
                        {[
                            { num: "01", label: "Choose Shape", sub: "Select your format", active: true },
                            { num: "02", label: "Upload & Customize", sub: "Add your photo", active: false },
                            { num: "03", label: "Place Order", sub: "Select size & checkout", active: false },
                        ].map((step, i) => (
                            <div key={i} className="bp-step-item">
                                <div className={`bp-step-num ${step.active ? "active" : "inactive"}`}>
                                    {step.num}
                                </div>
                                <div>
                                    <div className={`bp-step-text-label ${step.active ? "active" : "inactive"}`}>
                                        {step.label}
                                    </div>
                                    <div className="bp-step-text-sub">{step.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CHOOSE SHAPE ──────────────────────────────────────── */}
                <section id="shapes" className="bp-choose-section">
                    <div className="bp-section-header">
                        <div>
                            <span className="bp-section-eyebrow">Step 01 / 03</span>
                            <h2 className="bp-section-h2">
                                Pick Your <em>Backlight Shape</em>
                            </h2>
                        </div>
                        <div className="bp-section-divider" />
                    </div>

                    <div className="bp-cards-grid">
                        {shapeData.map((item, i) => (
                            <ShapeCard key={i} data={item} onClick={() => router.push(item.route)} />
                        ))}
                    </div>
                </section>

                {/* ── GUARANTEE STRIP ───────────────────────────────────── */}
                <div className="bp-guarantee-strip">
                    <div className="bp-guarantee-inner">
                        <span className="bp-guarantee-title">Our Lighting Promise</span>
                        <div className="bp-guarantee-items">
                            {guarantees.map((g, i) => (
                                <div key={i} className="bp-guarantee-item">
                                    <div className="bp-guarantee-check">
                                        <Check size={10} color="#fbbf24" strokeWidth={3} />
                                    </div>
                                    {g}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

/* ───────────────────────── Shape Card ────────────────────────── */
function ShapeCard({ data, onClick }) {
    const [hovered, setHovered] = useState(false);
    const { name, tag, subtitle, description, img, shape } = data;

    const getImageStyle = () => {
        switch (shape) {
            case "portrait":
                return { width: "120px", height: "160px" };
            case "landscape":
                return { width: "180px", height: "135px" };
            case "square":
                return { width: "140px", height: "140px" };
            default:
                return { width: "150px", height: "150px" };
        }
    };

    return (
        <div
            className="bp-shape-card"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="bp-card-image-area">
                <div className="bp-card-image-bg" />
                <div className="bp-card-tag">{tag}</div>
                <div className="bp-card-image-wrap">
                    <img
                        src={img}
                        alt={name}
                        className="bp-card-img"
                        style={getImageStyle()}
                    />
                    <div className="bp-card-gloss" style={getImageStyle()} />
                </div>
            </div>
            <div className="bp-card-body">
                <div className="bp-card-header-row">
                    <span className="bp-card-name">{name}</span>
                    <span className="bp-card-subtitle">{subtitle}</span>
                </div>
                <p className="bp-card-desc">{description}</p>
                <div className="bp-card-footer">
                    <span className="bp-card-cta-text">Enter Studio</span>
                    <div className="bp-card-arrow">
                        <ArrowRight size={14} color={hovered ? "#fff" : "#0071e3"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BacklightShop;
