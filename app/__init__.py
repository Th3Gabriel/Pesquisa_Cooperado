from flask import Flask
import os

def create_app():
    app = Flask(
        __name__,
        template_folder=os.path.join(os.path.dirname(__file__), '..', 'templates'),
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static')
    )
    app.config.from_object('app.config.Config')

    from app.cpf_cnpj_app import CPFCNPJApp

    @app.route('/', methods=['GET', 'POST'])
    def index():
        app_instance = CPFCNPJApp()
        return app_instance.index()

    return app
