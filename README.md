# Todo Dia um Pouco - Landing Page Premium

Uma landing page premium desenvolvida para a Dra. Gisele Figueredo Ramos, promocionando o método "Todo Dia um Pouco" para emagrecimento sustentável.

## 🚀 Características

### Design Premium
- Interface moderna e responsiva
- Animações sofisticadas com GSAP
- Efeitos visuais premium (partículas, morphing cards, glow effects)
- Vídeo de fundo na hero section
- Carrossel de depoimentos automatizado

### Otimização SEO/AEO
- Estrutura semântica HTML5
- Meta tags Open Graph e Twitter Cards
- Schema markup (JSON-LD) para produtos e FAQ
- Otimização para mecanismos de busca
- Performance otimizada com lazy loading

### Funcionalidades
- Navegação suave entre seções
- Menu hambúrguer animado
- Botão WhatsApp flutuante adaptativo (mobile/desktop)
- FAQ interativo com animações
- Efeitos de scroll avançados
- Preload de recursos críticos

## 📱 Responsividade

A landing page é totalmente responsiva e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5 semântico
- CSS3 com custom properties
- JavaScript ES6+
- GSAP para animações
- Locomotive Scroll para efeitos de rolagem

### Bibliotecas CDN
- Font Awesome 6.4.0 (ícones)
- Google Fonts (Inter + Playfair Display)
- GSAP 3.12.2 + ScrollTrigger
- Locomotive Scroll 4.1.4

## 📁 Estrutura do Projeto

```
todo-dia-um-pouco/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── style.css         # Estilos principais
│   │   └── components.css    # Componentes premium
│   ├── js/
│   │   └── main.js          # JavaScript principal
│   ├── video/
│   │   ├── hero-section-video.mp4
│   │   └── gisele-talking.mp4
│   └── image/
│       ├── gisele-figueredo.png
│       └── favicon.png
└── README.md
```

## 🎨 Paleta de Cores

- **Primary**: #2D5016 (Verde escuro)
- **Primary Light**: #4A7C59 (Verde médio)
- **Secondary**: #F4A261 (Laranja dourado)
- **Accent**: #E76F51 (Coral)
- **Success**: #43AA8B (Verde-azulado)

## 📱 Contato WhatsApp

O botão WhatsApp está configurado para:
- **Número**: +55 19 3199-7815
- **Mensagem padrão**: "Olá! Gostaria de saber mais sobre o método Todo dia um pouco"
- **Adaptativo**: App nativo no mobile, WhatsApp Web no desktop

## 🚀 Como Usar

1. **Hospedagem**: Faça upload de todos os arquivos para seu servidor web
2. **Domínio**: Configure o domínio desejado
3. **SSL**: Certifique-se de ter certificado SSL ativo
4. **Analytics**: Adicione seu código Google Analytics se necessário

### Personalização

#### Alterar Cores
Edite as variáveis CSS em `/assets/css/style.css`:
```css
:root {
    --primary-color: #2D5016;
    --secondary-color: #F4A261;
    /* ... outras cores */
}
```

#### Modificar Conteúdo
- Textos: Edite diretamente no `index.html`
- Imagens: Substitua os arquivos em `/assets/image/`
- Vídeos: Substitua os arquivos em `/assets/video/`

#### WhatsApp
Altere o número em `/assets/js/main.js`:
```javascript
window.whatsappConfig = {
    number: '5519931997815', // Seu número aqui
    message: 'Sua mensagem aqui'
};
```

## 📊 Performance

### Otimizações Implementadas
- Lazy loading de imagens
- Preload de recursos críticos
- Minificação automática de animações
- Fallbacks para navegadores antigos
- Tratamento de erros robusto

### Core Web Vitals
- **LCP**: Otimizado com preload de vídeo hero
- **CLS**: Layout estável com dimensões fixas
- **FID**: JavaScript otimizado e não-bloqueante

## 🔧 Manutenção

### Atualizações de Conteúdo
1. **Depoimentos**: Adicione novos na seção testimonials
2. **FAQ**: Adicione novas perguntas na seção FAQ
3. **Preços**: Atualize na seção offer-section

### Monitoramento
- Configure Google Analytics
- Monitore Core Web Vitals
- Acompanhe conversões WhatsApp

## 📈 Conversão

### Elementos de Conversão
- Hero section com CTA principal
- Botão WhatsApp flutuante
- Múltiplos CTAs ao longo da página
- Seção de garantia para reduzir objeções
- FAQ para esclarecer dúvidas

### A/B Testing
Teste diferentes versões de:
- Headlines da hero section
- Cores dos botões CTA
- Posicionamento do WhatsApp
- Textos de valor da oferta

## 🐛 Suporte

Para dúvidas técnicas ou problemas:
1. Verifique o console do navegador para erros
2. Teste em diferentes navegadores
3. Valide HTML/CSS com validadores online
4. Verifique URLs de recursos (vídeos, imagens)

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para a Dra. Gisele Figueredo Ramos e o método "Todo Dia um Pouco". Todos os direitos reservados.

---

**Desenvolvido com ❤️ para conversão máxima e experiência premium do usuário.** 