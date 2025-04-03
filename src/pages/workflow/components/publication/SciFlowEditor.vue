<template>
    <div class="editorPanel">
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="!isEditorReady" class="loading-message">Loading editor...</div>
      <div v-else>
        <sfo-editor>
          <h1 data-type="abstract">Abstract</h1>
          <p>Power your CMS with a modern academic editing experience.</p>
        </sfo-editor>
      </div>
    </div>
</template>
  
<script setup>
  import { onMounted, ref } from 'vue';
  import { initializeEditor } from './editor-wrapper.js';
  
  const isEditorReady = ref(false);
  const error = ref(null);
  
  async function loadEditorScripts() {
    try {
      console.log('Starting editor initialization...');
      await initializeEditor();
      await customElements.whenDefined('sfo-editor');
      console.log('Editor is ready');
      isEditorReady.value = true;
  
      setTimeout(() => {
        const editor = document.querySelector('sfo-editor');
        if (editor) {
          editor.addEventListener('document', (event) => {
            const doc = event.detail?.toJSON();
            console.log('[Editor Component] Document changed', { doc });
          });
        }
      }, 0);
    } catch (err) {
      console.error('Failed to load editor:', err);
      error.value = err.message;
    }
  }
  
  onMounted(async () => {
    // Add a small delay to ensure Angular dependencies are fully loaded
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadEditorScripts();
  });
</script>
  
<style>
  /* Same styles as WorkflowPublicationEditor.vue */
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://unpkg.com/basscss@8.0.2/css/basscss.min.css');
  
  .editorPanel {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
  
  .error-message {
    color: red;
    padding: 1rem;
    background: #ffebee;
    border-radius: 4px;
    margin: 1rem 0;
  }
  
  .loading-message {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  sfo-editor {
    display: block;
    border-radius: 0.5rem;
    padding: 2rem;
  }
  
  /* Add your existing Material Design and ProseMirror styles here */
</style>