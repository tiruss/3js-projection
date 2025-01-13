// src/main.js

import { ThreeJsAdapter } from "./adapters/ThreeJsAdapter.js";
import { DOMAdapter } from "./adapters/DOMAdapter.js";
import { UploadImageUseCase } from "./usecases/UploadImageUseCase.js";
import { ImageProjection } from "./domain/ImageProjection.js";

/**
 * 이미지 파일을 받아서 ImageProjection 엔티티를 생성해주는 함수
 * @param {File} imageFile
 * @returns {Promise<ImageProjection>}
 */
async function createImageProjection(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageURL = e.target.result; // dataURL
      // 도메인 객체 생성
      const projection = new ImageProjection(imageURL);
      resolve(projection);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(imageFile);
  });
}

/**
 * Three.js에 Projection을 적용하는 함수
 * @param {ImageProjection} projection
 */
function applyProjection(projection) {
  // threeAdapter는 main.js 스코프에 존재 → 함수 내부에서 참조
  threeAdapter.applyImageProjection(projection);
}

// -------------------------------------------
// 1) Adapter, UseCase, DOM 초기화
// -------------------------------------------
const threeAdapter = new ThreeJsAdapter();
threeAdapter.attachToDOM(document.body);
threeAdapter.animate();

const domAdapter = new DOMAdapter({ uploadInputId: "upload" });
domAdapter.init();

// 유스케이스 생성: "이미지 업로드 → ImageProjection 생성 → Three.js에 적용"
const uploadImageUseCase = new UploadImageUseCase({
  createImageProjection,
  applyProjection,
});

// -------------------------------------------
// 2) DOM → 유스케이스 연결
// -------------------------------------------
domAdapter.setFileSelectedCallback((file) => {
  uploadImageUseCase.execute(file);
});
