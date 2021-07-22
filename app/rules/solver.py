from ..models.board import Board
from ..models.solver import Solver

def board_solver(request_board):

    board = Board(request_board)
    solver = Solver(board)
    path = solver.solve()
    steps = 0

    response = []
    for node in path:
        out = {'board' : node.board.to_web(), 'score' : node.score, 'action' : node.action, 'coust' : node.coust, 'step' : steps, 'is_goal' : node.is_goal, 'heuristic': node.heuristic}
        response.append(out)
        steps+=1
    
    return {"path":response, "steps":steps}
    # return {"sucess":"OK"}