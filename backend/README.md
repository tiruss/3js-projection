# Stable Diffusion FastAPI Server

Quickly generate images using Stable Diffusion via a REST API.

## Prerequisites

- Python 3.7+
- Hugging Face Account (Access token required for model download)
- GPU recommended

## Installation

1. Clone this repository
2. Install dependencies:
```bash
pip install fastapi uvicorn torch diffusers python-multipart pydantic
```
3. Authenticate with Hugging Face:
```bash
huggingface-cli login
```

## Usage
1. Start the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

2. Send POST request to **/generate**:
```bash
curl -X POST "http://localhost:8000/generate" \
-H "Content-Type: application/json" \
-d '{"prompt": "a futuristic cityscape"}'
```

## API Endpoint
**POST /generate**
* Request body:
```json
{
  "prompt": "string",
  "negative_prompt": "string (optional)",
  "steps": "integer (optional, default 50)"
}
```
* Returns: Base64-encoded PNG image

## Notes
* First run will download ~5GB model files
* Add `--workers 1` to uvicorn command for production
* GPU with 8+ GB VRAM recommended for best performance

