// src/adapters/DOMAdapter.js

export class DOMAdapter {
  constructor({ uploadInputId, promptFormId }) {
    this.uploadInput = document.getElementById(uploadInputId);
    this.promptForm = document.getElementById(promptFormId);
    this.promptInput = document.getElementById("promptInput");
    this.onFileSelected = null;
    this.onPromptSubmit = null;
  }

  init() {
    if (this.uploadInput) {
      this.uploadInput.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (this.onFileSelected) {
          this.onFileSelected(file);
        }
      });
    }

    if (this.promptForm) {
      this.promptForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const prompt = this.promptInput.value;
        if (prompt && this.onPromptSubmit) {
          this.onPromptSubmit(prompt);
        }
      });
    }
  }

  setFileSelectedCallback(callback) {
    this.onFileSelected = callback;
  }

  setPromptSubmitCallback(callback) {
    this.onPromptSubmit = callback;
  }
}
