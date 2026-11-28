# Explicação do código — Landing Page Suldigital

Projeto em **React + TypeScript + Vite**. É uma landing page de uma única página, feita em componentes. Este arquivo explica o que cada parte faz e para que serve, pensando na prova.

> Inclui as Partes 1 a 7 (landing page, formulário de contato com Netlify Function e deploy).

---

## 1. Estrutura de pastas

```
landing_page/
├── index.html            # HTML base: tem <div id="root"> e carrega o main.tsx
├── package.json          # dependências e scripts (dev, build, lint)
├── vite.config.ts        # configuração do Vite (plugin do React)
├── tsconfig*.json        # configuração do TypeScript
└── src/
    ├── main.tsx          # ponto de entrada: monta o React no #root
    ├── Home.tsx          # a página inteira (header, hero, soluções, depoimentos, planos)
    ├── index.css         # reset, variáveis de cor/fonte e estilos globais
    ├── components/       # peças reutilizáveis
    │   ├── button.tsx
    │   ├── card.tsx
    │   ├── testimonialCard.tsx
    │   └── pricingCard.tsx
    ├── style/            # um CSS por parte da página
    │   ├── utility.css   # classes utilitárias (container, flex, grid...)
    │   ├── header.css, hero.css, solution.css,
    │   │   testimonials.css, pricing.css, card.css, button.css
    └── assets/           # ícones (svg) e imagens
```

**Por que separar assim?** Componentes evitam repetir código (um `Card` usado 3 vezes). Um CSS por seção deixa fácil achar e mudar o estilo.

---

## 2. Arquivos de entrada

### `index.html`
Página HTML mínima. Tem `<div id="root"></div>` (onde o React desenha tudo), a fonte **Montserrat** do Google Fonts e o `<script type="module" src="/src/main.tsx">` que inicia o app.

### `src/main.tsx`
```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode><Home /></StrictMode>
)
```
- `createRoot(...)`: liga o React ao `<div id="root">`.
- `.render(<Home />)`: desenha o componente `Home` ali dentro.
- `StrictMode`: modo de desenvolvimento que avisa de erros e práticas ruins (não aparece para o usuário).

---

## 3. `src/index.css` — estilos globais

- **Reset** (`* { margin:0; padding:0; box-sizing:border-box }`): tira os espaçamentos padrão do navegador. `box-sizing: border-box` faz o padding/borda entrarem na largura do elemento.
- **Variáveis CSS em `:root`** (`--primary-color`, `--secondary-color`, `--text-color`, `--fs-lg`, `--py-xl`...): guardam cores, tamanhos de fonte e espaçamentos em um lugar só. Para mudar o tema do site, muda-se aqui.
- **Media query `@media (width >= 1280px)`**: em telas grandes, redefine as variáveis (fontes e espaçamentos maiores). É o que torna o site **responsivo** sem reescrever o CSS.
- Estilos de `html`, `body`, `h1/h2/h3`, `a`, `img`, `ul`: aparência padrão do site (fonte, cor, peso, remover sublinhado e bolinhas de lista).

---

## 4. `src/style/utility.css` — classes utilitárias

Classes pequenas e reutilizáveis, usadas direto no JSX:

| Classe | O que faz |
|---|---|
| `.container` | Limita a largura (`min(680px, 100% - margens)`) e centraliza. No desktop o máximo é 1050px. |
| `.flex`, `.grid` | `display: flex` / `display: grid`. |
| `.items-center`, `.justify-between` | Alinhamento no flex. |
| `.gap-1`, `.gap-1.5` | Espaço entre itens (1rem e 1.5rem). |
| `.even-columns` | Grid que no celular empilha e no desktop vira colunas de mesma largura (`grid-auto-flow: column; grid-auto-columns: 1fr`). |
| `.desktop-only` | `display: none` no celular, aparece só em telas ≥ 1280px. |
| `.py-*`, `.px-lg` | Padding vertical/horizontal usando as variáveis. |

---

## 5. Componentes (`src/components/`)

Um **componente** é uma função que retorna JSX. Recebe dados por **props** (parâmetros) e assim pode ser reutilizado com conteúdos diferentes. As props são tipadas com `interface` do TypeScript, o que impede passar dado errado.

### `button.tsx`
- Props: `text: string`, `secondary?: boolean` (o `?` = opcional).
- Retorna um `<button>` com a classe `btn-primary` ou `btn-secondary` conforme a prop `secondary`.
- Serve para ter **um único botão** com dois visuais (cheio e só com borda) em todo o site.

