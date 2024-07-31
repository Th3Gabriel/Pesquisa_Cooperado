from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Length, InputRequired, ValidationError, Email

class CPFCNPJForm(FlaskForm):
    cpfcnpj = StringField('Pesquisa de Cooperados', validators=[InputRequired(), Length(min=11, max=14)])
    submit = SubmitField('Consultar')

    def validate_cpfcnpj(self, field):
        if not (field.data.isdigit() and (len(field.data) == 11 or len(field.data) == 14)):
            raise ValidationError('CPF ou CNPJ inválido.')

class EmailForm(FlaskForm):
    email = StringField('Pesquisa de Risco de Fraude', validators=[InputRequired(), Email()])
    submit = SubmitField('Consultar')

    def validate_email(self, field):
        if not "@" in field.data:
            raise ValidationError('Endereço de e-mail inválido.')
