import json
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import Config

class DatabaseManager:
    def __init__(self):
        self.conn = psycopg2.connect(**Config.DATABASE)
        self.create_tables()

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

    def store_data(self, cpfcnpj, data):
        if not data:
            return

        data_dict = data[0]

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

    def close_connection(self):
        self.conn.close()
