import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/vue-accounts-form/', // заменить на имя репозитория
  server: {
    port: 3000,
  },
});
