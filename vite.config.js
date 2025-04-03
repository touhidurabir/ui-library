import path from 'path';
import vue from '@vitejs/plugin-vue';

export default {
  base: process.env.PKP_DOCS_VERSION
    ? '/dev/ui-library/' + process.env.PKP_DOCS_VERSION
    : '/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@sciflow': path.resolve(__dirname, 'node_modules/@sciflow'),
      '@sciflow/ui': path.resolve(__dirname, 'node_modules/@sciflow/ui'),
      '@angular/common/http': path.resolve(__dirname, 'node_modules/@angular/common/fesm2022/http.mjs'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    mainFields: ['module', 'main'],
    conditions: ['module', 'import', 'default'],
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/common/http',
      '@angular/forms',
      '@angular/elements',
      '@angular/compiler',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@sciflow/ui',
      '@sciflow/editor', // Added
      '@json-editor/json-editor',
      '@angular/cdk',
    ],
    exclude: [],
  },
  build: {
    rollupOptions: {
      output: {
        globals: {
          '@angular/core': 'ngCore',
          '@angular/common': 'ngCommon',
          '@angular/common/http': 'ngHttp',
          '@angular/forms': 'ngForms',
          '@angular/elements': 'ngElements',
          '@angular/compiler': 'ngCompiler',
          '@angular/platform-browser': 'ngPlatformBrowser',
          '@angular/platform-browser-dynamic': 'ngPlatformBrowserDynamic',
          '@json-editor/json-editor': 'jsonEditor',
          '@sciflow/editor': 'sciflowEditor',
          '@sciflow/schema': 'sciflowSchema',
        },
      },
    },
    // Removed external
  },
};
