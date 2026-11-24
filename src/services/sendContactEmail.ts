export interface ContactData {
    email: string;
    message: string;
}

// Chama a Netlify Function (/api/send-email) usando a Fetch API
export async function sendContactEmail(data: ContactData): Promise<void> {
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    // fetch só rejeita em erro de rede: 4xx/5xx precisam ser checados em response.ok
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Erro ao enviar mensagem.");
    }
}
