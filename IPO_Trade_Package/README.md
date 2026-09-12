# 🚀 IPO Trade — Pacote de Desenvolvimento Frontend

Bem-vindo ao pacote oficial de entrega do site e design system da **IPO Trade**. Este repositório/pacote foi arquitetado para fornecer à equipe de engenharia e produto todos os recursos visuais, tokens, componentes estilizados e scripts interativos prontos para consumo e integração em produção.

---

## 📁 Estrutura de Arquivos do Pacote

```
IPO_Trade_Package/
├── index.html              # Página Principal / Landing Page & Terminal de Arbitragem
├── design-system.html      # Especificação Completa do Design System & Componentes
├── tokens.json             # Design Tokens em formato padrão W3C (JSON)
├── README.md               # Este guia técnico para desenvolvedores
├── css/
│   ├── variables.css       # Tokens de design (Cores, espaçamento, elevação, clamp)
│   ├── typography.css      # Sistema tipográfico fluido (Outfit, Inter, JetBrains Mono)
│   ├── animations.css      # Keyframes, ambient orbs, marquee e scroll-reveal
│   ├── components.css      # Biblioteca de componentes UI (botoes, cards, inputs, cut-corners)
│   └── main.css            # Stylesheet mestre compilado/importador
└── js/
    ├── particles.js        # Motor de partículas interativas de canvas no Hero
    ├── counters.js         # Contadores numéricos dinâmicos com aceleração NumberFlow
    ├── components.js       # Gerenciador de Modais, Tabs, Acordeões, Toast e Cursor
    ├── ipotrade-app.js        # Simulador de mercado (Ticker ao vivo, Arbitrage Calculator, Book)
    └── main.js             # Ponto de entrada modular (ES Modules)
```

---

## ⚡ Como Executar Localmente

### Opção 1: Direto no Navegador (Zero Setup)
Abra diretamente o arquivo `index.html` ou `design-system.html` em qualquer navegador moderno (Chrome, Edge, Safari, Firefox).

### Opção 2: Servidor Local Estático
Para usufruir de suporte nativo a ES Modules (`import/export` no JS) sem restrições de CORS local:
```bash
# Com npx serve
npx serve .

# Com Python
python -m http.server 3000

# Com VS Code
Clique com o botão direito em `index.html` -> "Open with Live Server"
```

---

## 🎨 Paleta Cromática & Design Tokens

| Token | HEX / Valor | Descrição |
| :--- | :--- | :--- |
| `--forest` | `#18280e` | Fundo primário escuro da marca |
| `--forest-card` | `#1f3412` | Superfície elevada de cards da floresta |
| `--lemongrass` | `#b2eb76` | Cor neon de acento e destaque primário |
| `--moss` | `#3f7308` | Tom intermediário de transição de verde |
| `--sage-3` | `#d8e5ca` | Superfície suave de contraste |
| `--neon-cyan` | `#33d2ff` | Acento secundário Web3 / Info |
| `--gold` | `#c9a227` | Acento dourado para planos VIP e estrelas |
| `--color-success`| `#3fcf8e` | Indicador de lucro positivo / online |
| `--color-danger` | `#ef4444` | Indicador de perda / alertas |
| `--bg-deep` | `#070709` | Fundo ultra escuro da aplicação |

---

## 📐 Geometria & Cut Corners (`.cut-corner`)

O estilo visual chanfrado do IPO Trade utiliza polígonos CSS otimizados:

```css
.cut-corner {
  clip-path: polygon(
    17px 0%,
    calc(100% - 17px) 0%,
    100% 17px,
    100% calc(100% - 17px),
    calc(100% - 17px) 100%,
    17px 100%,
    0% calc(100% - 17px),
    0% 17px
  );
}
```

---

## 🔤 Tipografia Fluida (CSS Clamp)

Três famílias tipográficas integradas via Google Fonts:
1. **Outfit** (Display / Títulos): Pesos `600`, `700`, `800`, `900`
2. **Inter** (Body / Textos de leitura): Pesos `400`, `500`, `600`
3. **JetBrains Mono** (Dados / Carteiras / Códigos): Pesos `400`, `500`, `700`

---

## 📦 Como Integrar com React, Next.js ou Vue

1. **Importação dos estilos no Next.js (`app/layout.tsx` ou `pages/_app.tsx`)**:
   ```tsx
   import '@/styles/main.css';
   ```
2. **Uso de Tokens no Tailwind CSS (`tailwind.config.js`)**:
   ```js
   module.exports = {
     theme: {
       extend: {
         colors: {
           forest: 'var(--forest)',
           lemongrass: 'var(--lemongrass)',
           moss: 'var(--moss)',
           'neon-cyan': 'var(--neon-cyan)',
           gold: 'var(--gold)'
         },
         fontFamily: {
           display: ['Outfit', 'sans-serif'],
           body: ['Inter', 'sans-serif'],
           mono: ['JetBrains Mono', 'monospace']
         }
       }
     }
   }
   ```

---

## 🤝 Suporte e Dúvidas

Para dúvidas sobre design system, especificações de telas adicionais ou customizações, consulte os arquivos `design-system.html` e `tokens.json`.
