from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Length, InputRequired, ValidationError

class CPFCNPJForm(FlaskForm):
    cpfcnpj = StringField('CPF/CNPJ', validators=[InputRequired(), Length(min=11, max=14)])
    submit = SubmitField('Consultar')

    def validate_cpfcnpj(self, field):
        if not (field.data.isdigit() and (len(field.data) == 11 or len(field.data) == 14)):
            raise ValidationError('CPF ou CNPJ inválido.')
