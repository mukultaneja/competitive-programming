## Convoluted Operations
        
def main():
    N = int(raw_input())
    if 1 <= N <= 500000:
        num_operations = 0
        states = {}
        output = []
        stack = []
        while num_operations < N:
            elements = [int(i) for i in raw_input().split(' ') if i != '']

            # taking input as type of operations
            if len(elements) == 3:
                typeofop, K, X = elements 
            elif len(elements) == 2:
                typeofop, X = elements
            else:
                typeofop = elements[0]

            # performing actions based on type of operations
            if typeofop == 0:
                stack.pop()
                states[num_operations] = stack
            elif typeofop == 1:
                stack.append(X)
                states[num_operations] = [i for i in stack]
            else:
                temp_stack = states[K - 1]
                temp_stack.sort()
                index = 0
                for item in temp_stack:
                    if item < X:
                        index += 1
                output.append(index)

            num_operations += 1
        return output

output = main()
for out in output:
    print out
