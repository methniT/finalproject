import pickle
import streamlit as st


# Load the model
model = pickle.load(open(r'C:\Users\METHNI\Desktop\finalproject\RandomF_model.pkl', 'rb'))

st.title('Cancer Diagnosis Prediction')
st.markdown('Fill all the fields to predict...')

# Input fields
radius_mean = st.number_input('Radius Mean', min_value=0.0)
texture_mean = st.number_input('Texture Mean', min_value=0.0)
perimeter_mean = st.number_input('Perimeter Mean', min_value=0.0)
area_mean = st.number_input('Area Mean', min_value=0.0)
smoothness_mean = st.number_input('Smoothness Mean', min_value=0.0)
compactness_mean = st.number_input('Compactness Mean', min_value=0.0)
concavity_mean = st.number_input('Concavity Mean', min_value=0.0)
concave_points_mean = st.number_input('Concave Points Mean', min_value=0.0)
symmetry_mean = st.number_input('Symmetry Mean', min_value=0.0)
fractal_dimension_mean = st.number_input('Fractal Dimension Mean', min_value=0.0)

# Prediction logic
def predict(radius_mean, texture_mean, perimeter_mean, area_mean, smoothness_mean,
            compactness_mean, concavity_mean, concave_points_mean, symmetry_mean,
            fractal_dimension_mean):
    # Make prediction
    prediction = model.predict([[radius_mean, texture_mean, perimeter_mean, area_mean,
                                 smoothness_mean, compactness_mean, concavity_mean,
                                 concave_points_mean, symmetry_mean, fractal_dimension_mean]])
    
    if prediction[0] == 0:
        return 'No Cancer'
    elif prediction[0] == 1:
        return 'Malignant'
    else:
        return 'Benign'

# Display result
if st.button('Predict Diagnosis'):
    result = predict(radius_mean, texture_mean, perimeter_mean, area_mean,
                     smoothness_mean, compactness_mean, concavity_mean,
                     concave_points_mean, symmetry_mean, fractal_dimension_mean)
    st.write('Diagnosis Prediction:', result)
