from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class RewriteHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        original_path = self.path

        path_without_slash = self.path.rstrip('/')

        if '.' not in os.path.basename(path_without_slash) and path_without_slash:

            self.path = path_without_slash + '.html'
            print(f'[REWRITE] {original_path}  →  {self.path}')
        else:
            print(f'[DIRECT ] {self.path} (no rewrite)')

        return super().do_GET()

PORT = 8000
print(f'Сервер запущен: http://localhost:{PORT}')
print(f'Рабочая папка: {os.getcwd()}')
HTTPServer(('', PORT), RewriteHandler).serve_forever()