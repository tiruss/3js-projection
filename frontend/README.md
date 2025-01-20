# Three.js Reverse Projection with Shader Lighting

This project demonstrates reverse projection mapping onto a 3D object using **Three.js**. It implements a shader-based lighting model with vertex and fragment shaders, which are managed as separate `.glsl` files.

---

## Features

- **Reverse Projection Mapping**: Projects an uploaded image onto the surface of a 3D object (box geometry) using reverse projection.
- **Custom Shader Implementation**:
  - Vertex and Fragment shaders are written in `.glsl` files.
  - Implements Lambertian diffuse lighting.
- **Modular Architecture**:
  - Follows principles of clean/layered architecture.
  - Separates concerns into domain, use cases, adapters, and shaders.
- **Responsive Renderer**: Automatically adjusts the canvas size when the browser window is resized.

---

## Project Structure

```
my-threejs-project/
 ┣ index.html                # Entry point with the file upload UI
 ┣ src/
 ┃ ┣ shaders/               # Shader files (GLSL)
 ┃ ┃ ┣ vertexShader.glsl    # Vertex shader
 ┃ ┃ ┗ fragmentShader.glsl  # Fragment shader
 ┃ ┣ domain/                # Core domain logic
 ┃ ┃ ┗ ImageProjection.js   # ImageProjection domain entity
 ┃ ┣ usecases/              # Application use cases
 ┃ ┃ ┗ UploadImageUseCase.js # Use case for uploading and applying image projection
 ┃ ┣ adapters/              # Adapters for frameworks and external tools
 ┃ ┃ ┣ ThreeJsAdapter.js    # Handles Three.js-specific logic
 ┃ ┃ ┗ DOMAdapter.js        # Handles DOM and file input logic
 ┃ ┗ main.js                # Application entry point
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd my-threejs-project
   ```

2. **Install Dependencies**:
   If you plan to use a bundler (e.g., Webpack or Vite), set it up as described in the configuration section below.

3. **Start a Local Server**:
   Use any local server to serve the `index.html` file. For example, with Python:
   ```bash
   python -m http.server 8080
   ```

4. **Open the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:8080/
   ```

---

## Development

### Adding New Shaders

1. Write your shader code in `.glsl` files under the `src/shaders/` directory.
2. Import the shaders in `ThreeJsAdapter.js`:
   ```javascript
   import vertexShader from "../shaders/vertexShader.glsl";
   import fragmentShader from "../shaders/fragmentShader.glsl";
   ```
3. Use them in the `ShaderMaterial` configuration:
   ```javascript
   this.shaderMaterial = new THREE.ShaderMaterial({
     vertexShader,
     fragmentShader,
     uniforms: { ... },
   });
   ```

### Bundler Configuration

#### Webpack

1. Install the `raw-loader` package:
   ```bash
   npm install raw-loader --save-dev
   ```

2. Update `webpack.config.js`:
   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.glsl$/,
           use: "raw-loader",
         },
       ],
     },
   };
   ```

#### Vite

1. Configure `vite.config.js`:
   ```javascript
   import { defineConfig } from "vite";

   export default defineConfig({
     esbuild: {
       loader: "text",
       include: /\.glsl$/,
     },
   });
   ```

---

## Example Screenshots

### Initial Scene

The application starts with a 3D box and a grid helper:

![Initial Scene](screenshot-initial.png)

### Reverse Projection

After uploading an image, it is projected onto the box:

![Reverse Projection](screenshot-projection.png)

---

## Future Enhancements

- Add support for multiple geometries.
- Implement drag-and-drop for image upload.
- Add specular and ambient lighting effects.
- Support for texture scaling and transformation.

---

## License

This project is licensed under the MIT License.
