<template>
  <main ref="rootEl">
    <div class="frame">
      <h1 class="frame__title">On-Scroll Shape Morph</h1>
      <a class="frame__back" href="https://tympanus.net/codrops/?p=74333" target="_blank" rel="noopener">Back to the article</a>
      <a class="frame__prev" href="https://tympanus.net/codrops/demos/" target="_blank" rel="noopener">All demos</a>
    </div>

    <div class="intro">
      <div id="item-intro" class="content content--intro">
        <div class="content__img-wrap">
          <div class="content__img content__img--1">
            <div class="content__img-inner" :style="{ backgroundImage: `url(${assets.intro.primary})` }"></div>
          </div>
        </div>
      </div>
      <h1 class="intro__title">
        <span class="intro__title-pre">Xtynct</span>
      </h1>
      <span class="intro__info">Scroll moderately for a better animation experience.</span>
    </div>

    <div class="content-wrap">
      <section
        v-for="section in sections"
        :key="section.id"
        class="content"
        :id="section.id"
      >
        <div class="content__img-wrap">
          <div class="content__img" :class="section.image.className">
            <div
              class="content__img-inner"
              :style="{ backgroundImage: `url(${section.image.primary})` }"
            ></div>
            <div
              v-if="section.image.secondary"
              class="content__img-inner content__img-inner--hidden"
              :style="{ backgroundImage: `url(${section.image.secondary})` }"
            ></div>
          </div>
        </div>
        <p class="content__text" :class="section.text.className">
          <span
            v-for="(line, lineIdx) in section.text.lines"
            :key="lineIdx"
            :class="line.className"
            :data-splitting="line.splitting ? '' : null"
          >{{ line.text }}</span>
        </p>
      </section>
    </div>

    <div class="content">
      <h2 class="content__title">More you might like</h2>
      <div class="card-wrap">
        <article v-for="card in cards" :key="card.href" class="card">
          <a :href="card.href" class="card__image" target="_blank" rel="noopener" :style="{ backgroundImage: `url(${card.image})` }"></a>
          <p class="card__title">
            <a :href="card.href" target="_blank" rel="noopener">{{ card.label }}</a>
          </p>
        </article>
      </div>
    </div>

    <p class="credits">Made by <a href="https://twitter.com/codrops" target="_blank" rel="noopener">@codrops</a></p>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface TextLine {
  text: string;
  className?: string;
  splitting?: boolean;
}

interface SectionContent {
  id: string;
  image: {
    className: string;
    primary: string;
    secondary?: string;
  };
  text: {
    className: string;
    lines: TextLine[];
  };
}

interface CardLink {
  href: string;
  label: string;
  image: string;
}

const rootEl = ref<HTMLElement | null>(null);

const assets = {
  intro: {
    primary: '/img/1.jpg'
  }
};

const sections: SectionContent[] = [
  {
    id: 'item-1',
    image: {
      className: 'content__img--1',
      primary: '/img/4.jpg',
      secondary: '/img/3.jpg'
    },
    text: {
      className: 'content__text--center content__text--large',
      lines: [
        { text: 'Obey the silence', splitting: true },
        { text: 'Rebel in shadows', splitting: true }
      ]
    }
  },
  {
    id: 'item-2',
    image: {
      className: 'content__img--1',
      primary: '/img/5.jpg',
      secondary: '/img/6.jpg'
    },
    text: {
      className: 'content__text--left',
      lines: [
        { text: 'From Thrones to Chains' },
        { text: 'Surrender of Sovereignty' }
      ]
    }
  },
  {
    id: 'item-3',
    image: {
      className: 'content__img--2',
      primary: '/img/7.jpg',
      secondary: '/img/8.jpg'
    },
    text: {
      className: 'content__text--left',
      lines: [
        { text: 'You make me dream ' },
        { text: 'Your dreams' },
        {
          text:
            "Do you ever dream of a dream so real it makes you question reality? What is reality? Do you question it? Turn off the light switch. Does it turn off? Question right now: is it a dream? You always wake up once you realize it's a dream. So, don't wake up. Realize it's a dream. That's how you enter the real world.",
          className: 'content__text-tiny'
        }
      ]
    }
  },
  {
    id: 'item-4',
    image: {
      className: 'content__img--4',
      primary: '/img/9.jpg',
      secondary: '/img/10.jpg'
    },
    text: {
      className: 'content__text--center',
      lines: [
        { text: 'Your Willingness is' },
        { text: 'Collective Triumph' }
      ]
    }
  },
  {
    id: 'item-5',
    image: {
      className: 'content__img--5',
      primary: '/img/16.jpg',
      secondary: '/img/15.jpg'
    },
    text: {
      className: 'content__text--left',
      lines: [
        { text: 'Controlling my feelings' },
        { text: 'for too long' }
      ]
    }
  },
  {
    id: 'item-6',
    image: {
      className: 'content__img--6',
      primary: '/img/17.jpg'
    },
    text: {
      className: 'content__text--center',
      lines: [
        { text: 'You were never truly loved' },
        { text: 'You have only been betrayed' }
      ]
    }
  }
];

