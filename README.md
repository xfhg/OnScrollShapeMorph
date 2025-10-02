# On-Scroll Shape Morph (Nuxt)

This repository provides a Nuxt drop-in component that recreates the Codrops “On-Scroll Shape Morph” demo using modern Vue composition patterns together with GSAP, ScrollTrigger, Lenis smooth scrolling and Splitting for the staggered text animations.

![On-Scroll Shape Morph](https://tympanus.net/codrops/wp-content/uploads/2023/11/ShapeMorph-1.jpg)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the example page (`pages/index.vue`) that mounts the `<ScrollMorph />` component.

## Using the component in another Nuxt app

1. Copy `components/ScrollMorph.vue` and the `assets/css/base.css` stylesheet into your project.
2. Add the CSS file (and `splitting/dist/splitting.css`) to the `css` array of your `nuxt.config`.
3. Ensure the static assets from `public/img` and `public/fonts` are available (or adjust the image/font paths to your own assets).
4. Install the required dependencies from `./package.json`

5. Drop `<ScrollMorph />` into any page to enable the effect.

## Credits

- Original concept and assets by [Codrops](https://tympanus.net/).
- Images generated with [Midjourney](https://midjourney.com).

## License

[MIT](LICENSE)
