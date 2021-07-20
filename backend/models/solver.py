from .node import Node

class Solver:

    def __init__(self, root):
        self.root = root
    
    def solve(self):
        queue = [ Node(self.root) ]
        visited = set()
        visited.add(queue[0].state)

        run = True
        run_count = 0
        action_count = 0

        while run:
            print(f'Run - {run_count}')
            run_count+=1

            queue = sorted(queue, key = lambda node: node.score)
            node =  queue[0] # Recebendo o primeiro item da pilha para análise.
            del queue[0] # E aqui ele é desempilhado da pilha. 

            if node.is_goal:
                run = False
                return node.path
            
            for move, action in node.actions:
                print(f'Action - {action_count}')
                action_count+=1

                child = Node(move(), node, action)
            
                if child.state not in visited:
                    queue.insert(0, child)
                    visited.add(child.state)