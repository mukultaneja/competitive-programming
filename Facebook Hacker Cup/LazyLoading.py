# lazy loading


def get_weights():
    '''
        Function to get item's weight as as input
        from user
    '''
    N = int(raw_input())
    if 1 <= N <= 100:
        item_count = 0
        weights = []

        while item_count < N:
            w = int(raw_input())
            if 1 <= w <= 100:
                weights.append(w)
            else:
                raise Exception('Error: violating weight of item constraint')
            item_count += 1

        return weights
    else:
        raise Exception('Error: violating number of items constraint')


def get_total_rounds(weights):
    '''
        Function to compute total rounds to truck by willson in
        the day
    '''
    rounds = 0
    WEIGHT_LIMIT = 50
    for weight in weights:
        l = len(weights)
        if l > 0:
            if weight >= 50:
                rounds += 1
                weights = weights[1:]
            else:
                k = 0
                while (weight * k < WEIGHT_LIMIT):
                    k += 1
                # k = k - 1
                rounds = rounds + 1 if k <= l else rounds
                weights = weights[1:len(weights) - (k - 1)]
        else:
            break

    return rounds


def main():
    '''
        Main function for the problem
    '''
    T = int(raw_input())
    if 1 <= T <= 500:
        try:
            testcase_count = 0
            output = []

            while testcase_count < T:
                # taking weights as inputs
                weights = get_weights()

                # sorting weights to pick maximum one first
                weights = sorted(weights, reverse=True)

                # couting number of rounds
                rounds = get_total_rounds(weights)

                output.append(rounds)
                testcase_count += 1

            return output
        except Exception as error:
            raise error
    else:
        raise Exception('Error: violating number of test case constraint')


results = main()
result_count = 1
for response in results:
    print 'Case #' + str(result_count) + ': ' + str(response)
    result_count += 1