const cards: CardLink[] = [
  {
    href: 'https://tympanus.net/Development/OnScrollColumnsRows/',
    label: 'On-Scroll Column & Row Animations',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2023/08/OnScrollColumns.jpg'
  },
  {
    href: 'http://tympanus.net/Development/Scroll3DGrid/',
    label: 'On-Scroll Perspective Grid Animations',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2023/08/onscroll3dgrid.jpg'
  },
  {
    href: 'http://tympanus.net/Development/OnScrollFilter/',
    label: 'On-Scroll SVG Filter Effect',
    image: 'https://tympanus.net/codrops/wp-content/uploads/2023/07/onscrollfilter_feat-2.jpg'
  }
];

interface ScrollSettings {
  clipPaths?: {
    step1: { initial: string; final: string };
    step2?: { initial: string; final: string };
  };
  scrollTrigger?: ScrollTrigger.Vars;
  perspective?: number | false;
}

interface ScrollItem {
  id: string;
  animationProfile: (element: HTMLElement, options?: ScrollSettings) => gsap.core.Timeline;
  options?: ScrollSettings;
  interactiveTilt?: boolean;
}

type LenisInstance = InstanceType<typeof Lenis>;

let lenisInstance: LenisInstance | null = null;
let splittingInstance: (typeof import('splitting'))['default'] | null = null;
let lenisRaf = 0;
const timelines: gsap.core.Timeline[] = [];
const tilts: InteractiveTilt[] = [];
let resizeHandler: (() => void) | null = null;
let mouseHandler: ((event: MouseEvent) => void) | null = null;

interface Vec2 {
  x: number;
  y: number;
}

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const map = (x: number, a: number, b: number, c: number, d: number) => (x - a) * (d - c) / (b - a) + c;

const calcWinsize = (): Vec2 => ({
  x: window.innerWidth,
  y: window.innerHeight
});

const ensureSplitting = async () => {
  if (!splittingInstance) {
    const module = await import('splitting');
    splittingInstance = module.default;
  }
};

let winsize: Vec2;
let cursor: Vec2;

class InteractiveTilt {
  private readonly defaults = {
    perspective: 800,
    valuesFromTo: {
      x: [-35, 35],
      y: [-35, 35],
      rx: [-18, 18],
      ry: [-10, 10],
      rz: [-4, 4]
    },
    amt: 0.1
  };

  private readonly DOM: { el: HTMLElement; wrapEl: HTMLElement };
  private readonly options: typeof this.defaults;
  private imgTransforms = { x: 0, y: 0, rx: 0, ry: 0, rz: 0 };
  private rafId = 0;

  constructor(element: HTMLElement, options: Partial<typeof this.defaults> = {}) {
    this.options = Object.assign({}, this.defaults, options);
    const wrap = element.querySelector<HTMLElement>('.content__img-wrap');
    if (!wrap) {
      throw new Error('InteractiveTilt requires an element with .content__img-wrap');
    }
    this.DOM = { el: element, wrapEl: wrap };

    if (this.options.perspective) {
      this.DOM.el.style.perspective = `${this.options.perspective}px`;
    }

    this.render = this.render.bind(this);
    this.rafId = requestAnimationFrame(this.render);
  }

