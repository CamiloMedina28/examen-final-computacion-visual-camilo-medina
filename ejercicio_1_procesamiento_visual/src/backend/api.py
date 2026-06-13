from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil

from services import image_processor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

BASE_DIR = Path(__file__).resolve().parents[2]

RESULT_DIR = BASE_DIR / "resultados"

RESULT_DIR.mkdir(exist_ok=True)

app.mount("/resultados", StaticFiles(directory=str(RESULT_DIR)), name="resultados")

@app.post("/process")
async def process(file: UploadFile = File(...)):

    image_path = RESULT_DIR / file.filename

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Guardando archivo en:", image_path)

    print("Existe:", Path(image_path).exists())
    image_processor.process_image(str(image_path))

    return {
        "original": "http://localhost:8000/resultados/original.png",
        "grises": "http://localhost:8000/resultados/grises.png",
        "hsv": "http://localhost:8000/resultados/hsv_o_lab.png",
        "suavizado": "http://localhost:8000/resultados/suavizado.png",
        "bordes": "http://localhost:8000/resultados/bordes.png",
        "segmentacion": "http://localhost:8000/resultados/deteccion_o_segmentacion.png"
    }
