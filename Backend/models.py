class Patient:
    def __init__(self, id, name, age, medical_history):
        self.id = id
        self.name = name
        self.age = age
        self.medical_history = medical_history

class Prediction:
    def __init__(self, patient_id, disease, probability, date):
        self.patient_id = patient_id
        self.disease = disease
        self.probability = probability
        self.date = date
