import "./style/utility.css";
import Logo from "./assets/icons/logo.svg"
import Menu from "./assets/icons/Menu.svg"
import Close from "./assets/icons/Close.svg"
import Button from "./components/button";
import Card from "./components/card";
import TestimonialCard from "./components/testimonialCard";
import PricingCard from "./components/pricingCard";
import ContactForm from "./components/contactForm";
import Footer from "./components/footer";
import HeroRectangleOne from "./assets/images/RectangleOne.png";
import HeroRectangleTwo from "./assets/images/RectangleTwo.png";
import ProfileOne from "./assets/images/profile-one.webp";
import ProfileTwo from "./assets/images/profile-two.png";
import Globo from "./assets/icons/globo.svg"
import Laptop from "./assets/icons/laptop.svg"
import Wifi from "./assets/icons/wifi.svg"
import "./style/hero.css";
import "./style/solution.css";
import "./style/testimonials.css";
import "./style/pricing.css";

import "./style/header.css"
import { useEffect, useState } from "react";

// Textos do cliente: https://suldigital.com.br/
const solutions = [
    {
        icon: Globo,
        title: "Fibra óptica",
        text: "Internet residencial e empresarial sem franquia de dados, com download e upload assimétricos.",
    },
    {
        icon: Wifi,
        title: "Wi-Fi 6 com 2 roteadores",
        text: "Roteadores instalados e configurados: mais cobertura, mais desempenho e sinal forte onde você estiver.",
    },
    {
        icon: Laptop,
        title: "Trabalho e diversão",
        text: "Há 24 anos conectando pessoas e impulsionando negócios: vídeos, jogos, downloads e monitoramento sem travar.",
    },
];

// ATENÇÃO: o site do cliente não tem depoimentos — textos de exemplo, trocar pelos reais.
const testimonials = [
    { name: "Carlos Almeida", role: "Cliente residencial", image: ProfileOne, rating: 5, text: "Internet estável o dia inteiro, nunca mais tive travamento nas chamadas de vídeo." },
    { name: "Mariana Costa", role: "Empresária", image: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, text: "Contratamos a fibra para a empresa e o suporte sempre resolve rápido quando precisamos." },
    { name: "Rafael Souza", role: "Gamer", image: ProfileTwo, rating: 4, text: "Ping baixo e velocidade igual à contratada. Recomendo para quem joga online." },
];

