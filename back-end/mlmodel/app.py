from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model once (important)
model = joblib.load('dropout_prediction_model.pkl')

@app.post("/predict")
def predict(data: dict):
    features = np.array([[
        data["Age"],
        data["Gender"],
        data["DiseaseSeverity"],
        data["PastNoShows"],
        data["DistanceToClinic_KM"],
        data["LeadTime_Days"]
    ]])

    prediction = model.predict(features)[0]
    return {"prediction": prediction}