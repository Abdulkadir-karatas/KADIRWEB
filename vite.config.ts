import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force a single Three.js instance across @react-three/fiber, @react-three/drei
    // and our direct import — prevents the "Multiple instances of Three.js" warning
    // which can cause Box3 and other cross-module operations to behave incorrectly.
    dedupe: ['three'],
  },
})
