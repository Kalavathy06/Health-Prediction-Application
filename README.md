# Health Prediction App

A machine learning-based application for predicting health outcomes and disease risk.

## Project Structure

```
health-prediction-app/
├── app.py                 # Main application entry point
├── database.py            # Database connection and operations
├── models.py              # Data models and schemas
├── ai_prediction.py       # ML prediction engine
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── database/
    └── patients.db        # SQLite database file
```

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the application:
```bash
python app.py
```

## Features

- Patient data management
- Health risk prediction
- Machine learning models for disease prediction
- SQLite database for persistent storage

## License

MIT
