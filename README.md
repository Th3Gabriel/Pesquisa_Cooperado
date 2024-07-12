# Pesquisa de Cooperados

Este projeto é uma aplicação web desenvolvida em Flask com design em Bootstrap. O objetivo é consultar informações de cooperados através de CPF/CNPJ, utilizando a API BigDataCorp. A aplicação auxilia na manutenção dos dados dos cooperados no setor de cadastro da cooperativa de crédito.

## Funcionalidades

- Consulta de cooperados através de CPF/CNPJ.
- Integração com a API BigDataCorp para obter informações detalhadas dos cooperados.
- Validação de CPF/CNPJ.
- Interface amigável utilizando Bootstrap.
- Armazenamento e recuperação de dados utilizando PostgreSQL.

## Estrutura do Projeto

```
my_flask_app/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── forms.py
│   ├── database_manager.py
│   ├── cpf_cnpj_app.py
├── static/
│   ├── Image
│   ├── script.js
│   └── styles.css
├── templates/
│   └── index.html
├── .env
└── run.py
```

## Tecnologias Utilizadas
<div align-items: baseline>
<img height="30" width="40" alt = "Python" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
<img height="30" width="40" alt = "Flask"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg" />
<img height="30" width="40" alt = "Bootstrap"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" />
<img height="30" width="40" alt = "PostgreSql"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
<img height="30" width="40" alt = "HTML5"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
<img height="30" width="40" alt = "CSS3"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
<img height="30" width="40" alt = "Javascript"  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
</div>

          

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd seu-repositorio
   ```
3. Crie e ative um ambiente virtual:
   ```sh
   python -m venv venv
   source venv/bin/activate  # No Windows, use `venv\Scripts\activate`
   ```
4. Instale as dependências:
   ```sh
   pip install -r requirements.txt
   ```
5. Configure o banco de dados PostgreSQL com as tabelas necessárias.

6. Configure as variáveis de ambiente no arquivo `.env` para a conexão com o banco de dados e a API BigDataCorp.

## Uso

1. Inicie o servidor Flask:
   ```sh
   flask run
   ```
2. Acesse a aplicação no navegador:
   ```
   http://127.0.0.1:5000
   ```

## Estrutura do Código

#### `app/__init__.py`
Este arquivo inicializa a aplicação Flask e configura as extensões necessárias, como a configuração do banco de dados e a instância do Flask.

#### `app/config.py`
Este arquivo contém as configurações da aplicação, incluindo a URL de conexão com o banco de dados PostgreSQL.

#### `app/forms.py`
Define os formulários utilizando Flask-WTF para a validação de entrada de dados dos usuários.

```python
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CPFForm(FlaskForm):
    cpf = StringField('CPF', validators=[DataRequired()])
    submit = SubmitField('Consultar')

class CNPJForm(FlaskForm):
    cnpj = StringField('CNPJ', validators=[DataRequired()])
    submit = SubmitField('Consultar')
```

#### `app/database_manager.py`
Gerencia a conexão e operações com o banco de dados PostgreSQL.

```python
import psycopg2
import os

class DatabaseManager:
    def __init__(self):
        self.connection = psycopg2.connect(os.getenv('DATABASE_URL'))

    def query(self, query, params=None):
        with self.connection.cursor() as cursor:
            cursor.execute(query, params)
            return cursor.fetchall()

    def execute(self, query, params=None):
        with self.connection.cursor() as cursor:
            cursor.execute(query, params)
            self.connection.commit()
```

#### `app/cpf_cnpj_app.py`
Contém as rotas e a lógica principal da aplicação Flask, incluindo a validação de CPF/CNPJ e consulta ao banco de dados.

```python
from flask import Flask, render_template, request, redirect, url_for, send_file
from app.forms import CPFForm, CNPJForm
from app.database_manager import DatabaseManager
import pandas as pd

app = Flask(__name__)
app.config.from_object('app.config')

db_manager = DatabaseManager()

@app.route('/', methods=['GET', 'POST'])
def index():
    cpf_form = CPFForm()
    cnpj_form = CNPJForm()
    
    if cpf_form.validate_on_submit():
        cpf = cpf_form.cpf.data
        # Lógica de validação e consulta CPF
        return redirect(url_for('index'))
    
    if cnpj_form.validate_on_submit():
        cnpj = cnpj_form.cnpj.data
        # Lógica de validação e consulta CNPJ
        return redirect(url_for('index'))
    
    return render_template('index.html', cpf_form=cpf_form, cnpj_form=cnpj_form)

