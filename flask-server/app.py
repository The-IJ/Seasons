from flask import Flask,request,url_for, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
import os
import numpy as np

# Keras
from keras.applications.imagenet_utils import preprocess_input
from keras.models import load_model
from PIL import Image
import h5py
import tensorflow as tf

app=Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH = 'flask-server/models/model2.h5'

# Load your trained model
# model = load_model(MODEL_PATH, compile=False)
# # Compile the model
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# Save the model with training configuration
# model.save('flask-server/models/model2.h5')


# Load the model again
model = load_model('flask-server/models/model2.h5')

print('Model loaded. Start serving...')
# model.save('flask-server/models/model.h5')
# Modify the model_predict function
def model_predict(img_path, model):
    img = Image.open(img_path).resize((224, 224))
    # Preprocessing the image
    x = np.array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x, mode='caffe')

    preds = model.predict(x)
    preds=np.array(preds)
    # Define the specific weather categories
    weather_categories = ['Sunny', 'Cloudy', 'Rainy', 'Sunrise', 'Snowy']

    # Get the predicted class index
    class_index = np.argmax(preds, axis=1)[0]

    # Check if the predicted class index is within range
    if class_index < len(weather_categories):
        predicted_category = weather_categories[class_index]
    else:
        valid_preds = preds[:, :len(weather_categories)]  # Get predictions within valid range
        max_prob_index = np.argmax(valid_preds, axis=1)[0]  # Find index of maximum probability
        predicted_category = weather_categories[max_prob_index]

    return predicted_category

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from the post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)
        if preds in ['Sunny', 'Cloudy', 'Sunrise', 'Rainy', 'Snowy']:
            result = preds
        else:
            result = 'Unknown'

        # Return the prediction result 
        return result

    # Return an empty response for GET requests or other request methods
    return ''


if __name__=="__main__":
    app.run(debug=True)

