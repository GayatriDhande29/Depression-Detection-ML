from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load your trained model (update the path to your model file)
model = pickle.load(open("depression_model.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # The input data should match the model's expected input format
    features = data['answers']  # e.g., [2, 1, 3, 0, 2, 1, ...]
    features = np.array(features).reshape(1, -1)  # Reshape for prediction
    prediction = model.predict(features)  # Predict using the model
    result = {"prediction": int(prediction[0])}  # Format the result
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
