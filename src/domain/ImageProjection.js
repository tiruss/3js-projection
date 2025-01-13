// src/domain/ImageProjection.js

/** 
 * ImageProjection
 * - 역투영과 관련된 핵심 속성·로직을 담는 도메인 엔티티 예시
 */
export class ImageProjection {
    constructor(imageURL) {
      this.imageURL = imageURL;        // 업로드된 이미지 URL (DataURL 등)
      this.isApplied = false;          // 텍스처가 객체에 적용되었는지
    }
  
    markAsApplied() {
      this.isApplied = true;
    }
  }
  