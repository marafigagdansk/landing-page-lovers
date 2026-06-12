/* -------------------------------------------------------------
   Lógica de Animações com GSAP e ScrollTrigger (Astro/Vite)
   Desenvolvedor Front-end Sênior & Designer UI/UX
   ------------------------------------------------------------- */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todas as animações
  initHeroAnimations();
  initCapitulo1Animations();
  initCapitulo2HorizontalScroll();
  initCapitulo3OverlapAnimations();
  initFooterAnimations();
});

/**
 * 1. HERO - Efeito de Revelação de Texto (Text Reveal) & Fades
 */
function initHeroAnimations() {
  const heroTitle = document.getElementById("hero-title");
  
  if (heroTitle) {
    // Quebrar o texto em letras individuais de forma dinâmica
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = ""; // Limpar o texto original
    
    // Iterar por cada caractere para envolver em elementos estruturais
    for (let char of text) {
      const charWrapper = document.createElement("span");
      charWrapper.className = "char-wrapper";
      
      const charSpan = document.createElement("span");
      charSpan.className = "char-item";
      
      // Preservar espaços em branco
      if (char === " ") {
        charSpan.innerHTML = "&nbsp;";
      } else {
        charSpan.textContent = char;
      }
      
      charWrapper.appendChild(charSpan);
      heroTitle.appendChild(charWrapper);
    }
  }

  // Criar uma Timeline para a introdução do Hero
  const heroTl = gsap.timeline();

  heroTl
    // 1. Mostrar o subtítulo primeiro
    .to("#hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    // 2. Revelar as letras do título principal com stagger
    .to(".char-item", {
      y: "0%",
      duration: 1.2,
      stagger: 0.03,
      ease: "power4.out"
    }, "-=0.4")
    // 3. Revelar a mensagem explicativa (lead)
    .to("#hero-lead", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.6")
    // 4. Exibir o indicador de scroll sutilmente
    .to("#hero-scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

  // Ação de clique no indicador de scroll para rolar até o Capítulo 1
  const scrollIndicator = document.getElementById("hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const cap1 = document.getElementById("capitulo1");
      if (cap1) {
        cap1.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/**
 * 2. CAPÍTULO 1 - Layout Misto e Grid Assimétrico (Fade lateral e scale-up)
 */
function initCapitulo1Animations() {
  // Animação para itens que surgem da esquerda
  const leftElements = gsap.utils.toArray(".js-anim-stagger-left");
  leftElements.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Dispara quando o topo do elemento chega a 85% da altura da tela
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animação para itens que surgem da direita
  const rightElements = gsap.utils.toArray(".js-anim-stagger-right");
  rightElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Animação de revelação gradual (scale e fade) para o Vídeo 01 grande
  const scaleElements = gsap.utils.toArray(".js-anim-scale-up");
  scaleElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/**
 * 3. CAPÍTULO 2 - Rolagem Horizontal com Pinned Scroll & Barra de Progresso
 */
function initCapitulo2HorizontalScroll() {
  const horizontalScroll = document.getElementById("horizontal-scroll");
  const capitulo2Pin = document.getElementById("capitulo2-pin");

  if (!horizontalScroll || !capitulo2Pin) return;

  // Função para calcular a largura de translação horizontal necessária
  const getScrollAmount = () => {
    const scrollWidth = horizontalScroll.scrollWidth;
    const windowWidth = window.innerWidth;
    return -(scrollWidth - windowWidth + 80); // Ajuste fino para espaçamento no final
  };

  // Criar o ScrollTrigger para fixar a seção e mover o container horizontal
  const horizontalTween = gsap.to(horizontalScroll, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: capitulo2Pin,
      pin: true,
      scrub: 1, // Suavidade na rolagem (1 segundo de atraso fluido)
      start: "top top",
      end: () => `+=${horizontalScroll.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true, // Recalcula tamanhos se a tela for redimensionada
      // Atualizar a barra de progresso horizontal
      onUpdate: (self) => {
        gsap.to("#horizontal-progress", {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: "none"
        });
      }
    }
  });

  // Adicionar efeito de entrada sutil (stagger rotativo / spring) nas fotos durante o scroll horizontal
  const horizontalItems = gsap.utils.toArray(".horizontal-item");
  horizontalItems.forEach((item, index) => {
    gsap.fromTo(item,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          containerAnimation: horizontalTween, // OBRIGATÓRIO para elementos dentro do scroll horizontal
          start: "left 85%", // Dispara quando o lado esquerdo do item entra 85% na tela horizontal
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/**
 * 4. CAPÍTULO 3 - Momentos Marcantes com Overlap e Efeito Parallax
 */
function initCapitulo3OverlapAnimations() {
  // Efeito Parallax sutil nas imagens de sobreposição
  const parallaxImages = gsap.utils.toArray(".js-anim-parallax-img");
  parallaxImages.forEach((img) => {
    gsap.fromTo(img,
      { y: 50 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom", // Inicia quando a imagem surge na parte inferior
          end: "bottom top",   // Termina quando ela sai pela parte superior
          scrub: true          // Sincroniza diretamente com o scroll do mouse
        }
      }
    );
    // Revelar opacidade
    gsap.fromTo(img,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Efeito Parallax sutil e atrasado nos textos de sobreposição
  const parallaxTexts = gsap.utils.toArray(".js-anim-parallax-text");
  parallaxTexts.forEach((text) => {
    gsap.fromTo(text,
      { y: 80, opacity: 0 },
      {
        y: -20,
        opacity: 1,
        ease: "power2.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Efeito Spring (Mola/Elasticidade) nos Polaroids do Capítulo 3
  const springPolaroids = gsap.utils.toArray(".js-anim-spring");
  springPolaroids.forEach((pol) => {
    // Capturar rotação original se houver
    const originalRotation = pol.classList.contains("rotate-3") ? 3 : 
                             pol.classList.contains("-rotate-3") ? -3 : 
                             pol.classList.contains("-rotate-2") ? -2 : 0;
                             
    gsap.fromTo(pol,
      { 
        opacity: 0, 
        scale: 0.75, 
        rotation: originalRotation - 12 
      },
      {
        opacity: 1,
        scale: 1,
        rotation: originalRotation,
        duration: 1.6,
        ease: "back.out(1.8)", // Efeito mola super premium
        scrollTrigger: {
          trigger: pol,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Stagger vertical clássico para fechar o capítulo
  const staggerUpItems = gsap.utils.toArray(".js-anim-stagger-up");
  if (staggerUpItems.length > 0) {
    gsap.fromTo(staggerUpItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2, // Intervalo entre cada elemento
        ease: "power3.out",
        scrollTrigger: {
          trigger: staggerUpItems[0], // Dispara com base no primeiro elemento
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}

/**
 * 5. FOOTER - Revelação final e Batimento Cardíaco do Ícone
 */
function initFooterAnimations() {
  const footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#footer",
      start: "top 75%", // Dispara quando o topo do footer alcança 75% da tela
      toggleActions: "play none none none"
    }
  });

  footerTl
    // Revelar o ícone do coração
    .to("#footer-heart", {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: "back.out(2)"
    })
    // Revelar a mensagem de encerramento
    .to("#footer-message", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.6")
    // Revelar a data
    .to("#footer-date", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

  // Iniciar animação infinita de batimento cardíaco (Heartbeat) no coração após a revelação
  gsap.to("#footer-heart svg", {
    scale: 1.15,
    repeat: -1, // Repetição infinita
    yoyo: true,  // Vai e volta
    duration: 0.6,
    ease: "power1.inOut",
    delay: 1.0 // Inicia após a revelação do footer terminar
  });
}
