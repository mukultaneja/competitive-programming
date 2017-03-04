
## custom handlers.py
#
import pandas as pd
import json

DELOITTE = pd.read_csv('data/deloitte.csv', index_col=0)


def get_filtered_data(kawrgs):
    '''
    Function to take arguments from URL Handler and operating
    them over the data file. This function is a objective
    oriented implementation.

    This function serves the objective for filtering data
    based on the passed arguments and then perform group by
    over requested metric.
    '''
    data = DELOITTE
    year = int(kawrgs['year'])
    industry = kawrgs['industry']
    attrib = kawrgs['attributes'].split('-')
    brand = kawrgs['brand']
    cols = ['Year']

    data = data[data['Year'] == year]

    if industry not in ('all',):
        data = data[data['Brand Industry'] == industry]
    else:
        cols.append('Brand Industry')

    if brand not in ('all',):
        data = data[data['Brand Name'] == brand]
    else:
        cols.append('Brand Name')

    attrib.extend(cols)

    data = data[attrib]

    return data.groupby(cols, as_index=False).sum()


def get_options(col, industry):
    '''
    Function to take arguments from URL Handler and operating
    them over the data file. This function is a objective
    oriented implementation.

    This function serves the objective to call other functions
    for getting the results based on the value of its argument.

    It is mainly designed to populate data for filters on the
    index page.
    '''
    data = DELOITTE
    if col == 'year':
        data = get_unique_years()

    elif col == 'industry':
        data = get_unique_industries()

    elif col == 'attributes':
        data = get_unique_attributes()

    else:
        data = get_unique_brands(industry)

    return json.dumps(data)


def get_unique_years():
    '''
    Function to fetch unique years from the data file
    '''
    data = DELOITTE
    return data['Year'].fillna('NA').unique().tolist()


def get_unique_industries():
    '''
    Function to fetch unique industries from the data file
    '''
    data = DELOITTE
    return data['Brand Industry'].fillna('NA').unique().tolist()


def get_unique_attributes():
    '''
    Function to fetch unique attributes from the data file
    '''
    data = DELOITTE
    return data.columns.tolist()[3:]


def get_unique_brands(industry):
    '''
    Function to fetch unique brands from the data file based on
    the selected industry. If industry has a value 'all' then
    it returns all the avialable brands from data file.
    '''
    data = DELOITTE
    if industry not in ('all',):
        data = data[data['Brand Industry'] == industry]

    return data['Brand Name'].fillna('NA').unique().tolist()
