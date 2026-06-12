/* -------------------------------------------------------------
   Lógica de Animações Poéticas com GSAP e ScrollTrigger
   Diretor de Arte Criativo & Desenvolvedor Astro/GSAP Sênior
   ------------------------------------------------------------- */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização sequencial dos ecossistemas de animação
  initHeroTextAlignment();
  initDevVetCoexistence();
  initCodeHeartbeatDualism();
  initFooterBlurReveal();
});

/**
 * 1. HERO - "A Teoria da Relatividade dos Encontros"
 * Intenção Poética: Letras caóticas espalhadas que, sob a força da gravidade do afeto,
 * encontram seu lugar exato para revelar a mensagem existencial de Engenheiros + Marisa.
 */
function initHeroTextAlignment() {
  const heroTitle = document.getElementById("hero-title");
  
  if (heroTitle) {
    const text = heroTitle.textContent.replace(/\s+/g, ' ').trim();
    heroTitle.innerHTML = ""; // Limpar para preenchimento dinâmico
    
    // Divide o texto em palavras e depois em caracteres individuais
    const words = text.split(" ");
    words.forEach((word) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.className = "word-wrapper mr-[0.25em] inline-block"; // Mantém palavras unidas para responsividade
      
      for (let char of word) {
        const charSpan = document.createElement("span");
        charSpan.className = "js-anim-reveal-letter inline-block";
        charSpan.textContent = char;
        wordWrapper.appendChild(charSpan);
      }
      
      heroTitle.appendChild(wordWrapper);
    });
  }

  // Capturar todos os caracteres gerados
  const letters = document.querySelectorAll(".js-anim-reveal-letter");
  
  // Linha do tempo do Hero
  const heroTl = gsap.timeline();

  // Injetar caos inicial (espalhamento cósmico de letras)
  gsap.set(letters, {
    opacity: 0,
    x: () => gsap.utils.random(-80, 80),
    y: () => gsap.utils.random(-60, 60),
    rotation: () => gsap.utils.random(-30, 30),
    scale: 0.8
  });

  heroTl
    // Revelar o subtítulo da teoria
    .to("#hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power3.out"
    })
    // Alinhar as letras em sua posição geométrica perfeita
    .to(letters, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 2.2,
      stagger: {
        each: 0.012,
        from: "random" // Alinhamento estocástico/orgânico
      },
      ease: "power4.out"
    }, "-=0.6")
    // Mostrar a linha de console final (Dev/Vet)
    .to("#hero-lead", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power2.out"
    }, "-=1.0")
    // Trazer o indicador de scroll sutil
    .to("#hero-scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

  // Rolar suavemente ao clicar no indicador de scroll
  const scrollIndicator = document.getElementById("hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const target = document.getElementById("secao1");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/**
 * 2. SEÇÃO 1 - "Sistemas Vivos & Algoritmos Afetivos"
 * Intenção Poética: Conforme o usuário faz o scroll, a rigidez do código de desenvolvimento (IDE)
 * vai esmaecendo e se desintegrando, enquanto as curvas botânicas, os batimentos cardíacos
 * e as fotos da história com ela (MedVet) surgem, mostrando que a vida orgânica cura a lógica.
 */
function initDevVetCoexistence() {
  const ideWindow = document.querySelector(".bg-\\[\\#2C3E2B\\]"); // Caixa da IDE
  const codeLines = document.querySelectorAll(".bg-\\[\\#2C3E2B\\] p"); // Linhas de código
  
  // Desintegração das linhas de código no scroll
  gsap.fromTo(codeLines, 
    { opacity: 1, x: 0 },
    {
      opacity: 0.25,
      x: -15,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ideWindow,
        start: "top 30%",
        end: "bottom 30%",
        scrub: true
      }
    }
  );

  // Efeito de escrita do traço SVG de batimento cardíaco / folha
  gsap.to(".svg-leaf-path", {
    strokeDashoffset: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".svg-leaf-path",
      start: "top 80%",
      end: "bottom 50%",
      scrub: true
    }
  });

  // Revelação estocástica das imagens na Seção 1
  const leftPics = gsap.utils.toArray(".js-anim-stagger-left");
  leftPics.forEach((pic) => {
    gsap.fromTo(pic, 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pic,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  const rightPics = gsap.utils.toArray(".js-anim-stagger-right");
  rightPics.forEach((pic) => {
    gsap.fromTo(pic, 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pic,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Revelação de fade simples para as fotos maiores de proporção 16:9
  const fadePics = gsap.utils.toArray(".js-anim-fade");
  fadePics.forEach((pic) => {
    gsap.fromTo(pic,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pic,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/**
 * 3. SEÇÃO 2 - "Linhas Retas & Pulsações Imperfeitas"
 * Intenção Poética: Transição de cores reflete a passagem da Lógica fria para o Calor Biológico.
 * Os elementos de Lógica (Dev) entram em trajetórias ortogonais secas de 90° e bordas retas.
 * Os elementos de Vida (Vet) entram simulando a expansão e a sístole/diástole cardíaca.
 */
function initCodeHeartbeatDualism() {
  const container = document.getElementById("secao2-container");
  
  if (!container) return;

  // 1. Transição cromática do fundo de verde-musgo para marrom terracota
  gsap.to(container, {
    backgroundColor: "#A65B43", // color-terra (calor biológico do sangue)
    scrollTrigger: {
      trigger: container,
      start: "top 50%",
      end: "bottom 30%",
      scrub: true
    }
  });

  // 2. Animação de Lógica (Programação): Movimento retilíneo perfeitamente reto
  const rectItems = gsap.utils.toArray(".js-anim-rectilinear");
  rectItems.forEach((item) => {
    gsap.fromTo(item,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power1.out", // Curva de aceleração matemática linear/seca
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 3. Animação de Vida (Veterinária): Pulsação Cardíaca (Sístole/Diástole)
  const heartbeatItems = gsap.utils.toArray(".js-anim-heartbeat-reveal");
  heartbeatItems.forEach((item) => {
    
    // Animação de entrada síncrona
    gsap.fromTo(item,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(2)", // Expande e contrai ligeiramente no fim, simulando batida
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => {
            // Executa uma dupla micro-pulsação ao surgir na tela
            const pulseTl = gsap.timeline();
            pulseTl
              .to(item, { scale: 1.05, duration: 0.12, ease: "power1.out" })
              .to(item, { scale: 0.98, duration: 0.1, ease: "power1.in" })
              .to(item, { scale: 1.03, duration: 0.1, ease: "power1.out" })
              .to(item, { scale: 1, duration: 0.15, ease: "power1.inOut" });
          }
        }
      }
    );

    // Efeito sutil de batimento contínuo infinito de baixa intensidade (pulso de vida)
    gsap.to(item, {
      scale: 1.015,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: () => gsap.utils.random(0, 1) // Dessincroniza os batimentos das fotos para parecer orgânico
    });
  });
}


/**
 * 5. FOOTER - "Compilado com Sucesso"
 * Intenção Poética: Retorno à paz do papel limpo, revelando a assinatura do projeto
 * com um efeito sutil de foco desfazendo o desfoque inicial.
 */
function initFooterBlurReveal() {
  const reveals = gsap.utils.toArray(".js-anim-blur-reveal");
  
  reveals.forEach((el) => {
    gsap.fromTo(el,
      { 
        opacity: 0,
        filter: "blur(20px)" // Desfoque inicial profundo
      },
      {
        opacity: 1,
        filter: "blur(0px)", // Foco progressivo
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#footer",
          start: "top 60%", // Dispara quando o footer entra na tela
          toggleActions: "play none none none"
        }
      }
    );
  });
}