  private render() {
    this.imgTransforms.x = lerp(this.imgTransforms.x, map(cursor.x, 0, winsize.x, this.options.valuesFromTo.x[0], this.options.valuesFromTo.x[1]), this.options.amt);
    this.imgTransforms.y = lerp(this.imgTransforms.y, map(cursor.y, 0, winsize.y, this.options.valuesFromTo.y[0], this.options.valuesFromTo.y[1]), this.options.amt);
    this.imgTransforms.rz = lerp(this.imgTransforms.rz, map(cursor.x, 0, winsize.x, this.options.valuesFromTo.rz[0], this.options.valuesFromTo.rz[1]), this.options.amt);

    if (this.options.perspective) {
      this.imgTransforms.rx = lerp(this.imgTransforms.rx, map(cursor.y, 0, winsize.y, this.options.valuesFromTo.rx[0], this.options.valuesFromTo.rx[1]), this.options.amt);
      this.imgTransforms.ry = lerp(this.imgTransforms.ry, map(cursor.x, 0, winsize.x, this.options.valuesFromTo.ry[0], this.options.valuesFromTo.ry[1]), this.options.amt);
    } else {
      this.imgTransforms.rx = 0;
      this.imgTransforms.ry = 0;
    }

    this.DOM.wrapEl.style.transform = `translateX(${this.imgTransforms.x}px) translateY(${this.imgTransforms.y}px) rotateX(${this.imgTransforms.rx}deg) rotateY(${this.imgTransforms.ry}deg) rotateZ(${this.imgTransforms.rz}deg)`;
    this.rafId = requestAnimationFrame(this.render);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.DOM.wrapEl.style.transform = '';
    this.DOM.el.style.perspective = '';
  }
}

const preloadImages = (selector: string, context: HTMLElement) => new Promise<void>((resolve) => {
  imagesLoaded(context.querySelectorAll(selector), { background: true }, () => resolve());
});

const prepareTextForAnimation = (itemElement: HTMLElement) => {
  const textSpans = Array.from(itemElement.querySelectorAll<HTMLSpanElement>('.content__text > span'));
  if (!splittingInstance) {
    return [] as HTMLElement[][];
  }
  splittingInstance({ target: textSpans });
  const charsArray = textSpans.map(span => Array.from(span.querySelectorAll<HTMLElement>('.char')));
  charsArray.forEach(charArray => gsap.set(charArray, { opacity: 0 }));
  return charsArray;
};

const setupAnimationDefaults = (itemElement: HTMLElement, options: ScrollSettings = {}): Required<ScrollSettings> => {
  const defaults: Required<ScrollSettings> = {
    clipPaths: {
      step1: {
        initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)'
      },
      step2: {
        initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
        final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }
    },
    scrollTrigger: {
      trigger: itemElement,
      start: 'top 50%',
      end: '+=50%',
      scrub: true
    },
    perspective: false
  };

  return {
    ...defaults,
    ...options,
    clipPaths: { ...defaults.clipPaths, ...options.clipPaths },
    scrollTrigger: { ...defaults.scrollTrigger, ...options.scrollTrigger }
  };
};

