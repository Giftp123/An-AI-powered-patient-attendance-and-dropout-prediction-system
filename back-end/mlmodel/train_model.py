import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# 1. Load the dataset
df = pd.read_csv('patient_attendance_dataset.csv')

# 2. Prepare the data (Convert text like 'Gender' into numbers)
df['Gender'] = df['Gender'].map({'Male': 0, 'Female': 1})
# We drop PatientID because it's just a label, not a predictor
X = df[['Age', 'Gender', 'DiseaseSeverity', 'PastNoShows', 'DistanceToClinic_KM', 'LeadTime_Days']]
y = df['RiskLevel']

# 3. Split into Training and Testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train the Model (Random Forest )
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 5. Evaluate
predictions = model.predict(X_test)
print("--- Model Performance ---")
print(classification_report(y_test, predictions))

# 6. Save the model to use in the web app later
joblib.dump(model, 'dropout_prediction_model.pkl')
print("Model saved as: dropout_prediction_model.pkl")