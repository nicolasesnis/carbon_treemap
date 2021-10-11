from binance import ThreadedWebsocketManager
from binance.client import Client
from flask import Response, Flask, render_template
import pandas as pd
from flask_restful import Api
from api.handler import HelloApiHandler
from flask_cors import CORS
import json
from flask import Flask, session
from flask_session import Session  # new style
# from backend_functions.pull_binance_data import get_historical_kline_df, get_exchange_info, get_wallet
import yaml

app = Flask(__name__,
            static_url_path='',
            static_folder='client/build',
            template_folder='client/build')
api = Api(app)
CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


with open('./secret.yaml') as f:
    creds = yaml.safe_load(f)


@ app.route('/')
def index():
    return render_template('index.html')


# @app.route('/get-exchange-info')
# def get_exchange_info_():
#     info = get_exchange_info(client)
#     return json.dumps(info)


# @app.route('/get-account-balance')
# def get_current_account_balance():


api.add_resource(HelloApiHandler, '/api')
