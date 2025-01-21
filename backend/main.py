from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import base64
import io
from diffusers import StableDiffusionPipeline
import torch

# 파이프라인 초기화 (최초 1회 실행)
device = "cuda" if torch.cuda.is_available() else "cpu"
model_id = "runwayml/stable-diffusion-v1-5"

pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    use_safetensors=True
).to(device)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
    negative_prompt: str = None  # 옵션: 부정 프롬프트
    steps: int = 50              # 옵션: 추론 스텝 수

@app.post("/generate")
async def generate_image(request: PromptRequest):
    if not request.prompt:
        raise HTTPException(400, "Prompt required")

    try:
        # 이미지 생성 실행
        image = pipe(
            prompt=request.prompt,
            negative_prompt=request.negative_prompt,
            num_inference_steps=request.steps,
            guidance_scale=7.5
        ).images[0]

        # Base64 인코딩
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return {"image": f"data:image/png;base64,{img_str}"}

    except Exception as e:
        raise HTTPException(500, f"Generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)