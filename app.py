from flask import Flask
from cpf_cnpj_app import CPFCNPJApp

app = Flask(__name__)
app.config.from_object('config.Config')

@app.route('/', methods=['GET', 'POST'])
def index():
    app = CPFCNPJApp()
    return app.index()

if __name__ == '__main__':
    app.run(debug=True)
