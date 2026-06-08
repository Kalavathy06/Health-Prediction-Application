import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

def predict_health(
    glucose,
    haemoglobin,
    cholesterol
):

    prompt = f"""
    Analyze the blood report.

    Glucose: {glucose}
    Haemoglobin: {haemoglobin}
    Cholesterol: {cholesterol}

    Predict possible health risks in one short paragraph.
    """

    response = model.generate_content(
        prompt
    )

    return response.text