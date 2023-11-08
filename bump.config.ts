import { defineConfig } from 'bumpp'

export default defineConfig({
  files: ['package.json', 'package-lock.json', 'packages/**/package.json', 'apps/learning-space/package.json', 'apps/teaching-space/package.json'],
})
