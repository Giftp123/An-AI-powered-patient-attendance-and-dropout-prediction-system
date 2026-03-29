import pandas as pd
import numpy as np

# Set seed for reproducibility
np.random.seed(42)
num_records = 1000

# Generating core features based on Group 8 Class Diagram
data = {
    'PatientID': range(1001, 1001 + num_records), # patienid: Int 
    'Age': np.random.randint(18, 85, size=num_records),
    'Gender': np.random.choice(['Male', 'Female'], size=num_records),
    'DiseaseSeverity': np.random.randint(1, 6, size=num_records), # 1-5 Scale 
    'EngagementStatus': np.random.choice(['Active', 'Inactive', 'Disengaged'], size=num_records), # 
    'PastNoShows': np.random.randint(0, 10, size=num_records),
    'DistanceToClinic_KM': np.random.uniform(1.0, 50.0, size=num_records).round(2),
    'LeadTime_Days': np.random.randint(1, 30, size=num_records)
}

df = pd.DataFrame(data)

# Risk Calculation Logic
# Higher weight on Disease Severity and No-Shows for prediction accuracy
df['RiskScore'] = (
    (df['DiseaseSeverity'] * 0.15) + 
    (df['PastNoShows'] * 0.1) + 
    (df['DistanceToClinic_KM'] * 0.005)
).clip(0, 1)

# Categorizing into levels for your UI (Low, Medium, High) [cite: 55, 156]
def categorize_risk(score):
    if score < 0.35: return 'Low'
    elif score < 0.70: return 'Medium'
    else: return 'High'

df['RiskLevel'] = df['RiskScore'].apply(categorize_risk)

# Export to CSV
df.to_csv('patient_attendance_dataset.csv', index=False)

print("--- Success! Dataset Generated without Names ---")
print(f"Total Records: {len(df)}")
print(df.head())