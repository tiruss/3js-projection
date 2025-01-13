// src/adapters/DOMAdapter.js

export class DOMAdapter {
    constructor({ uploadInputId }) {
      // 업로드 input 요소
      this.uploadInput = document.getElementById(uploadInputId);
      this.onFileSelected = null; // 콜백
    }
  
    init() {
      // 파일 업로드 이벤트 바인딩
      this.uploadInput.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
  
        // 파일이 선택되면 콜백을 호출
        if (this.onFileSelected) {
          this.onFileSelected(file);
        }
      });
    }
  
    /**
     * 파일 업로드 콜백 등록
     * @param {function(File)} callback
     */
    setFileSelectedCallback(callback) {
      this.onFileSelected = callback;
    }
  }
  