const createFx1 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const innerElements = imageElement.querySelectorAll<HTMLElement>('.content__img-inner');
  const charsArray = prepareTextForAnimation(itemElement);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onStart: () => {
      if (settings.perspective && imageElement) {
        gsap.set(imageElement, { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      filter: 'brightness(100%)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      ease: 'sine.in',
      filter: 'brightness(800%)',
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .to(innerElements[0], {
      ease: 'sine.in',
      rotationY: -40,
      scale: 1.4
    }, 0)
    .add(() => {
      innerElements[0]?.classList.toggle('content__img-inner--hidden');
      innerElements[1]?.classList.toggle('content__img-inner--hidden');
    })
    .to(imageElement, {
      startAt: { clipPath: settings.clipPaths.step2?.initial },
      clipPath: settings.clipPaths.step2?.final,
      filter: 'brightness(100%)'
    })
    .to(innerElements[1], {
      startAt: { rotationY: 40, scale: 1.4 },
      rotationY: 0,
      scale: 1
    }, '<')
    .addLabel('texts', '<-=0.3');

  charsArray.forEach((charArray, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    tl.to(charArray, {
      startAt: { opacity: 1, scale: 0.2 },
      opacity: 1,
      scale: 1,
      yPercent: -direction * 40,
      stagger: direction * 0.04
    }, 'texts');
  });

  return tl;
};

const createFx2 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const innerElements = imageElement.querySelectorAll<HTMLElement>('.content__img-inner');
  const charsArray = prepareTextForAnimation(itemElement);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set([imageElement, itemElement], { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      filter: 'brightness(100%) hue-rotate(0deg)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      filter: 'brightness(800%) hue-rotate(90deg)',
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .to(innerElements[0], {
      rotationZ: -5,
      scaleX: 1.8
    }, 0)
    .add(() => {
      innerElements[0]?.classList.toggle('content__img-inner--hidden');
      innerElements[1]?.classList.toggle('content__img-inner--hidden');
    })
    .to(imageElement, {
      startAt: { clipPath: settings.clipPaths.step2?.initial },
      clipPath: settings.clipPaths.step2?.final,
      filter: 'brightness(100%) hue-rotate(0deg)'
    })
    .to(innerElements[1], {
      startAt: { rotationZ: 5, scaleX: 1.8 },
      rotationZ: 0,
      scaleX: 1
    }, '<')
    .addLabel('texts', '<-=0.3');

  charsArray.forEach((charArray, index) => {
    charArray.sort(() => Math.random() - 0.5);
    const direction = index % 2 === 0 ? 1 : -1;
    tl.to(charArray, {
      duration: 0.1,
      opacity: 1,
      stagger: direction * 0.04
    }, 'texts');
  });

  return tl;
};

const createFx3 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const innerElements = imageElement.querySelectorAll<HTMLElement>('.content__img-inner');
  if (innerElements.length < 2) throw new Error('Missing .content__img-inner');
  const text = itemElement.querySelector<HTMLElement>('.content__text');
  if (!text) throw new Error('Missing .content__text');

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set([imageElement, itemElement], { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      scale: 0.3,
      filter: 'brightness(100%) contrast(100%)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      ease: 'sine',
      rotationX: -35,
      rotationY: 35,
      filter: 'brightness(60%) contrast(400%)',
      scale: 0.7,
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .to(innerElements[0], {
      ease: 'sine',
      skewY: 10,
      scaleY: 1.2
    }, 0)
    .add(() => {
      innerElements[0]?.classList.toggle('content__img-inner--hidden');
      innerElements[1]?.classList.toggle('content__img-inner--hidden');
    }, '>')
    .to(imageElement, {
      ease: 'sine.in',
      startAt: { clipPath: settings.clipPaths.step2.initial },
      clipPath: settings.clipPaths.step2.final,
      filter: 'brightness(100%) contrast(100%)',
      scale: 1,
      rotationX: 0,
      rotationY: 0
    }, '<')
    .to(innerElements[1], {
      ease: 'sine.in',
      startAt: { skewY: 10, scaleY: 2 },
      skewY: 0,
      scaleY: 1
    }, '<')
    .fromTo(text, {
      opacity: 0,
      yPercent: 40
    }, {
      opacity: 1,
      yPercent: 0
    }, '>')
    .to(imageElement, {
      ease: 'sine',
      startAt: { filter: 'brightness(100%) contrast(100%) opacity(100%)' },
      filter: 'brightness(60%) contrast(400%) opacity(0%)',
      rotationX: 25,
      rotationY: 2,
      scale: 1.2
    }, '<');

  return tl;
};

const createFx4 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const innerElements = imageElement.querySelectorAll<HTMLElement>('.content__img-inner');
  const charsArray = prepareTextForAnimation(itemElement);

  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set([imageElement, itemElement], { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      filter: 'brightness(100%) grayscale(0%)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      rotationZ: 90,
      scale: 0.6,
      filter: 'brightness(800%) grayscale(100%)',
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .to(innerElements[0], {
      rotationZ: -5,
      scaleX: 1.4
    }, 0)
    .add(() => {
      innerElements[0]?.classList.toggle('content__img-inner--hidden');
      innerElements[1]?.classList.toggle('content__img-inner--hidden');
    })
    .to(imageElement, {
      startAt: { clipPath: settings.clipPaths.step1.final, rotationZ: -90 },
      clipPath: settings.clipPaths.step2?.final,
      filter: 'brightness(100%) grayscale(0%)',
      rotationZ: 0,
      scale: 1
    })
    .to(innerElements[1], {
      startAt: { rotationZ: -350, scaleX: 1.4 },
      rotationZ: -360,
      scaleX: 1
    }, '<')
    .addLabel('texts', '<-=0.3');

  charsArray.forEach((charArray, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    tl.to(charArray, {
      startAt: { opacity: 1, scale: 0.2 },
      opacity: 1,
      scale: 1,
      yPercent: direction * 400,
      stagger: direction * 0.02
    }, 'texts');
  });

  return tl;
};

const createFx5 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const innerElements = imageElement.querySelectorAll<HTMLElement>('.content__img-inner');
  const charsArray = prepareTextForAnimation(itemElement);

  const tl = gsap.timeline({
    defaults: { ease: 'back.out(1.5)' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set([imageElement, itemElement], { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      filter: 'brightness(100%) saturate(100%)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      ease: 'back.in(1.5)',
      rotationZ: 90,
      scale: 0.6,
      filter: 'brightness(300%) saturate(200%)',
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .to(innerElements[0], {
      ease: 'back.in(1.5)',
      scaleX: 1.4
    }, 0)
    .add(() => {
      innerElements[0]?.classList.toggle('content__img-inner--hidden');
      innerElements[1]?.classList.toggle('content__img-inner--hidden');
    })
    .to(imageElement, {
      startAt: { clipPath: settings.clipPaths.step1.final, rotationZ: -90 },
      clipPath: settings.clipPaths.step2?.final,
      filter: 'brightness(100%) saturate(100%)',
      rotationZ: 0,
      scale: 1
    })
    .to(innerElements[1], {
      startAt: { scaleX: 1.4 },
      scaleX: 1
    }, '<')
    .addLabel('texts', '<-=0.3');

  charsArray.forEach((charArray, index) => {
    charArray.sort(() => Math.random() - 0.5);
    const direction = index % 2 === 0 ? 1 : -1;
    tl.fromTo(charArray, {
      opacity: 1,
      transformOrigin: `50% ${direction < 0 ? 100 : 0}%`,
      scaleY: 0
    }, {
      duration: 0.1,
      ease: 'none',
      scaleY: 1,
      stagger: direction * 0.02
    }, 'texts');
  });

  return tl;
};

const createFx6 = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const inner = imageElement.querySelector<HTMLElement>('.content__img-inner');
  const charsArray = prepareTextForAnimation(itemElement);

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set(imageElement, { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      scale: 0.2,
      filter: 'brightness(50%)',
      clipPath: settings.clipPaths.step1.initial,
      transformOrigin: '75% 50%'
    }, {
      scale: 1,
      filter: 'brightness(100%)',
      clipPath: settings.clipPaths.step1.final
    }, 0)
    .fromTo(inner, {
      rotationY: 40,
      scale: 2
    }, {
      rotationY: 0,
      scale: 1
    }, 0);

  charsArray.forEach((charArray, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    tl.fromTo(charArray, {
      opacity: 0,
      scale: 1.2
    }, {
      opacity: 1,
      scale: 1,
      yPercent: direction * 100,
      stagger: direction * -0.02
    }, 0);
  });

  return tl;
};

const createFxIntro = (itemElement: HTMLElement, options?: ScrollSettings) => {
  const settings = setupAnimationDefaults(itemElement, options);
  const imageElement = itemElement.querySelector<HTMLElement>('.content__img');
  if (!imageElement) throw new Error('Missing .content__img');
  const inner = imageElement.querySelector<HTMLElement>('.content__img-inner');

  return gsap.timeline({
    defaults: { ease: 'none' },
    onStart: () => {
      if (settings.perspective) {
        gsap.set(imageElement, { perspective: settings.perspective });
      }
    },
    scrollTrigger: settings.scrollTrigger
  })
    .fromTo(imageElement, {
      scale: 1,
      xPercent: 0,
      filter: 'brightness(100%)',
      clipPath: settings.clipPaths.step1.initial
    }, {
      scale: 0.5,
      xPercent: -50,
      clipPath: settings.clipPaths.step1.final,
      filter: 'brightness(500%)'
    }, 0)
    .to(inner, {
      rotationY: -40,
      scale: 1.4
    }, 0)
    .to(imageElement, {
      startAt: { clipPath: settings.clipPaths.step2?.initial },
      scale: 0,
      xPercent: -100,
      clipPath: settings.clipPaths.step2?.final,
      filter: 'brightness(100%)'
    })
    .to(inner, {
      startAt: { rotationY: 40 },
      rotationY: 0,
      scale: 1
    }, '<');
};

const scroll = (context: HTMLElement) => {
  const items: ScrollItem[] = [
    { id: 'item-1', animationProfile: createFx1, interactiveTilt: true, options: { perspective: 1000 } },
    {
      id: 'item-2',
      animationProfile: createFx2,
      interactiveTilt: true,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            final: 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)'
          },
          step2: {
            initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
            final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }
        },
        scrollTrigger: { start: 'center bottom', end: 'top top' },
        perspective: 500
      }
    },
    {
      id: 'item-3',
      animationProfile: createFx3,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)'
          },
          step2: {
            initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
            final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }
        },
        scrollTrigger: { start: 'center center', end: '+=150%', pin: true },
        perspective: 400
      }
    },
    {
      id: 'item-4',
      animationProfile: createFx4,
      interactiveTilt: true,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            final: 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)'
          },
          step2: {
            initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
            final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }
        },
        scrollTrigger: { start: 'center bottom', end: 'top top-=10%' },
        perspective: 500
      }
    },
    {
      id: 'item-5',
      animationProfile: createFx5,
      interactiveTilt: true,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
            final: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
          },
          step2: {
            initial: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            final: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'
          }
        },
        scrollTrigger: { start: 'top bottom+=20%', end: 'bottom top' },
        perspective: 500
      }
    },
    {
      id: 'item-6',
      animationProfile: createFx6,
      interactiveTilt: true,
      options: {
        clipPaths: {
          step1: {
            initial: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
            final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }
        },
        scrollTrigger: { start: 'center bottom', end: '+=80%' },
        perspective: 1000
      }
    },
    {
      id: 'item-intro',
      animationProfile: createFxIntro,
      interactiveTilt: true,
      options: {
        scrollTrigger: { start: 'clamp(top bottom)', end: 'center top' },
        perspective: 1000
      }
    }
  ];

  items.forEach(item => {
    const element = context.querySelector<HTMLElement>(`#${item.id}`);
    if (!element) {
      console.warn(`Element with ID #${item.id} not found`);
      return;
    }
    const timeline = item.animationProfile(element, item.options);
    timelines.push(timeline);

    if (item.interactiveTilt) {
      try {
        const tilt = new InteractiveTilt(element);
        tilts.push(tilt);
      } catch (error) {
        console.warn(error);
      }
    }
  });
};

