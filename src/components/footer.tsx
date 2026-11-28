import Logo from "../assets/icons/logo.svg";
import Facebook from "../assets/icons/facebook.svg";
import Whatsapp from "../assets/icons/whatsapp.svg";
import "../style/footer.css";

// Links e contatos do site do cliente: https://suldigital.com.br/
const socials = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/suldigital.cascavel/" },
    { name: "WhatsApp", icon: Whatsapp, url: "https://wa.me/5545998623007" },
];

const columns = [
    {
        title: "Navegação",
        links: [
            { label: "Soluções", url: "#solution" },
            { label: "Depoimentos", url: "#testimonials" },
            { label: "Planos", url: "#pricing" },
            { label: "Contato", url: "#contact" },
        ],
    },
    {
        title: "Área do cliente",
        links: [
            { label: "Central do Assinante", url: "http://mk.suldigital.com.br:8080/sac/open.do" },
            { label: "Área do Cliente", url: "http://ixc.suldigital.com.br/central_assinante_web/" },
            { label: "Webmail", url: "https://mail.suldigital.com.br:2096/" },
            { label: "Teste de Velocidade", url: "http://www.minhaconexao.com.br/hosts/002273.php" },
        ],
    },
    {
        title: "Fale conosco",
        links: [
            { label: "45 3326-8000", url: "tel:+554533268000" },
            { label: "WhatsApp Comercial", url: "https://wa.me/5545998623007" },
            { label: "WhatsApp Suporte", url: "https://wa.me/5545984027528" },
            { label: "contato@suldigital.com.br", url: "mailto:contato@suldigital.com.br" },
        ],
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src={Logo} alt="Logo Suldigital" width={200} height={72} />
                    <p>Rua Paraná, 4560, Sala 02, Centro, Cascavel – PR</p>
                    <ul className="footer-socials">
                        {socials.map((social) => (
                            <li key={social.name}>
                                <a href={social.url} target="_blank" rel="noreferrer">
                                    <img src={social.icon} alt={social.name} width={24} height={24} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {columns.map((column) => (
                    <div key={column.title}>
                        <h3>{column.title}</h3>
                        <ul>
                            {column.links.map((link) => {
                                // Links externos (http) abrem em outra aba
                                const external = link.url.startsWith("http");
                                return (
                                    <li key={link.label}>
                                        <a
                                            href={link.url}
                                            target={external ? "_blank" : undefined}
                                            rel={external ? "noreferrer" : undefined}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="footer-bottom">
                <p>Feito com amor na aula de Programação Web 💙 © {year} Suldigital - Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
