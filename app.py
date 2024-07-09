import json
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
from flask import Flask, render_template, jsonify, request, flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Length, InputRequired, ValidationError
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave_secreta'
DATABASE = {
    'dbname': 'database',
    'user': 'postgres',
    'password': 'admin',
    'host': 'localhost',
    'port': '5432'
}

# Definição da classe do formulário com validação
class CPFCNPJForm(FlaskForm):
    cpfcnpj = StringField('CPF/CNPJ', validators=[InputRequired(), Length(min=11, max=14)])
    submit = SubmitField('Consultar')

    # Validador personalizado para CPF/CNPJ
    def validate_cpfcnpj(self, field):
        if not (field.data.isdigit() and (len(field.data) == 11 or len(field.data) == 14)):
            raise ValidationError('CPF ou CNPJ inválido.')

# Gerenciador de banco de dados PostgreSQL
class DatabaseManager:
    def __init__(self):
        self.conn = psycopg2.connect(**DATABASE)
        self.create_tables()

    # Criação das tabelas no banco de dados se não existirem
    def create_tables(self):
        with self.conn.cursor() as cursor:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS cpf_data (
                    cpf TEXT PRIMARY KEY,
                    name TEXT,
                    age INTEGER,
                    gender TEXT,
                    PossibleUtilizedBanks TEXT,
                    FinancialActivityLevel TEXT,
                    IsFinancialSectorEmployee BOOLEAN,
                    IsFinancialSectorOwner BOOLEAN,
                    IsEntrepeneur BOOLEAN,
                    IsCurrentlyEmployed BOOLEAN,
                    mother_name TEXT,
                    father_name TEXT,
                    total_income NUMERIC,
                    total_professions INTEGER,
                    is_employed BOOLEAN,
                    total_lawsuits INTEGER,
                    state_distribution JSONB,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS cnpj_data (
                    cnpj TEXT PRIMARY KEY,
                    trade_name TEXT,
                    legal_nature TEXT,
                    tax_Id TEXT,
                    TotalCollectionOrigins INTEGER,
                    IsCurrentlyOnCollection BOOLEAN,
                    addresses TEXT,
                    founded_date DATE,
                    total_employees_range TEXT,
                    total_income_range TEXT,
                    total_debts INTEGER,
                    total_debt_value NUMERIC,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            self.conn.commit()

    # Obtém os dados do banco de dados
    def get_data(self, cpfcnpj):
        if len(cpfcnpj) == 11:
            table = 'cpf_data'
            column = 'cpf'
        else:
            table = 'cnpj_data'
            column = 'cnpj'

        with self.conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(f'SELECT * FROM {table} WHERE {column} = %s', (cpfcnpj,))
            record = cursor.fetchone()
            if record and 'state_distribution' in record and isinstance(record['state_distribution'], str):
                record['state_distribution'] = json.loads(record['state_distribution'])
        return record

    # Armazena os dados no banco de dados
    def store_data(self, cpfcnpj, data):
        if not data:
            return

        data_dict = data[0]  # Acessa o primeiro item da lista

        if len(cpfcnpj) == 11:
            table = 'cpf_data'
            column = 'cpf'
            query = f'''
                INSERT INTO {table} ({column}, 
                name, 
                age, 
                gender, 
                mother_name, 
                father_name, 
                total_income,
                PossibleUtilizedBanks, 
                FinancialActivityLevel, 
                IsFinancialSectorEmployee, 
                IsFinancialSectorOwner,
                IsEntrepeneur,
                IsCurrentlyEmployed,
                total_professions, 
                is_employed, 
                total_lawsuits, 
                state_distribution, 
                last_updated)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, CURRENT_TIMESTAMP)
                ON CONFLICT ({column}) DO UPDATE
                SET name = EXCLUDED.name, 
                age = EXCLUDED.age, 
                gender = EXCLUDED.gender, 
                mother_name = EXCLUDED.mother_name,
                father_name = EXCLUDED.father_name, 
                total_income = EXCLUDED.total_income, 
                PossibleUtilizedBanks = EXCLUDED.PossibleUtilizedBanks,
                FinancialActivityLevel = EXCLUDED.FinancialActivityLevel, 
                IsFinancialSectorEmployee = EXCLUDED.IsFinancialSectorEmployee,
                IsFinancialSectorOwner = EXCLUDED.IsFinancialSectorOwner,
                IsEntrepeneur = EXCLUDED.IsEntrepeneur,
                IsCurrentlyEmployed = EXCLUDED.IsCurrentlyEmployed,
                total_professions = EXCLUDED.total_professions,
                is_employed = EXCLUDED.is_employed, 
                total_lawsuits = EXCLUDED.total_lawsuits, 
                state_distribution = EXCLUDED.state_distribution,
                last_updated = EXCLUDED.last_updated
            '''

            values = (
                cpfcnpj,
                data_dict.get('BasicData', {}).get('Name'),
                data_dict.get('BasicData', {}).get('Age'),
                data_dict.get('BasicData', {}).get('Gender'),
                data_dict.get('BasicData', {}).get('MotherName'),
                data_dict.get('BasicData', {}).get('FatherName'),
                data_dict.get('ProfessionData', {}).get('TotalIncome'),
                ' - '.join(bank.get('BankName', '') for bank in data_dict.get('FinancialInterests', {}).get('PossibleUtilizedBanks', [])),
                data_dict.get('FinancialInterests', {}).get('FinancialActivityLevel'),
                data_dict.get('FinancialInterests', {}).get('IsFinancialSectorEmployee'),
                data_dict.get('FinancialInterests', {}).get('IsFinancialSectorOwner'),
                data_dict.get('ProfessionalTurnover', {}).get('IsEntrepeneur'),
                data_dict.get('ProfessionalTurnover', {}).get('IsCurrentlyEmployed'),
                data_dict.get('ProfessionData', {}).get('TotalProfessions'),
                data_dict.get('ProfessionData', {}).get('IsEmployed'),
                data_dict.get('LawsuitsDistributionData', {}).get('TotalLawsuits'),
                json.dumps(data_dict.get('LawsuitsDistributionData', {}).get('StateDistribution'))
            )
        else:
            table = 'cnpj_data'
            column = 'cnpj'
            query = f'''
                INSERT INTO {table} ({column}, 
                trade_name, 
                legal_nature, 
                tax_Id, 
                TotalCollectionOrigins,
                IsCurrentlyOnCollection, 
                addresses, 
                founded_date, 
                total_employees_range, 
                total_income_range,
                total_debts, 
                total_debt_value, 
                last_updated)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT ({column}) DO UPDATE
                SET trade_name = EXCLUDED.trade_name, 
                legal_nature = EXCLUDED.legal_nature, 
                tax_Id = EXCLUDED.tax_Id,
                TotalCollectionOrigins = EXCLUDED.TotalCollectionOrigins, 
                IsCurrentlyOnCollection = EXCLUDED.IsCurrentlyOnCollection,
                addresses = EXCLUDED.addresses, 
                founded_date = EXCLUDED.founded_date, 
                total_employees_range = EXCLUDED.total_employees_range,
                total_income_range = EXCLUDED.total_income_range, 
                total_debts = EXCLUDED.total_debts, 
                total_debt_value = EXCLUDED.total_debt_value,
                last_updated = EXCLUDED.last_updated
            '''

            values = (
                cpfcnpj,
                data_dict.get('RegistrationData', {}).get('BasicData', {}).get('TradeName'),
                f"{data_dict.get('RegistrationData', {}).get('BasicData', {}).get('LegalNature', {}).get('Code', '')} - {data_dict.get('RegistrationData', {}).get('BasicData', {}).get('LegalNature', {}).get('Activity', '')}",
                data_dict.get('RegistrationData', {}).get('BasicData', {}).get('TaxIdStatus'),
                data_dict.get('Collections', {}).get('TotalCollectionOrigins'),
                data_dict.get('Collections', {}).get('IsCurrentlyOnCollection'),
                f"{data_dict.get('RegistrationData', {}).get('Addresses', {}).get('Primary', {}).get('City', '')} - {data_dict.get('RegistrationData', {}).get('Addresses', {}).get('Primary', {}).get('State', '')}",
                data_dict.get('RegistrationData', {}).get('BasicData', {}).get('FoundedDate'),
                data_dict.get('CompanyGroups', [{}])[0].get('TotalEmployeesRange'),
                data_dict.get('CompanyGroups', [{}])[0].get('TotalIncomeRange'),
                data_dict.get('GovernmentDebtors', {}).get('TotalDebts'),
                data_dict.get('GovernmentDebtors', {}).get('TotalDebtValue')
            )

        with self.conn.cursor() as cursor:
            cursor.execute(query, values)
            self.conn.commit()

    # Fecha a conexão com o banco de dados
    def close_connection(self):
        self.conn.close()

# Classe principal da aplicação
class CPFCNPJApp:
    def __init__(self):
        self.form = CPFCNPJForm()
        self.db_manager = DatabaseManager()

    # Consulta à API externa
    def consultar_api(self, cpfcnpj):
        API_URL_PF = "https://plataforma.bigdatacorp.com.br/pessoas"
        API_URL_PJ = "https://plataforma.bigdatacorp.com.br/empresas"
        HEADERS = {
            "accept": "application/json",
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR0FCUklFTC5QQVpAU0lDT09CLkNPTS5CUiIsImp0aSI6ImM3NTIxZTMzLTE0MTMtNDcwMy04OTk0LTJjODE3ZTQxNjA3ZSIsIm5hbWVVc2VyIjoiR2FicmllbCBNYXJ0aW5zIFBheiIsInVuaXF1ZV9uYW1lIjoiR0FCUklFTC5QQVpAU0lDT09CLkNPTS5CUiIsImRvbWFpbiI6IlNJQ09PQiBVTklDRU5UUk8gQlIiLCJwcm9kdWN0cyI6WyJCSUdCT09TVCIsIkJJR0lEIl0sIm5iZiI6MTcxODM2NDc3NCwiZXhwIjoxNzQ5OTAwNzc0LCJpYXQiOjE3MTgzNjQ3NzQsImlzcyI6IkJpZyBEYXRhIENvcnAuIn0.G8JqjvQDYS2iOWvYhDtuoZPaAC52lNN2QxUXf5ZOMk4",
            "TokenId": "666c2a66434fddec816f5680"
        }

        if len(cpfcnpj) == 11:
            api_url = API_URL_PF
            payload = {
                "q": f"doc{{{cpfcnpj}}}",  # Query para buscar pelo CPF específico
                "Datasets": (
                    "basic_data {Name, Gender, Age, MotherName, FatherName}, "
                    "university_student_data {ScholarshipHistory, PublicationHistory, NumberOfUndergraduateCourses}, "
                    "occupation_data{TotalProfessions,TotalActiveProfessions,TotalIncome, TotalIncomeRange, TotalDiscounts, IsEmployed}, "
                    "financial_interests{FinancialActivityLevel, IsFinancialSectorOwner, IsFinancialSectorEmployee, RelatedFinancialInstitutionActivities ,PossibleUtilizedBanks}, "
                    "professional_turnover{IsCurrentlyEmployed, IsEntrepeneur, HasWorkedInPrivateSector, HasWorkedInPublicSector}, "
                    "lawsuits_distribution_data{TotalLawsuits, Distribuição dos tipos de processos,CourtNameDistribution,StateDistribution}, "
                    "collections{IsCurrentlyOnCollection}, "
                    "indebtedness_question{LikelyInDebt}"
                )
            }
        else:  # Caso contrário, é CNPJ
            api_url = API_URL_PJ  # URL para consulta de pessoa jurídica
            payload = {
                "q": f"doc{{{cpfcnpj}}}",  # Query para buscar pelo CNPJ específico
                "Datasets": (
                    "registration_data, "
                    "collections{IsCurrentlyOnCollection, TotalCollectionOccurrences, TotalCollectionOrigins, CurrentConsecutiveCollectionMonths, MaxConsecutiveCollectionMonths}, "
                    "OwnersLawsuitsDistributionData{TotalOwners,MaxLawsuitsPerOwner,TypeDistribution, StatusDistribution, CourtNameDistribution, CourtTypeDistribution}, "
                    "LawsuitsDistributionData{TotalLawsuits, TypeDistribution},"
                    "company_group_rfcontact{TotalCompanies, TotalIncomeRange, TotalEmployeesRange}, "
                    "government_debtors{TotalDebtValue, TotalDebts}"
                )
            }
        try:
            response = requests.post(api_url, json=payload, headers=HEADERS)
            if response.status_code == 200:
                data = response.json()
                if "Result" in data:
                    return data["Result"]
                else:
                    print(f"No 'Result' found for CPF/CNPJ {cpfcnpj}")
                    print(f"Response Data: {data}")
            else:
                print(f"Failed to retrieve data for CPF/CNPJ {cpfcnpj}: {response.status_code}, {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")

        return None

    # Página inicial da aplicação
    def index(self):
        if self.form.validate_on_submit():
            cpfcnpj = self.form.cpfcnpj.data.strip()
            record = self.db_manager.get_data(cpfcnpj)
            if record:
                if 'data' in record and record['last_updated'] > datetime.now() - timedelta(days=30):
                    data = record['data']
                else:
                    data = self.consultar_api(cpfcnpj)
                    if data:
                        self.db_manager.store_data(cpfcnpj, data)
                if data:
                    return jsonify(data)
                else:
                    flash('Erro ao consultar CPF/CNPJ. Por favor, tente novamente.', 'danger')
            else:
                # Se não há registro no banco de dados, realiza a consulta na API
                data = self.consultar_api(cpfcnpj)
                if data:
                    self.db_manager.store_data(cpfcnpj, data)
                    return jsonify(data)
                else:
                    flash('Erro ao consultar CPF/CNPJ. Por favor, tente novamente.', 'danger')

        if request.method == 'POST' and not self.form.validate_on_submit():
            response = jsonify({'errors': self.form.errors})
            response.status_code = 400
            return response

        return render_template('index.html', form=self.form)


# Rota principal do aplicativo Flask
@app.route('/', methods=['GET', 'POST'])
def index():
    app = CPFCNPJApp()
    return app.index()