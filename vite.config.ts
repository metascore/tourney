import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import markdown, { Mode } from 'vite-plugin-markdown'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    markdown({
      mode: [Mode.REACT],
    }),
  ],
})
