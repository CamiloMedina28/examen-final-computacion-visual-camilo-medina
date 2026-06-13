import cv2
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

RESULT_DIR = BASE_DIR / "resultados"


def process_image(image_path: str):

    image = cv2.imread(image_path)
    print("Ruta recibida:", image_path)
    if image is None:
        raise Exception("No se pudo cargar la imagen.")

    original_path = RESULT_DIR / "original.png"
    cv2.imwrite(str(original_path), image)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray_path = RESULT_DIR / "grises.png"
    cv2.imwrite(str(gray_path), gray)

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    hsv_path = RESULT_DIR / "hsv_o_lab.png"
    cv2.imwrite(str(hsv_path), hsv)

    blur = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    blur_path = RESULT_DIR / "suavizado.png"
    cv2.imwrite(str(blur_path), blur)

    edges = cv2.Canny(
        blur,
        100,
        200
    )

    edges_path = RESULT_DIR / "bordes.png"
    cv2.imwrite(str(edges_path), edges)

    _, segmentation = cv2.threshold(
        gray,
        127,
        255,
        cv2.THRESH_BINARY
    )

    segmentation_path = RESULT_DIR / "deteccion_o_segmentacion.png"
    cv2.imwrite(
        str(segmentation_path),
        segmentation
    )

    return {
        "original": str(original_path),
        "grises": str(gray_path),
        "hsv": str(hsv_path),
        "suavizado": str(blur_path),
        "bordes": str(edges_path),
        "segmentacion": str(segmentation_path)
    }