const initSmoothScrolling = () => {
  lenisInstance = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenisInstance.on('scroll', () => ScrollTrigger.update());

  const scrollFn = (time: number) => {
    lenisInstance?.raf(time);
    lenisRaf = requestAnimationFrame(scrollFn);
  };

  lenisRaf = requestAnimationFrame(scrollFn);
};

const init = async () => {
  if (!rootEl.value) return;
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
  document.body.classList.add('loading');

  winsize = calcWinsize();
  cursor = { x: winsize.x / 2, y: winsize.y / 2 };

  resizeHandler = () => { winsize = calcWinsize(); };
  mouseHandler = (ev: MouseEvent) => { cursor = { x: ev.clientX, y: ev.clientY }; };

  window.addEventListener('resize', resizeHandler);
  window.addEventListener('mousemove', mouseHandler);

  await preloadImages('.content__img-inner', rootEl.value);
  document.body.classList.remove('loading');

  await ensureSplitting();
  initSmoothScrolling();
  scroll(rootEl.value);
  ScrollTrigger.refresh();
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  document.body.classList.remove('loading');
  document.documentElement.classList.remove('js');

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (mouseHandler) {
    window.removeEventListener('mousemove', mouseHandler);
  }

  cancelAnimationFrame(lenisRaf);
  lenisInstance?.destroy();
  lenisInstance = null;

  timelines.forEach(tl => tl.kill());
  timelines.length = 0;
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  tilts.forEach(tilt => tilt.destroy());
  tilts.length = 0;

  document.documentElement.classList.add('no-js');
});
</script>
