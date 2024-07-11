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

- `app/__init__.py`: Inicializa a aplicação Flask.
- `app/config.py`: Configurações da aplicação.
- `app/forms.py`: Formulários Flask-WTF utilizados na aplicação.
- `app/database_manager.py`: Gerencia a conexão e operações com o banco de dados.
- `app/cpf_cnpj_app.py`: Lógica principal da aplicação, incluindo rotas e integração com a API BigDataCorp.
- `templates/index.html`: Página principal da aplicação com o formulário de consulta.
- `static/styles.css`: Arquivo de estilos CSS.
- `static/script.js`: Arquivo de scripts JavaScript.
- `.env`: Arquivo de variáveis de ambiente.
- `run.py`: Script para iniciar a aplicação.

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
