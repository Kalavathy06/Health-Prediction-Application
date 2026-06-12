from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import re
from ai_prediction import predict_health

app = Flask(__name__)

CORS(app, origins='*')
def is_valid_email(email):
    pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    return re.match(pattern, email)

@app.route("/patients", methods=["GET", "POST", "OPTIONS"])
def handle_patients():
    
    if request.method == "OPTIONS":
        return '', 200
    
    if request.method == "GET":
        conn = sqlite3.connect("patients.db")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM patients")
        data = cursor.fetchall()
        conn.close()
        return jsonify(data)
    
    elif request.method == "POST":
        data = request.json

    if not is_valid_email(data["email"]):
        return jsonify({"error": "Invalid email format"}), 400

    try:
        remarks = predict_health(
            data["glucose"],
            data["haemoglobin"],
            data["cholesterol"]
        )
    except Exception as e:
        print(f"AI Prediction failed: {e}")

        remarks = f"AI prediction temporarily unavailable."

    conn = sqlite3.connect("patients.db")
    cursor = conn.cursor()

    try:
        cursor.execute("""
        INSERT INTO patients
        (
            full_name,
            dob,
            email,
            glucose,
            haemoglobin,
            cholesterol,
            remarks
        )
        VALUES(?,?,?,?,?,?,?)
        """,
        (
            data["full_name"],
            data["dob"],
            data["email"],
            data["glucose"],
            data["haemoglobin"],
            data["cholesterol"],
            remarks
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Patient Added"
        })

    except sqlite3.IntegrityError:
        conn.close()

        return jsonify({
            "error": "Duplicate patient record already exists"
        }), 400


@app.route("/patients/<int:id>", methods=["GET", "PUT", "DELETE", "OPTIONS"])
def handle_patient(id):
  
    if request.method == "OPTIONS":
        return '', 200
    
    if request.method == "GET":
        conn = sqlite3.connect("patients.db")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM patients WHERE id=?", (id,))
        patient = cursor.fetchone()
        conn.close()
        return jsonify(patient)
    
    elif request.method == "PUT":
        data = request.json
        if not is_valid_email(data["email"]):
            return jsonify({
                "error": "Invalid email format"
                }), 400
        
        
        try:
            remarks = predict_health(
                data["glucose"],
                data["haemoglobin"],
                data["cholesterol"]
            )
        except Exception as e:
            print(f"AI Prediction failed during update: {e}")
           
            remarks = f"AI prediction temporarily unavailable. Based on blood report: Glucose={data['glucose']}, Haemoglobin={data['haemoglobin']}, Cholesterol={data['cholesterol']}. Please consult a doctor for detailed analysis."
        
        conn = sqlite3.connect("patients.db")
        cursor = conn.cursor()
        
 
        cursor.execute("""
        UPDATE patients
        SET
          full_name=?,
          dob=?,
          email=?,
          glucose=?,
          haemoglobin=?,
          cholesterol=?,
          remarks=?
        WHERE id=?
        """,
        (
          data["full_name"],
          data["dob"],
          data["email"],
          data["glucose"],
          data["haemoglobin"],
          data["cholesterol"],
          remarks, 
          id
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            "message": "Updated with new AI prediction"
        })
    
    elif request.method == "DELETE":
        conn = sqlite3.connect("patients.db")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM patients WHERE id=?", (id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            "message": "Patient deleted"
        })

if __name__ == "__main__":
    app.run(debug=True, port=5000)