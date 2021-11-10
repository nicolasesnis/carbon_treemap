from flask import Response, Flask, render_template
import os
import traceback
import pandas as pd
from flask_restful import Api
from api.handler import HelloApiHandler
from flask_cors import CORS
import json
from flask import Flask, session
from flask_session import Session  # new style
from backend_functions.plotly_funcs import build_hierarchical_dataframe
from backend_functions.gdrive_funcs import list_gdrive_content, download_gdrive_file
import yaml

app = Flask(__name__,
            static_url_path='',
            static_folder='frontend/build',
            template_folder='frontend/build')
api = Api(app)
CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


with open('./secret.yaml') as f:
    creds = yaml.safe_load(f)


@ app.route('/')
def index():
    return render_template('index.html')


@ app.route('/get-data/<filename>')
def send_data(filename):
    try:
        if filename not in os.listdir('data'):
            download_gdrive_file(filename)
        df = pd.read_csv('data/' + filename).dropna()
        levels = list(df.columns)[0:2]
        color_column = df.columns[3]
        value_column = df.columns[4]
        df[color_column] = df[color_column].astype(float)
        output = dict()
        for year in df['year'].unique():
            df_all_trees = build_hierarchical_dataframe(
                df[df['year'] == year], levels, value_column, color_column)
            output.update({
                str(year): {
                    key: list(values.values()) for key, values in df_all_trees.to_dict().items()
                }
            })
            output[str(year)].update({
                color_column: df[df['year'] == year][color_column].median(),
                'raw_data': df[df['year'] == year].to_dict()
            })
            output['status'] = 200
    except Exception:
        output = {
            'status': 'failed',
            'message': traceback.format_exc()
        }
    return json.dumps(output)


@ app.route('/get-files/')
def list_files():
    files = list_gdrive_content()
    files = [f['name']
             for f in files if f['id'] != '1gAdkyXDMx_9cPcwyhMVNFaQHpM02rQ5C']
    return json.dumps(files)


api.add_resource(HelloApiHandler, '/api')