@app.route('/export', methods=['GET'])
def export_data():
    cpf_data = db_manager.query("SELECT * FROM cpf_data")
    cnpj_data = db_manager.query("SELECT * FROM cnpj_data")
    
    cpf_df = pd.DataFrame(cpf_data, columns=['id', 'cpf', 'name', 'date_added'])
    cnpj_df = pd.DataFrame(cnpj_data, columns=['id', 'cnpj', 'name', 'date_added'])
    
    writer = pd.ExcelWriter('exported_data.xlsx', engine='openpyxl')
    cpf_df.to_excel(writer, sheet_name='CPF Data', index=False)
    cnpj_df.to_excel(writer, sheet_name='CNPJ Data', index=False)
    writer.save()
    
    return send_file('exported_data.xlsx', as_attachment=True)

if __name__ == "__main__":
    app.run()
```

#### `static/script.js`
Script JavaScript para manipulação de elementos na página HTML.

```javascript
// Exemplo de script JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Código para manipular DOM
});
```

#### `static/styles.css`
Arquivo CSS para estilização da página HTML.

```css
/* Exemplo de CSS */
body {
    font-family: Arial, sans-serif;
}

form {
    margin: 20px 0;
}
```

#### `templates/index.html`
Arquivo HTML para a interface do usuário.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta CPF/CNPJ</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='styles.css') }}">
    <script src="{{ url_for('static', filename='script.js') }}" defer></script>
</head>
<body>
    <h1>Consulta de CPF/CNPJ</h1>
    <form method="POST" action="/">
        {{ cpf_form.hidden_tag() }}
        {{ cpf_form.cpf.label }} {{ cpf_form.cpf }} {{ cpf_form.submit }}
    </form>
    <form method="POST" action="/">
        {{ cnpj_form.hidden_tag() }}
        {{ cnpj_form.cnpj.label }} {{ cnpj_form.cnpj }} {{ cnpj_form.submit }}
    </form>
    <a href="{{ url_for('export_data') }}">Exportar Dados</a>
</body>
</html>
```

### Dependências

O arquivo `requirements.txt` lista todas as dependências necessárias para rodar a aplicação.

```plaintext
blinker==1.8.2
certifi==2024.7.4
charset-normalizer==3.3.2
click==8.1.7
colorama==0.4.6
Flask==3.0.3
Flask-WTF==1.2.1
gunicorn==22.0.0
idna==3.7
itsdangerous==2.2.0
Jinja2==3.1.4
MarkupSafe==2.1.5
packaging==24.1
psycopg2==2.9.9
requests==2.32.3
urllib3==2.2.2
Werkzeug==3.0.3
WTForms==3.1.2
pandas==2.0.3
openpyxl==3.1.2
```

### Executando a Aplicação

1. **Configuração do Ambiente**
   - Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados.
     ```plaintext
     DATABASE_URL=postgresql://username:password@localhost/dbname
     SECRET_KEY=your_secret_key
     ```

2. **Instalação das Dependências**
   - Execute `pip install -r requirements.txt` para instalar as dependências.

3. **Rodando a Aplicação**
   - Execute `python run.py` para iniciar a aplicação Flask.

### Conteúdo do Arquivo `run.py`
O arquivo `run.py` é o ponto de entrada para a aplicação.

```python
from app.cpf_cnpj_app import app

if __name__ == "__main__":
    app.run(debug=True)
```

Essa documentação cobre a estrutura e funcionalidade básica do projeto "Pes_coop". Se precisar de mais detalhes ou ajustes, por favor, avise.

## Contribuição

1. Fork o projeto.
2. Crie uma nova branch:
   ```sh
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```sh
   git commit -m 'Minha nova feature'
   ```
4. Envie para a branch original:
   ```sh
   git push origin minha-feature
   ```
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Feito com ❤️ por [Gabriel Martins Paz](https://github.com/Th3Gabriel)

---

**Nota:** Certifique-se de configurar as variáveis de ambiente corretamente e de ter acesso à API BigDataCorp. Para mais informações sobre a API, consulte a [documentação oficial](https://www.bigdatacorp.com.br/documentacao).

Espero que este README forneça uma visão clara e completa do seu projeto. Se precisar de mais detalhes ou ajustes, estou à disposição!