### `card.tsx`
- Props: `icon`, `title`, `text`.
- Desenha o cartão da seção Soluções: ícone, título `<h3>`, texto e uma linha `<hr>`.
- Importa `card.css` (o componente carrega o próprio estilo).

### `testimonialCard.tsx`
- Props: `image`, `text`, `name`, `role`, `rating` (nota de 0 a 5).
- As estrelas são geradas com `Array.from({ length: 5 }, (_, i) => ...)`: para cada posição `i`, se `i < rating` mostra estrela cheia, senão estrela vazia. Assim a nota vem como número e não precisa repetir `<img>` na mão.
- `key={i}`: o React exige uma chave única em listas para atualizar eficientemente.

### `pricingCard.tsx`
- Props: `title`, `description`, `price`, `period?`, `features: string[]`, `buttonText?`, `premium?`, `bonus?`.
- `className={premium ? "pricing-card premium" : "pricing-card"}`: se for premium, ganha a borda azul de destaque.
- `{bonus && (...)}`: **renderização condicional** — só mostra a faixa "CONTRATE AGORA" se a prop `bonus` existir. O mesmo vale para `period`.
- `features.map(...)`: percorre a lista de benefícios e cria uma linha com ícone de check para cada um.
- `buttonText = "Assinar agora"`: valor padrão caso a prop não seja passada.
- O botão usa `secondary={!premium}`: o plano destacado tem botão cheio; os outros, só borda.

---

## 6. `src/Home.tsx` — a página

### Imports
Importa CSS, ícones/imagens (o Vite transforma o import em URL do arquivo) e os componentes.

### Dados em arrays
```tsx
const solutions = [ { icon, title, text }, ... ];
const testimonials = [ { name, role, image, rating, text }, ... ];
```
Em vez de repetir JSX, os dados ficam em arrays e são renderizados com `.map()`. Para mudar um texto, edita-se o array.

### Estado e efeito do menu mobile
```tsx
const [showMobileMenu, setShowMobileMenu] = useState(false);

useEffect(() => {
  const html = document.querySelector("html");
  if (html) html.style.overflow = showMobileMenu ? "hidden" : "auto";
}, [showMobileMenu]);
```
- `useState(false)`: guarda se o menu mobile está aberto. Quando muda, o React redesenha a tela.
- `useEffect(..., [showMobileMenu])`: roda **depois** que `showMobileMenu` muda. Com o menu aberto, trava a rolagem da página (`overflow: hidden`); fechado, libera (`auto`). Corrige o bug de rolar a página por trás do menu.

### Seções (retorno JSX)

1. **`<header>` / `<nav>`**: logo + links (Home, Soluções, Depoimentos, Preços, Contato) + Login e botão Cadastre-se. Os links usam âncoras (`href="#solution"`) que rolam até o `id` da seção (suave por causa do `scroll-behavior: smooth` no CSS).
   - Versão **desktop** (`.desktop-only`): menu horizontal.
   - Versão **mobile** (`.mobile-menu`): ícone de hambúrguer; ao clicar, `setShowMobileMenu(!showMobileMenu)` abre um menu em tela cheia. Ao clicar em um link, `setShowMobileMenu(false)` fecha.
   - `showMobileMenu ? (menu aberto) : (ícone)`: **operador ternário** escolhendo o que renderizar.
2. **`#hero`**: primeira dobra com título, texto, dois botões e as formas decorativas azuis (`RectangleOne/Two`).
3. **`#solution`**: título + texto + `solutions.map(...)` gerando um `<Card>` por solução, dentro de `.even-columns`.
4. **`#testimonials`**: cabeçalho + carrossel. O conteúdo é renderizado **duas vezes** (`[0, 1].map(...)`) para a animação ficar em loop contínuo sem "buraco". A cópia tem `aria-hidden` para leitores de tela não lerem repetido.
5. **`#pricing`**: três `<PricingCard>`: Fibra 100 Mega (R$ 89,90), **600 Mega** (R$ 129,90, `premium`, 2 roteadores) e Fibra 300 Mega (R$ 99,90).

---

## 7. Estilos por seção (`src/style/`)