export default function Home() {

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }
    }, [showMobileMenu]);

    return (
        <>
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    <img src={Logo} alt="Logo Suldigital" width={220} height={80} />
                        <div className="desktop-only">
                            <ul className="flex gap-1">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#solution">Soluções</a>
                                </li>
                                <li>
                                    <a href="#testimonials">Depoimentos</a>
                                </li>
                                <li>
                                    <a href="#pricing">Preços</a>
                                </li>
                                <li>
                                    <a href="#contact">Contato</a>
                                </li>
                            </ul>
                        </div>

                        <div className="desktop-only">
                            <div className="flex items-center">
                                <a className="reverse-color ml-lg" href="">Login</a>
                                <Button text="Cadastre-se" />
                            </div>
                        </div>

                        <div className="mobile-menu">
                            {showMobileMenu ?
                                <div className="mobile-menu-content">
                                    <div className="container flex">
                                        <ul>
                                            <li>
                                                <a onClick={() => setShowMobileMenu(false)} href="#">Home</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setShowMobileMenu(false)} href="#solution">Soluções</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setShowMobileMenu(false)} href="#testimonials">Depoimentos</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setShowMobileMenu(false)} href="#pricing">Preços</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setShowMobileMenu(false)} href="#contact">Contato</a>
                                            </li>
                                            <li>
                                                <a className="reverse-color" href="#">Login</a>
                                            </li>
                                        </ul>
                                        <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper">
                                            <img src={Close} alt="ícone fechar menu" width={24} height={24} />
                                        </span>
                                    </div>
                                </div>
                                :
                                <span onClick={() => setShowMobileMenu(!showMobileMenu)} className="btn-wrapper" >
                                    <img src={Menu} alt="ícone menu" width={24} height={24} />
                                </span>
                            }
                        </div>


                </nav>
            </header>

            <section id="hero">
                <span className="desktop-only">
                    <img src={HeroRectangleTwo} alt="Retangulo um tela inicial" />
                </span>

                <img src={HeroRectangleOne} alt="Retangulo dois tela inicial" />

                <div className="container content">
                    <p className="desktop-only">
                        Velocidade para você ir além
                    </p>
                    <h1>Internet na velocidade da luz!! Fibra óptica na sua casa, apartamento ou empresa.</h1>
                    <p>Diga adeus à lentidão e aos travamentos. Com a nossa tecnologia 100% fibra óptica de ponta a ponta
                    </p>
                    <div className="flex gap-1">
                        <span><Button text="Cadastre-se" /></span>
                        <span className="desktop-only">
                            <Button text="Veja mais" secondary />
                        </span>
                    </div>
                </div>
            </section>


            <section className="container" id="solution">
                <header>
                    <span>
                        <h2>Soluções</h2>
                        <span className="desktop-only">
                            <h2>Sob medida para você</h2>
                        </span>
                    </span>

                    <p>
                        Conectividade é com a gente! A <strong>Suldigital </strong>
                        leva internet de qualidade para a sua casa e para a sua empresa,
                        veja tudo que você pode ganhar com os nossos serviços.
                    </p>
                </header>

                <section className="even-columns">
                    {solutions.map((solution) => (
                        <Card key={solution.title} icon={solution.icon} title={solution.title} text={solution.text} />
                    ))}
                </section>
            </section>

            <section id="testimonials">
                <header>
                    <span>
                        <p className="desktop-only">
                            Conselho de quem conhece
                        </p>
                        <h2>Cada cliente importa!</h2>
                    </span>
                    <p>
                        Quem já é cliente sabe da qualidade da nossa conexão. Acompanhe abaixo
                        o que dizem os clientes que já contrataram e aprovaram.
                    </p>
                </header>

                <section className="carousel">
                    {/* O conteúdo é repetido para o carrossel girar em ciclo */}
                    {[0, 1].map((copy) => (
                        <div className="carousel-content" key={copy} aria-hidden={copy === 1}>
                            {testimonials.map((t) => (
                                <TestimonialCard
                                    key={t.name}
                                    image={t.image}
                                    text={t.text}
                                    name={t.name}
                                    role={t.role}
                                    rating={t.rating}
                                />
                            ))}
                        </div>
                    ))}
                </section>
            </section>

            <section id="pricing" className="container">
                <header>
                    <p className="desktop-only">Planos e preços</p>
                    <h2>Nossos planos</h2>
                </header>

                <section className="even-columns gap-1.5">
                    <PricingCard
                        title="Fibra 100 Mega"
                        description="Fibra óptica para casa, apartamento ou empresa."
                        price="R$ 89,90"
                        period="/mês"
                        buttonText="Assinar agora"
                        features={[
                            "100 Mbps de velocidade",
                            "100% fibra óptica",
                            "Sem franquia de dados",
                            "Suporte via WhatsApp",
                        ]}
                    />
                    <PricingCard
                        premium
                        bonus="CONTRATE AGORA"
                        title="600 Mega"
                        description="Wi-Fi 6 com 2 roteadores instalados e configurados."
                        price="R$ 129,90"
                        period="/mês"
                        buttonText="Assinar agora"
                        features={[
                            "600 Mbps de velocidade",
                            "Wi-Fi 6 com 2 roteadores",
                            "Instalados e configurados",
                            "Pronto para usar!",
                        ]}
                    />
                    <PricingCard
                        title="Fibra 300 Mega"
                        description="Mais velocidade para toda a família e home office."
                        price="R$ 99,90"
                        period="/mês"
                        buttonText="Assinar agora"
                        features={[
                            "300 Mbps de velocidade",
                            "100% fibra óptica",
                            "Sem franquia de dados",
                            "Suporte via WhatsApp",
                        ]}
                    />
                </section>
            </section>

            <section id="contact" className="container">
                <header>
                    <p className="desktop-only">Fale conosco</p>
                    <h2>Entre em contato</h2>
                    <p>Deixe seu e-mail e sua mensagem que a nossa equipe responde o mais rápido possível.</p>
                </header>

                <ContactForm />
            </section>

            <Footer />

        </>
    )
}
