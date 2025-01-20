// src/domain/ImageProjection.js

export class ImageProjection {
  constructor(imageURL) {
    this.imageURL = imageURL;
    this.isApplied = false;
  }
  markAsApplied() {
    this.isApplied = true;
  }
}