- **`header.css`**: menu mobile em tela cheia (`position: absolute; width/height 100vw/100vh`, `z-index`), e no desktop (≥1280px) esconde o mobile e mostra o menu normal.
- **`hero.css`**: `#hero` com altura `90vh` e `display:flex`. As imagens decorativas usam `position:absolute` para ficar no canto. No desktop o layout muda (fundo branco, imagens maiores).
- **`solution.css`**: seção em coluna, centralizada, com espaçamentos; `strong` com a cor primária (destaque do nome da empresa).
- **`card.css`**: cartão com sombra (`box-shadow`), cantos arredondados, conteúdo alinhado ao fundo (`justify-content: end`) e `hr` azul-claro embaixo.
- **`testimonials.css`**: fundo azul-claro; `.carousel` com `overflow-x: hidden` (corta o que sai da caixa); `.carousel-content` com **animação `swipe`** (`@keyframes` move de `translateX(0)` a `-100%` em 30s, `linear infinite`); no `:hover` a animação pausa (`animation-play-state: paused`). Foto redonda com `border-radius: 50%` e `object-fit: cover` (não deforma a imagem).
- **`pricing.css`**: `.pricing-card` (sombra, cantos 1.5rem), `.premium` (borda azul), `.bonus` (faixa no topo), `.price` (preço e "/mês" alinhados), `.hr` (linha azul), `.features` (ícone + texto na horizontal).
- **`button.css`**: `.btn-primary` (fundo azul) e `.btn-secondary` (só borda); no `:hover` as cores se invertem.

---

## 8. Conceitos para a prova (resumo rápido)

| Conceito | Onde aparece | Em uma frase |
|---|---|---|
| Componente | `Button`, `Card`, `PricingCard`... | Função que retorna JSX e pode ser reutilizada. |
| Props | `<Card title="..." />` | Dados passados de pai para filho. |
| Interface (TS) | `IButtonProps`, `ICardProps`... | Define o formato das props e evita erros. |
| `useState` | menu mobile | Guarda um valor que, ao mudar, redesenha a tela. |
| `useEffect` | trava o scroll | Executa um efeito colateral quando uma dependência muda. |
| `.map()` + `key` | cards, estrelas, benefícios | Cria vários elementos a partir de uma lista. |
| Renderização condicional | `bonus && ...`, ternário do menu | Mostra algo só se a condição for verdadeira. |
| Variáveis CSS | `:root` no `index.css` | Valores reutilizáveis de cor/tamanho. |
| Media query | `@media (width >= 1280px)` | Muda o estilo conforme o tamanho da tela (responsivo). |
| Flexbox / Grid | `.flex`, `.even-columns` | Formas de alinhar e distribuir elementos. |
| `@keyframes` | carrossel | Define uma animação CSS. |

---

## 9. Fetch API (conteúdo de estudo da Parte 5)

O `fetch(url, options)` faz requisições HTTP e **retorna uma Promise**.

```js
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('Erro: ' + response.status);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```
- `response.json()` converte o corpo da resposta em objeto JS.
- `response.ok` é `true` para status 200–299.
- **O `fetch` só rejeita a Promise em erro de rede.** Erros como 404 e 500 não caem no `.catch` sozinhos: é preciso checar `response.ok`.
- Para enviar dados: `method: 'POST'`, `headers: {'Content-Type': 'application/json'}` e `body: JSON.stringify({...})`.

---

# Parte 6 — Netlify Functions (envio de e-mail)

## 10. Por que precisamos de uma "function"?

O React roda **no navegador do usuário**. Se o formulário enviasse o e-mail direto de lá, a senha do e-mail (SMTP) ficaria exposta no código que qualquer pessoa pode ver. Por isso o envio roda em um **servidor**: a *Netlify Function*, código Node.js/TypeScript que roda na infraestrutura da Netlify **sem precisarmos manter um servidor** (serverless). Os segredos ficam em **variáveis de ambiente**, longe do navegador.

Fluxo completo:

```
Usuário preenche o formulário (React)
   -> sendContactEmail() faz fetch POST /api/send-email
   -> redirect do netlify.toml leva para /.netlify/functions/send-email
   -> a function valida os dados e usa nodemailer + SMTP
   -> responde 200 (ok) ou 4xx/5xx (erro) em JSON
   -> o React mostra "Mensagem enviada" ou a mensagem de erro
```

## 11. Arquivos novos

```
netlify/functions/send-email.ts   # a function (back-end)
netlify.toml                      # configuração da Netlify
tsconfig.functions.json           # TypeScript da pasta de functions
.env                              # variáveis secretas (NÃO vai pro Git)
.env.example                      # modelo das variáveis (vai pro Git)
src/services/sendContactEmail.ts  # fetch que chama a function
src/components/contactForm.tsx    # formulário (e-mail + mensagem)
src/style/contact.css             # estilo da seção #contact
```

## 12. `netlify.toml`

