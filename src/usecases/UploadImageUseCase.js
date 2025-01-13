// src/usecases/UploadImageUseCase.js

import { ImageProjection } from "../domain/ImageProjection.js";

export class UploadImageUseCase {
  /**
   * @param {Object} deps
   * @param {function(imageFile: File): Promise<ImageProjection>} deps.createImageProjection
   * @param {function(projection: ImageProjection): void} deps.applyProjection
   */
  constructor({ createImageProjection, applyProjection }) {
    this.createImageProjection = createImageProjection;
    this.applyProjection = applyProjection;
  }

  /**
   * 실행 함수
   */
  async execute(imageFile) {
    if (!imageFile) return;

    // 1) 도메인 객체 생성 or 변환
    const projection = await this.createImageProjection(imageFile);

    // 2) 실제 Three.js등을 통해 화면에 적용
    this.applyProjection(projection);

    // 3) 엔티티 상태 갱신
    projection.markAsApplied();
  }
}
