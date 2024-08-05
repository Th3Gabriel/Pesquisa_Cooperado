import logging
from flask import render_template, jsonify, request, flash
from emailage.client import EmailageClient
from app.forms import EmailForm
from app.database_manager import DatabaseManager
from app.config import Config

class EmailApp:
    def __init__(self):
        self.form_email = EmailForm()
        self.client = EmailageClient(Config.EMAILAGE_ACCOUNT_SID, Config.EMAILAGE_AUTH_TOKEN)
        self.db_manager = DatabaseManager()

    def consultar_email(self, email):
        logging.debug(f"Consultando Emailage API para o e-mail: {email}")
        try:
            response = self.client.query(email)
            if response:
                # Armazenar os dados no banco
                self.db_manager.store_email_data(email, response)
                return response
            else:
                logging.error(f"Não foi encontrado resultado para o e-mail {email}.")
        except Exception as e:
            logging.error(f"Erro ao consultar o e-mail {email}: {e}")
        return None

    def index(self):
        if request.method == 'POST' and 'email' in request.form:
            if self.form_email.validate_on_submit():
                email = self.form_email.email.data.strip()
                logging.debug(f"Formulário submetido com e-mail: {email}")
                email_data = self.consultar_email(email)
                if email_data:
                    return jsonify(email_data)
                else:
                    flash('Erro ao consultar o e-mail. Por favor, tente novamente.', 'danger')
            else:
                response = jsonify({'errors': self.form_email.errors})
                response.status_code = 400
                return response

        return render_template('index.html', cpfcnpj_form=CPFCNPJForm(), email_form=self.form_email)
