from flask import Response, Flask, render_template
import pandas as pd
from flask_restful import Api
from api.handler import HelloApiHandler
from flask_cors import CORS
import json
from flask import Flask, session
from flask_session import Session  # new style
from backend_functions.plotly_funcs import build_hierarchical_dataframe
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
    df = pd.read_csv('data/' + filename + '.csv').dropna()
    if filename == 'entreprises':
        # levels used for the hierarchical chart
        levels = ['company_name', 'industry']
        color_column = 'tco2_eq'
        value_column = 'capitalization'
    elif filename == 'pays':
        # levels used for the hierarchical chart
        levels = ['country', 'region']
        color_column = 'tco2_eq_per_hab'
        value_column = 'tco2_eq'
    else:
        return {}
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
            'tco2_eq_mean': df[df['year'] == year][color_column].median(),
            'raw_data': df[df['year'] == year].to_dict()
        })
    return json.dumps(output)


api.add_resource(HelloApiHandler, '/api')
