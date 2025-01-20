// src/usecases/GenerateImageUseCase.js

import { ImageProjection } from "../domain/ImageProjection.js";

export class GenerateImageUseCase {
  /**
   * @param {Object} deps
   * @param {function(prompt: string): Promise<ImageProjection>} deps.generateProjection
   * @param {function(projection: ImageProjection): void} deps.applyProjection
   */
  constructor({ generateProjection, applyProjection }) {
    this.generateProjection = generateProjection;
    this.applyProjection = applyProjection;
  }

  async execute(prompt) {
    if (!prompt) return;
    
    // 백엔드 API를 통해 이미지 DataURL을 받아서 도메인 객체 생성
    const projection = await this.generateProjection(prompt);
    
    // Three.js에 적용
    this.applyProjection(projection);
    projection.markAsApplied();
  }
}
