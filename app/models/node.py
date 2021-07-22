class Node:

    def __init__(self, board, parent=None, action=None):
        self.board = board
        self.parent = parent
        self.action = action
        # No momento em que montanos nosso nó, atribuímos
        # um valor para o custo.
        if(self.parent != None):
            self.coust = parent.coust + 1
        else:
            self.coust = 0

    @property
    def score(self):
        """
        Retorna a pontuação daquele estado que nos diz
        o quão ótimo é aquele estado com relação ao nosso
        objetivo.
        """
        return (self.coust + self.heuristic)

    @property
    def state(self):
        """
        Retorna o nó do estado atual do nosso problema
        """
        return str(self)
    
    @property
    def path(self):
        """
        Retorna o caminho percorrido do nó atual até o
        nó raiz do problema.
        """

        node = self
        path = []

        while node:
            path.append(node)
            node = node.parent
        return path[::-1]

    @property
    def heuristic(self):
        return self.board.manhattan_distance
    
    @property
    def is_goal(self):
        return self.board.solved

    @property
    def actions(self):
        return self.board.actions

    def __str__(self):
        return str(self.board)