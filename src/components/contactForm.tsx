import { useState, type FormEvent } from "react";
import Button from "./button";
import { sendContactEmail } from "../services/sendContactEmail";
import "../style/contact.css";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // evita recarregar a página
        setStatus("sending");
        setErrorMessage("");

        try {
            await sendContactEmail({ email, message });
            setStatus("success");
            setEmail("");
            setMessage("");
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Erro ao enviar mensagem.");
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-email">E-mail</label>
            <input
                id="contact-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="contact-message">Mensagem</label>
            <textarea
                id="contact-message"
                rows={5}
                placeholder="Como podemos ajudar?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />

            <Button text={status === "sending" ? "Enviando..." : "Enviar mensagem"} />

            {status === "success" && <p className="form-feedback success">Mensagem enviada com sucesso!</p>}
            {status === "error" && <p className="form-feedback error">{errorMessage}</p>}
        </form>
    );
}
