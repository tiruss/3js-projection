// src/main.js

import { ThreeJsAdapter } from "./adapters/ThreeJsAdapter.js";
import { DOMAdapter } from "./adapters/DOMAdapter.js";
import { GenerateImageUseCase } from "./usecases/GenerateImageUseCase.js";
import { ImageProjection } from "./domain/ImageProjection.js";

// 백엔드 API 호출 함수 (FastAPI로 요청)
async function generateProjectionFromBackend(prompt) {
  try {
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    if (!response.ok) {
      throw new Error("Backend API 호출 실패");
    }
    const data = await response.json();
    return new ImageProjection(data.image);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function applyProjection(projection) {
  threeAdapter.applyImageProjection(projection);
}

// 초기화
const threeAdapter = new ThreeJsAdapter();
threeAdapter.attachToDOM(document.body);
threeAdapter.animate();

const domAdapter = new DOMAdapter({ uploadInputId: "upload", promptFormId: "promptForm" });
domAdapter.init();

const generateImageUseCase = new GenerateImageUseCase({
  generateProjection: generateProjectionFromBackend,
  applyProjection: applyProjection
});

// 텍스트 프롬프트 제출 이벤트 연결
domAdapter.setPromptSubmitCallback((prompt) => {
  generateImageUseCase.execute(prompt);
});

// (선택 사항) 파일 업로드 이벤트 연결 (이미 기존 예제와 동일)
