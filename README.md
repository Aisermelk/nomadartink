# Nomad Art Ink — Site

Site institucional do estúdio Nomad Art Ink (Mattoso — Realismo & Whip
Shading). Estrutura padrão: HTML/CSS/JS puro + integração com o
**V8 ADMIN — Universal**, sem framework, sem build.

## O que é conteúdo real x placeholder

O zip que você me mandou (`nomad-art-ink.zip`) era um scaffold vazio de
React/Vite gerado pelo Google AI Studio — sem fotos, sem copy definido,
sem paleta. Este site foi construído do zero a partir só do nome do
estúdio, do artista (Mattoso) e das especialidades (Realismo, 3RL, Whip
Shading), que estavam no `metadata.json`.

**Ainda placeholder, dependem de você:**
- Foto de destaque do hero (`.hero-media`)
- Foto do Mattoso na seção Sobre (`.about-photo`)
- Texto de bio e descrição de cada estilo (escrevi um texto genérico
  plausível — ajuste pro tom de voz real do Mattoso)
- Logo de verdade (hoje é só o nome em tipografia — `favicon.svg` é um
  placeholder com a letra "N")

## Paleta e tipografia (decisões de design)

- Fundo quase preto (`#0d0d0e`), texto bege claro, um único acento em
  vermelho-sangue escuro (`#8a1f1f`) — referência discreta ao universo
  da tinta/tatuagem, usado só em detalhes (CTA, hover, estrelas)
- Tipografia: **Fraunces** (serifada, com peso) pros títulos, **Inter**
  pro corpo de texto — contraste entre algo com personalidade gráfica
  e um texto limpo e legível
- Layout com grid nítido (linhas finas de 1px entre os cards de estilo,
  galeria sem espaçamento) em vez de cards arredondados genéricos

## Integração com o V8 ADMIN Universal

Meio de contato (WhatsApp, redes sociais), a galeria de portfólio e as
avaliações do Google são todos gerenciados pelo painel
`v8adminuniversal.pages.dev` — o `js/v8-loader.js` (mesmo arquivo usado
em todos os outros projetos) busca e aplica isso automaticamente.

### Antes de publicar

1. Crie o projeto "Nomad Art Ink" no painel (Projetos → + Novo projeto)
2. Copie o ID gerado e cole no lugar de `SUBSTITUA_PELO_ID_DO_PROJETO`,
   na tag `<script>` do `v8-loader.js` em `index.html`
3. Preencha no painel:
   - **Config & redes**: WhatsApp, Instagram, TikTok, Facebook, Formspree
   - **Conteúdo**: endereço (se for atender em local fixo)
   - **Mídia**: cole as URLs das fotos de tatuagens (uma por linha) e
     ative a galeria — isso preenche a seção Portfólio sozinho
   - **Avaliações**: Place ID do Google + ativar, se quiser mostrar nota
     e comentários do Google (requer secret `GOOGLE_PLACES_API_KEY` no
     Worker — veja o painel pra detalhes)

### Convenções usadas neste site

- `data-v8="contact.whatsapp"` — botões de WhatsApp (header, hero, FAB
  flutuante, seção de contato)
- `data-v8="social.instagram"` / `.tiktok` / `.facebook` — redes sociais
- `data-v8-gallery` — grade de portfólio
- `data-v8-reviews` — avaliações do Google
- `data-v8-form` — formulário de contato (envia pro Formspree + salva
  cópia do lead no painel)
- `data-wrap-if="content.address"` (convenção própria deste site, em
  `main.js`) — esconde o bloco "Endereço" inteiro se o campo vier vazio,
  em vez de deixar o rótulo sem valor
