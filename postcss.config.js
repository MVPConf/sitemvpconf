// Tailwind 4 config: usar import explícito do plugin PostCSS
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss, autoprefixer]
};
