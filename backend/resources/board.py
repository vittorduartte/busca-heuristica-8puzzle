from flask import Blueprint, jsonify, request
from ..rules.solver import board_solver
import os

def init(app):
    bp = Blueprint('board', __name__)

    @bp.route('/solver', methods=['GET'])
    def solver():
        request_solver = board_solver(request.json["board"])
        return jsonify(data=request_solver)

    @bp.route('/', methods=['GET'])
    def index():
        return jsonify(message="API successfully!")
        
    app.register_blueprint(bp, url_prefix="/api/v1")