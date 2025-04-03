// editor-wrapper.js
export async function initializeEditor() {
  console.log('Initializing editor...');

  await pkp.loadAngularDependencies();

  const { createCustomElement } = window.ngElements;
  const { EditorComponent } = window.sciflowUI;
  const { platform } = window.ngPlatformBrowserDynamic;

  if (!EditorComponent) {
    throw new Error('EditorComponent not found in window.sciflowUI');
  }

  if (!customElements.get('sfo-editor')) {
    const editorElement = createCustomElement(EditorComponent, {
      injector: platform.injector,
    });
    customElements.define('sfo-editor', editorElement);
    console.log('Custom element sfo-editor registered successfully');
  } else {
    console.log('Custom element sfo-editor already registered');
  }

  return true;
}