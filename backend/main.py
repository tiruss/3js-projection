# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import base64
import io
from PIL import Image, ImageDraw, ImageFont

app = FastAPI()

# 프론트엔드에서 호출할 수 있도록 CORS 설정 (모든 도메인 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_image(request: PromptRequest):
    prompt = request.prompt
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is missing.")

    # 실제 이미지 디퓨전 모델 대신 간단한 PIL 예시로 이미지를 생성합니다.
    img = Image.new("RGB", (256, 256), color="gray")
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 15)
    except Exception:
        font = None
    d.text((10, 10), prompt, fill=(255, 255, 255), font=font)
    
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    data_url = f"data:image/png;base64,{img_str}"
    
    return {"image": data_url}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
