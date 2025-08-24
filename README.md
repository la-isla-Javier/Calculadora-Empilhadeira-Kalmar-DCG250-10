# Calculadora Residual - KALMAR DCG250-10 (PWA)

Este projeto é uma Calculadora Residual com design moderno e suporte a PWA (instalável no celular).

## Como usar
1. Faça o deploy dos arquivos em qualquer hospedagem estática: **GitHub Pages**, **Netlify**, **Vercel** ou um servidor interno.
2. Acesse a URL no celular Android/Chrome.
3. Toque em **Adicionar à tela inicial** para instalar como aplicativo offline.

## Estrutura
- `index.html` — Estrutura da interface
- `style.css` — Estilos (gradiente, glassmorphism)
- `script.js` — Lógica (tabelas, interpolação, status)
- `manifest.webmanifest` — Manifesto PWA
- `service-worker.js` — Cache offline
- `icons/` — Ícones do app

## Regras
- Implementos: **GARFO** (interpolação com tabela) e **ARIETE** (apenas 900 mm = 25000 kg)
- Se o **centro de carga > 1800 mm** → **Perigo de Tombamento** (independente do peso).
- A calculadora informa a **Capacidade de Carga (kg)** para o centro informado.

## Editar Tabelas
Abra `script.js` e ajuste os objetos `garfoTable` e `arieteTable` conforme necessário.