```toml
[build]
command = "npm run build"         # como construir o site
publish = "dist"                  # pasta que será publicada
functions = "netlify/functions"   # onde estão as functions

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/:splat"
status = 200
```
- `[build]`: diz à Netlify como gerar e o que publicar.
- `functions`: cada arquivo dessa pasta vira um endpoint HTTP.
- `[[redirects]]`: cria um **atalho** `/api/send-email` em vez do caminho longo `/.netlify/functions/send-email`. `:splat` repassa o que vem depois de `/api/`. `status = 200` faz um *rewrite* (a URL não muda para o usuário).

## 13. `tsconfig.functions.json` e `tsconfig.json`

O TypeScript da pasta `netlify/functions` roda no **Node** (usa `process.env`), não no navegador. Por isso tem um tsconfig próprio (`types: ["node"]`, `include: ["netlify/functions"]`). O `tsconfig.json` ganhou a referência `{ "path": "./tsconfig.functions.json" }` para o `tsc -b` verificar também esse código. `strict: true` ativa as checagens rigorosas do TypeScript.

## 14. `netlify/functions/send-email.ts` — bloco por bloco

**Bloco 1 — imports e tipagem**
- `Handler` e `HandlerEvent`: tipos da Netlify (parecidos com `req`/`res` do Express).
- `nodemailer`: biblioteca que envia e-mail via SMTP.
- `ContactPayload { email, message }`: formato do JSON que o frontend envia.

**Bloco 2 — CORS**
- CORS é a regra do navegador que bloqueia respostas de outra origem (ex.: `localhost:5173` chamando `localhost:8888`), a não ser que o servidor autorize.
- `corsHeaders(origin)` devolve os cabeçalhos de autorização. `ALLOWED_ORIGIN` (variável de ambiente) deve ser a URL do site em produção. O operador `??` usa `""` se a variável não existir.

**Bloco 3 — o `handler`**
- Função `async` que recebe o `event` (método HTTP, headers, body...) e **retorna** `{ statusCode, headers, body }`.
- `export { handler }` é obrigatório: é assim que a Netlify encontra a função.

**Bloco 4 — métodos HTTP**
- `OPTIONS` (*preflight*): antes de um POST, o navegador pergunta se pode. Respondemos `204` com os headers de CORS.
- Qualquer método que não seja `POST` -> `405 Method Not Allowed`.

**Bloco 5 — leitura e validação do body**
- `event.body` é sempre **string**: `JSON.parse` converte em objeto; `?? "{}"` evita erro se vier nulo.
- JSON inválido -> `400 Bad Request`.
- Campos vazios (`!email?.trim()`) ou e-mail fora do padrão (regex) -> `422 Unprocessable Entity`.
- A validação **também** é feita no servidor: nunca confie só no frontend.

**Bloco 6 — transporte SMTP**
- SMTP = protocolo padrão de envio de e-mail.
- `createTransport({ host, port, secure, auth })` com tudo vindo de `process.env` (nunca escrever senha no código).
- `secure: true` = SSL direto (porta 465); `false` = STARTTLS (porta 587, o mais comum).

**Bloco 7 — envio**
- `sendMail({ from, replyTo, to, subject, text, html })`: `from` é a conta SMTP; `replyTo` é o e-mail do visitante (ao clicar em "Responder" vai para ele); `to` é o destinatário do negócio; `text` é a versão simples e `html` a formatada.
- `message.replace(/\n/g, "<br>")` troca quebras de linha por `<br>` no HTML.
- `try/catch`: se o SMTP falhar, registra o erro no servidor e devolve `500` **sem expor detalhes** ao cliente. Sucesso -> `200`.

### Códigos de status usados
| Status | Significado | Quando |
|---|---|---|
| 200 | OK | E-mail enviado |
| 204 | No Content | Resposta ao preflight OPTIONS |
| 400 | Bad Request | Body não é JSON válido |
| 405 | Method Not Allowed | Método diferente de POST |
| 422 | Unprocessable Entity | Campos faltando ou e-mail inválido |
| 500 | Internal Server Error | Falha no SMTP |

## 15. Variáveis de ambiente (`.env`)

| Variável | Para que serve |
|---|---|
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Servidor SMTP (ex.: o endereço SMTP do Gmail, porta `587`, `false`) |
| `SMTP_USER` / `SMTP_PASS` | Login do SMTP. No Gmail, `SMTP_PASS` é uma **Senha de App** (nunca a senha real) |
| `CONTACT_EMAIL` | Quem recebe as mensagens |
| `ALLOWED_ORIGIN` | URL do site liberada no CORS |

