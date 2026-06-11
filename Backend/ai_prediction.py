import google.generativeai as genai

genai.configure(
    api_key="GEMINI_API_KEY"
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