from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle


app = Flask(__name__)
CORS(app)
# Load the model
model = pickle.load(open(r'C:\Users\METHNI\Desktop\finalproject1\src\RandomF_model.pkl', 'rb'))


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    radius_mean = data['radius_mean']
    perimeter_mean = data['perimeter_mean']
    area_mean= data['area_mean']
    perimeter_se = data['perimeter_se']
    area_se = data['area_se']
    radius_worst = data['radius_worst']
    texture_worst = data['texture_worst']
    perimeter_worst= data['perimeter_worst']
    area_worst = data['area_worst']
    
    # Predict using the model
    prediction = model.predict([[radius_mean, perimeter_mean, area_mean, perimeter_se, area_se,
       radius_worst, texture_worst, perimeter_worst, area_worst]])

    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)