from flask import Blueprint, jsonify, request, render_template
from ..rules.solver import board_solver
import os
import time

def init(app):
    bp = Blueprint('board', __name__)

    @bp.route('/api/v1/solver', methods=['POST'])
    def solver():
        start = time.time()
        request_solver = board_solver(request.json["board"])
        end = time.time()
        return jsonify(data=request_solver, time=(end - start))
    
    @bp.route('/', methods=['GET'])
    def index():
        return render_template("index.html")
        
    app.register_blueprint(bp, url_prefix="")