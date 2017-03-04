
#
#  tornado server index.py
#
#
import os
import json
import tornado.web
import tornado.options
import tornado.httpserver
import tornado.ioloop
import tornado.autoreload
import custom_handlers

from tornado.options import options, define

define('port', default=8888, type=int, help="port on which server will run")


class IndexHandler(tornado.web.RequestHandler):
    '''
    IndexHandler
    '''

    def get(self):
        '''
        Function handles all the get requests sent by the client
        to this page. For now, the primary purpose of this function
        is to render index.html whenever a new request comes into
        the picture
        '''
        self.render('index.html')

    def data_received(self, message):
        '''
        Overridden Function
        '''
        pass


class FilterDataHandler(tornado.web.RequestHandler):
    '''
    FilteredDataHandker
    '''

    def get(self):
        '''
        Function handles all the get requests sent by the client
        to /data url. This function takes all the arguments
        which are being passed through the request and transfers
        these elements to custom_handlers for further processings.
        Finally it receives data back from custom_handlers and transfers
        the data back to client in the form of JSON.
        '''
        args = self.get_args()
        data = custom_handlers.get_filtered_data(args)

        if len(data) > 0:
            output = {'table': data.to_html(classes=['table',
                                                     'table-bordered',
                                                     'table-responsive']),
                      'response': data.to_json(orient='records')}
            self.write(output)
        else:
            self.write(json.dumps({'error': 'No Data Available'}))

    def data_received(self, message):
        '''
        Overidden Function
        '''
        pass

    def get_args(self):
        '''
        Function parses all the arguments which are being passed
        over /data url and transfers them back to
        its caller.
        '''
        args = {}
        args['industry'] = self.get_argument('industry', 'all')
        args['year'] = self.get_argument('year', '2013')
        args['attributes'] = self.get_argument(
            'attributes', 'Brand Strength-Customer Satisfaction-Reliability-Popularity')
        args['brand'] = self.get_argument('brand', 'all')

        return args


class OptionHandler(tornado.web.RequestHandler):
    '''
    OptionHandler
    '''

    def get(self):
        '''
        Function handles all the get requests over /options
        url handle. It takes multiple value combinations of filters
        from index page and returns back relevant options for
        the selected choice of filters.
        '''
        col, industry = self.args_handler()
        data = custom_handlers.get_options(col, industry)

        return self.write(data)

    def data_received(self, message):
        '''
        Overridden Function
        '''
        pass

    def args_handler(self):
        '''
        Function parses all the arguments which are being passed
        over /opions url and transfers them back to
        its caller.
        '''
        col = self.get_argument('col')
        industry = self.get_argument('industry', 'all')

        return col, industry


if __name__ == '__main__':
    '''
    main function to start the server
    and to attach all the url handles to
    their respective handlers.
    '''
    tornado.options.parse_command_line()

    for f in os.listdir('.'):
        if os.path.isfile(f):
            tornado.autoreload.watch(f)

    TEMPLATE_PATH = os.path.dirname('__FILE__')
    STATIC_PATH = os.path.join(os.path.dirname('__FILE__'), 'static')
    HANDLERS = [(r'/', IndexHandler),
                (r'/data', FilterDataHandler),
                (r'/options', OptionHandler)]

    APP = tornado.web.Application(handlers=HANDLERS,
                                  template_path=TEMPLATE_PATH,
                                  static_path=STATIC_PATH,
                                  autoreload=True)

    HTTPSERVER = tornado.httpserver.HTTPServer(APP)
    HTTPSERVER.listen(options.port)
    tornado.ioloop.IOLoop().instance().start()
