import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babelMacros from 'vite-plugin-babel-macros';

export default defineConfig({
	plugins: [react(), babelMacros()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true
			}
		}
	}
});