- O `.env` está no `.gitignore` para **nunca ir ao GitHub**. O `.env.example` mostra os nomes sem valores.
- Para testar sem e-mail real, usa-se o **Ethereal** (e-mail fake: as mensagens ficam num painel).
- **Senha de App** do Gmail: exige verificação em duas etapas; funciona só para SMTP e pode ser revogada sem trocar a senha da conta.

## 16. Frontend: `sendContactEmail.ts` e `contactForm.tsx`

**`sendContactEmail(data)`** usa a **Fetch API**:
- `fetch("/api/send-email", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) })`.
- `if (!response.ok)` lança um `Error` com a mensagem do servidor, porque o `fetch` **não rejeita** em 4xx/5xx, só em falha de rede.
- `.catch(() => ({}))` evita quebrar se a resposta de erro não for JSON.

**`ContactForm`** é um formulário **controlado** (os valores ficam no estado do React):
- `useState` para `email`, `message`, `status` (`"idle" | "sending" | "success" | "error"`) e `errorMessage`.
- `handleSubmit`: `event.preventDefault()` impede a página de recarregar; muda `status` para `"sending"`, chama `sendContactEmail` e, no `try/catch`, mostra sucesso (e limpa os campos) ou erro.
- `value` + `onChange` ligam cada campo ao estado. `required` e `type="email"` dão uma validação básica do navegador.
- Mensagens condicionais: `{status === "success" && <p>...</p>}`.
- Enquanto envia, o botão mostra "Enviando...".

Na `Home.tsx`, a nova `<section id="contact">` é o destino do link "Contato" do menu.

---

# Parte 7 — Deploy na Netlify

## 17. Conceitos
- **CDN**: rede de servidores no mundo todo; o site é entregue pelo servidor mais próximo do usuário (mais rápido).
- **Deploy automático com Git**: ao dar `push` no GitHub, a Netlify refaz o build e publica sozinha (CI/CD).
- **Serverless Functions**: código de back-end que roda sob demanda, sem servidor para gerenciar (usado no envio de e-mail).
- **SSL/TLS automático**: o site já sai com HTTPS.
- **Redirects**: configurados no `netlify.toml`.

## 18. Passo a passo
1. **Atualizar o projeto no GitHub** (antes de tudo).
2. Criar conta em netlify.com e fazer login.
3. *Import a git repository* -> GitHub -> autorizar -> escolher o repositório.
4. Configurar: nome do site (DNS), **Base directory** (pasta do projeto), **Build command** (`vite build`, ou `npm run build` do `netlify.toml`), **Build/Publish directory** (`dist`) e **Functions directory** (padrão `netlify/functions`).
5. Em **Environment variables**, cadastrar cada valor do `.env` (`SMTP_*`, `CONTACT_EMAIL`, `ALLOWED_ORIGIN` com a URL do site).
6. Clicar em **Deploy** e aguardar o build; o site fica acessível na URL da Netlify.

**Por que cadastrar as variáveis na Netlify?** O `.env` não vai para o GitHub (segurança), então o servidor da Netlify precisa receber esses valores pelo painel; a function lê com `process.env`.

---

## 19. Footer (`src/components/footer.tsx` e `src/style/footer.css`)

O footer (rodapé) segue o layout do Figma, com links e contatos do site do cliente.

- **Dados em arrays:** `socials` (redes sociais) e `columns` (cada coluna tem `title` e `links`). Para adicionar um link basta mexer no array, sem repetir HTML.
- **`.map()` dentro de `.map()`:** o primeiro percorre as colunas e o segundo os links de cada coluna. Cada item tem uma `key` única para o React identificar o elemento.
- **Links externos:** `link.url.startsWith("http")` decide se abre em outra aba (`target="_blank"`). `rel="noreferrer"` impede que a página aberta receba o endereço de origem ou controle a nossa aba.
- **Tipos de link:** `#pricing` rola até a seção; `tel:` abre o telefone; `mailto:` abre o e-mail; `https://wa.me/<número>` abre uma conversa no WhatsApp.
- **Ano automático:** `new Date().getFullYear()` atualiza o ano do copyright sozinho.
- **Tag semântica `<footer>`:** informa ao navegador e a leitores de tela que é o rodapé.
- **CSS mobile first:** no celular o fundo é a cor principal, o texto é claro e as colunas ficam empilhadas (`flex-direction: column`). Em telas a partir de 1280px o fundo fica branco e vira um grid de 4 colunas (`grid-template-columns: 2fr 1fr 1fr 1fr`).
- **`filter: brightness(0) invert(1)`:** deixa o logo e os ícones azuis brancos sobre o fundo azul.
