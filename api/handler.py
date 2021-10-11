from flask_restful import Api, Resource, reqparse


class HelloApiHandler(Resource):
    def get(self):
        print(self)
        return {
            'resultStatus': 'SUCCESS',
            'message': "Hello Api Handler"
        }
