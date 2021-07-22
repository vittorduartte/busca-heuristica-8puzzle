from flask import Flask
from .resources import board
from .extensions import cors

def create_app():
    app = Flask(__name__)
    board.init(app)
    cors.init(app)
    
    return app