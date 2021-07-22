import random

class Board:
    def __init__(self, board):
        self.width = len(board[0])
        self.height = len(board)
        self.board = board

    @property
    def manhattan_distance(self):
        """
        A distância de Manhattan ou Geometria do Táxi consiste
        na somatória do módulo das diferenças entre as coodernadas
        dos pontos analisados.
        """
        distance = 0
        for i in range(self.height):
            for j in range(self.width):
                element = self.board[i][j]
                if element:  # Caso o elemento seja != 0
                    x = (element - 1) // self.width # Cociente (coord. x desejável)
                    y = (element - 1) % self.width # Resto (coord. y desejável)
                    distance += abs(x - i) + abs(y - j)

        return distance

    @property
    def solved(self):
        """
        Este método é responsável pelo teste de objetivo.
        """
        lenght = self.width * self.height
        return str(self) == ''.join(map(str, range(1, lenght))) + '0'

    @property
    def actions(self):

        def new_move(from_, to_):
            return lambda: self._move(from_, to_)

        all_moves = []

        for i in range(self.height):

            for j in range(self.width):

                directions = {
                    'Right': (i, j-1),
                    'Left': (i, j+1),
                    'Down': (i-1, j),
                    'Up': (i+1, j)
                }

                for action, (row, column) in directions.items():
                    # if row >= 0 and column >= 0 and row < self.height and column < self.width:
                    #     print(f'Element - {self.board[row][column]}')

                    if row >= 0 and column >= 0 and row < self.height and column < self.width and self.board[row][column] == 0:
                        # print(f'Action - {action}\nRow - {r}\nColumn - {c}\n\n')
                        move = new_move((i, j), (row, column)), action
                        all_moves.append(move)

        return all_moves

    def board_copy(self):
        """
        Retorna uma cópia do objeto Board com a mesma
        configuração de tabuleiro.
        """
        board_copy = []
        for i in self.board:
            board_copy.append([x for x in i])

        return Board(board_copy)

    def _move(self, from_, to_):
        """
        Este método privado faz um 'de para'
        para 
        """
        board_copy = self.board_copy()
        i, j = from_
        row, column = to_

        aux_value = board_copy.board[i][j]
        board_copy.board[i][j] = board_copy.board[row][column]
        board_copy.board[row][column] = aux_value

        return board_copy

    def to_terminal(self):
        for row in self.board:
            print(f'{row}\n')

    def to_web(self):
        out = []
        for row in self.board:
            out.append(row)
        return out

    def __str__(self):
        return ''.join(map(str, self))

    def __iter__(self):
        for row in self.board:
            yield from row