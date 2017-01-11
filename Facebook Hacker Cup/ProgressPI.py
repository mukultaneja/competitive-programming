
import math


def get_points():
    '''
        Function to choose points on the circumference
    '''
    P, X, Y = [int(i) for i in raw_input().split()]
    if (0 <= P <= 100) and (0 <= X <= 100) and (0 <= Y <= 100):
        R = 50
        if P == 0:
            return 'white'
        if ((X - R)**2 + (Y - R)**2) > R**2:
            return 'white'
        if (X - R) > 0 and (Y - R) > 0:
            ratio = (X - R) / (Y - R)
        elif (X - R) > 0 and (Y - R) < 0:
            ratio = (X - R) / (Y - R)
        elif (X - R) < 0 and (Y - R) < 0:
            ratio = 180 + (X - R) / (Y - R)
        elif (X - R) < 0 and (Y - R) > 0:
            ratio = 180 + (X - R) / (Y - R)
        else:
            pass

        P = (P * 360) / 100
        angle = math.degrees(math.atan(ratio))
        if angle <= P:
            return 'black'
        return 'white'


def main():
    '''
        Main function to start execution
    '''
    T = int(raw_input())
    if 1 <= T <= 1000:
        point_counts = 0
        output = []
        while point_counts < T:
            state = get_points()
            output.append(state)
            point_counts += 1
        return output


results = main()
results_count = 1
for result in results:
    print 'Case #' + str(results_count) + ': ' + result
    results_count += 1
