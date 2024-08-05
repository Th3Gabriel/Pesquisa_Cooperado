import json
import mysql.connector
from mysql.connector import errorcode
from app.config import Config
import logging

class DatabaseManager:
    def __init__(self):
        db_config = Config.DATABASE
        try:
            self.conn = mysql.connector.connect(
                user=db_config['user'],
                password=db_config['password'],
                host=db_config['host'],
                database=db_config['dbname'],
                port=db_config['port']
            )
            self.create_tables()
            logging.info("Database connection established and tables created.")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                logging.error("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                logging.error("Database does not exist")
            else:
                logging.error(err)

    def create_tables(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS cpf_BigDataCorp (
                    cpf VARCHAR(11) PRIMARY KEY,
                    name VARCHAR(255),
                    age INT,
                    gender VARCHAR(10),
                    PossibleUtilizedBanks TEXT,
                    FinancialActivityLevel VARCHAR(50),
                    IsFinancialSectorEmployee BOOLEAN,
                    IsFinancialSectorOwner BOOLEAN,
                    IsEntrepeneur BOOLEAN,
                    IsCurrentlyEmployed BOOLEAN,
                    mother_name VARCHAR(255),
                    father_name VARCHAR(255),
                    total_income DECIMAL(10,2),
                    total_professions INT,
                    is_employed BOOLEAN,
                    total_lawsuits INT,
                    state_distribution JSON,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS cnpj_BigDataCorp (
                    cnpj VARCHAR(14) PRIMARY KEY,
                    trade_name VARCHAR(255),
                    legal_nature VARCHAR(255),
                    tax_Id VARCHAR(20),
                    TotalCollectionOrigins INT,
                    IsCurrentlyOnCollection BOOLEAN,
                    addresses TEXT,
                    founded_date DATE,
                    total_employees_range VARCHAR(50),
                    total_income_range VARCHAR(50),
                    total_debts INT,
                    total_debt_value DECIMAL(10,2),
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            # Adiciona criação da tabela email_info
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS email_info (
                    email VARCHAR(255) PRIMARY KEY,
                    risk_score DECIMAL(5,2),
                    fraud_reported BOOLEAN,
                    risk_level VARCHAR(50),
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            self.conn.commit()
        except mysql.connector.Error as err:
            logging.error(f"Error creating tables: {err}")
        finally:
            cursor.close()

    def get_data(self, cpfcnpj):
        if len(cpfcnpj) == 11:
            table = 'cpf_BigDataCorp'
            column = 'cpf'
        else:
            table = 'cnpj_BigDataCorp'
            column = 'cnpj'

        cursor = self.conn.cursor(dictionary=True)
        try:
            cursor.execute(f'SELECT * FROM {table} WHERE {column} = %s', (cpfcnpj,))
            record = cursor.fetchone()
            if record and 'state_distribution' in record and isinstance(record['state_distribution'], str):
                record['state_distribution'] = json.loads(record['state_distribution'])
            logging.debug(f"Data retrieved for CPF/CNPJ {cpfcnpj}: {record}")
        except mysql.connector.Error as err:
            logging.error(f"Error fetching data for CPF/CNPJ {cpfcnpj}: {err}")
        finally:
            cursor.close()

        return record

    def store_data(self, cpfcnpj, data):
        if not data:
            logging.warning("No data to store.")
            return

        data_dict = data[0]
        logging.debug(f"Data to store for CPF/CNPJ {cpfcnpj}: {data_dict}")

        if len(cpfcnpj) == 11:
            table = 'cpf_BigDataCorp'
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
                ON DUPLICATE KEY UPDATE
                name = VALUES(name), 
                age = VALUES(age), 
                gender = VALUES(gender), 
                mother_name = VALUES(mother_name),
                father_name = VALUES(father_name), 
                total_income = VALUES(total_income), 
                PossibleUtilizedBanks = VALUES(PossibleUtilizedBanks),
                FinancialActivityLevel = VALUES(FinancialActivityLevel), 
                IsFinancialSectorEmployee = VALUES(IsFinancialSectorEmployee),
                IsFinancialSectorOwner = VALUES(IsFinancialSectorOwner),
                IsEntrepeneur = VALUES(IsEntrepeneur),
                IsCurrentlyEmployed = VALUES(IsCurrentlyEmployed),
                total_professions = VALUES(total_professions),
                is_employed = VALUES(is_employed), 
                total_lawsuits = VALUES(total_lawsuits), 
                state_distribution = VALUES(state_distribution),
                last_updated = VALUES(last_updated)
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
            table = 'cnpj_BigDataCorp'
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
                ON DUPLICATE KEY UPDATE
                trade_name = VALUES(trade_name), 
                legal_nature = VALUES(legal_nature), 
                tax_Id = VALUES(tax_Id),
                TotalCollectionOrigins = VALUES(TotalCollectionOrigins), 
                IsCurrentlyOnCollection = VALUES(IsCurrentlyOnCollection),
                addresses = VALUES(addresses), 
                founded_date = VALUES(founded_date), 
                total_employees_range = VALUES(total_employees_range),
                total_income_range = VALUES(total_income_range), 
                total_debts = VALUES(total_debts), 
                total_debt_value = VALUES(total_debt_value),
                last_updated = VALUES(last_updated)
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

        try:
            cursor = self.conn.cursor()
            cursor.execute(query, values)
            self.conn.commit()
            logging.debug(f"Data successfully stored for CPF/CNPJ {cpfcnpj}")
        except mysql.connector.Error as err:
            logging.error(f"Error storing data for CPF/CNPJ {cpfcnpj}: {err}")
        finally:
            cursor.close()

    def store_email_data(self, email, data):
        query = '''
            INSERT INTO email_info (email, risk_score, fraud_reported, risk_level, last_updated)
            VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
            ON DUPLICATE KEY UPDATE
            risk_score = VALUES(risk_score),
            fraud_reported = VALUES(fraud_reported),
            risk_level = VALUES(risk_level),
            last_updated = VALUES(last_updated)
        '''

        values = (
            email,
            data.get('riskScore'),
            data.get('fraudReported'),
            data.get('riskLevel')
        )

        try:
            cursor = self.conn.cursor()
            cursor.execute(query, values)
            self.conn.commit()
            logging.debug(f"Email data successfully stored for {email}")
        except mysql.connector.Error as err:
            logging.error(f"Error storing email data for {email}: {err}")
        finally:
            cursor.close()

    def close_connection(self):
        try:
            self.conn.close()
            logging.info("Database connection closed.")
        except mysql.connector.Error as err:
            logging.error(f"Error closing database connection: {err}")
