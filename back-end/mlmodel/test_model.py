import joblib
import pandas as pd

# 1. Load the trained brain (model)
model = joblib.load('dropout_prediction_model.pkl')

def get_prediction():
    print("\n--- AI Patient Dropout Predictor ---")
    try:
        # 2. Collect inputs (Simulating what a doctor would enter in your UI)
        age = int(input("Enter Patient Age: "))
        gender = input("Enter Gender (Male/Female): ").strip().lower()
        severity = int(input("Enter Disease Severity (1-5): "))
        no_shows = int(input("Number of Past No-Shows: "))
        distance = float(input("Distance to Clinic (KM): "))
        lead_time = int(input("Days since booking (Lead Time): "))

        # Convert gender to number (0 for Male, 1 for Female) as we did in training
        gender_num = 0 if gender == 'male' else 1

        # 3. Format the data for the model
        patient_data = pd.DataFrame([[age, gender_num, severity, no_shows, distance, lead_time]], 
                                    columns=['Age', 'Gender', 'DiseaseSeverity', 'PastNoShows', 'DistanceToClinic_KM', 'LeadTime_Days'])

        # 4. Get the result
        prediction = model.predict(patient_data)
        print(f"\n>>> RESULT: The AI predicts this patient is: {prediction[0]} Risk")
        
    except Exception as e:
        print(f"Error: Please enter valid numbers. ({e})")

if __name__ == "__main__":
    get_prediction()