import numpy as np
from flask import Flask , request , jsonify , render_template, send_file
import pickle
import pandas as pd


# Creating a Flask instance named app
app = Flask(__name__) 

model_fb = pickle.load(open('model_fb.pkl','rb'))
model_apl = pickle.load(open('model_apl.pkl','rb'))

@app.route('/')
def hello_world():
    return render_template('stock.html')


@app.route('/Growth_Graph')
def Grwoth_Graph():
    graph_path = 'Visualization/Growth-in-Stock-Price/Growth-in-Stock-Price-over-5-years.svg'

    return send_file(graph_path, mimetype='image/svg+xml')

@app.route('/TechStockComp')
def TechStockComp():
    graph_path1 = 'Visualization/Comparitive-Analysis/Comparitive-Ananlysis-of-tech-stocks.svg'

    return send_file(graph_path1, mimetype='image/svg+xml')


@app.route('/MaxiValStock')
def MaxiValStock():
    graph_path1 = 'Visualization/Maximum-Price-during-five-years/Adavanced-Micro-Devices.svg.svg'
    graph_path2 = 'Visualization/Maximum-Price-during-five-years/Apple.svg.svg'
    graph_path3 = 'Visualization/Maximum-Price-during-five-years/Bank-of-America.svg.svg'
    graph_path4 = 'Visualization/Maximum-Price-during-five-years/Cisco.svg.svg'
    graph_path5 = 'Visualization/Maximum-Price-during-five-years/Facebook.svg.svg'
    graph_path6 = 'Visualization/Maximum-Price-during-five-years/Ford-Motor-Company.svg.svg'
    graph_path7 = 'Visualization/Maximum-Price-during-five-years/General-Electric.svg.svg'
    graph_path8 = 'Visualization/Maximum-Price-during-five-years/Intel-Corp.svg.svg'
    graph_path9 = 'Visualization/Maximum-Price-during-five-years/Micron-Technology.svg.svg'
    graph_path10 = 'Visualization/Maximum-Price-during-five-years/Microsoft.svg.svg'

    # Read SVG files and convert them to strings
    with open(graph_path1, 'r') as file:
        svg_data1 = file.read()
    with open(graph_path2, 'r') as file:
        svg_data2 = file.read()
    with open(graph_path3, 'r') as file:
        svg_data3 = file.read()
    with open(graph_path4, 'r') as file:
        svg_data4 = file.read()
    with open(graph_path5, 'r') as file:
        svg_data5 = file.read()
    with open(graph_path6, 'r') as file:
        svg_data6 = file.read()
    with open(graph_path7, 'r') as file:
        svg_data7 = file.read()
    with open(graph_path8, 'r') as file:
        svg_data8 = file.read()
    with open(graph_path9, 'r') as file:
        svg_data9 = file.read()
    with open(graph_path10, 'r') as file:
        svg_data10 = file.read()
    

    return {
        'Advanced-Micro-Devices.svg' : svg_data1,
        'Apple.svg' : svg_data2,
        'Bank-of-America.svg' : svg_data3,
        'Cisco.svg' : svg_data4,
        'Facebook.svg' : svg_data5,
        'Ford-Motor-Corp.svg' : svg_data6,
        'General-Electric.svg' : svg_data7,
        'Intel-Corp.svg' : svg_data8,
        'Micron-Technology.svg' : svg_data9,
        'Microsoft.svg' : svg_data10,
    }

@app.route('/Forecasting')
def Forecasting():
    file_path1 = 'model_apl.pkl'
    file_path2 = 'model_fb.pkl'
    file_path3 = 'fb_test.pkl'

    # Open the file in binary mode
    with open(file_path2, 'rb') as f:
        # Load the object from the file
        fb_model = pickle.load(f)
    with open(file_path3, 'rb') as f:
        # Load the object from the file
        fb_test = pickle.load(f)
    
    forecast, confidence_interval = fb_model.predict(n_periods = len(fb_test), return_conf_int = True)
    
    #Converting the forecast list into a series and then setting its index as the test_df's index
    forecast = pd.Series(forecast)
    forecast.index = fb_test.index

    lower = pd.Series(confidence_interval[:, 0], index = fb_test[:len(fb_test)].index)
    upper = pd.Series(confidence_interval[:, 1], index = fb_test[:len(fb_test)].index)

    final =  pd.DataFrame({'Forecasted Value': forecast, 'Actual Value': fb_test, 'Lower Range': lower, 'Upper Range': upper})
    
    final_dict = final.to_dict(orient='records')
    #print(final_dict)
    return jsonify(final_dict)

@app.route('/ForecastingApp')
def ForecastingApp():
    file_path1 = 'model_apl.pkl'
    file_path2 = 'apl_test.pkl'
    with open(file_path1, 'rb') as f:
        # Load the object from the file
        apl_model = pickle.load(f)
    with open(file_path2, 'rb') as f:
        # Load the object from the file
        apl_test = pickle.load(f)
    
    forecast, confidence_interval = apl_model.predict(n_periods = len(apl_test), return_conf_int = True)
    
    #Converting the forecast list into a series and then setting its index as the test_df's index
    forecast = pd.Series(forecast)
    forecast.index = apl_test.index

    lower = pd.Series(confidence_interval[:, 0], index = apl_test[:len(apl_test)].index)
    upper = pd.Series(confidence_interval[:, 1], index = apl_test[:len(apl_test)].index)

    final =  pd.DataFrame({'Forecasted Value': forecast, 'Actual Value': apl_test, 'Lower Range': lower, 'Upper Range': upper})
    
    final_dict = final.to_dict(orient='records')
    #print(final_dict)
    return jsonify(final_dict)
    


#This will start a development server through which we can server html files and alot of things, it is also 
#constantly listening for any request made to it and based on the requests it gives responsese
if __name__ == "__main__":
    app.run(debug=True)