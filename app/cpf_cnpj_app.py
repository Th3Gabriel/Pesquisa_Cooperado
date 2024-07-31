import logging
from datetime import datetime, timedelta
from flask import render_template, jsonify, request, flash
from app.forms import CPFCNPJForm, EmailForm
from app.database_manager import DatabaseManager
from app.config import Config
import requests

class CPFCNPJApp:
    def __init__(self):
        self.form_cpfcnpj = CPFCNPJForm()
        self.form_email = EmailForm()
        self.db_manager = DatabaseManager()

    def consultar_api(self, cpfcnpj):
        logging.debug(f"Consultando API para CPF/CNPJ: {cpfcnpj}")
        API_URL_PF = "https://plataforma.bigdatacorp.com.br/pessoas"
        API_URL_PJ = "https://plataforma.bigdatacorp.com.br/empresas"
        HEADERS = {
            "accept": "application/json",
            "content-type": "application/json",
            "AccessToken": Config.API_ACCESS_TOKEN,
            "TokenId": Config.API_TOKEN_ID
        }

        if len(cpfcnpj) == 11:
            api_url = API_URL_PF
            payload = {
                "q": f"doc{{{cpfcnpj}}}",
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
        else:
            api_url = API_URL_PJ
            payload = {
                "q": f"doc{{{cpfcnpj}}}",
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
                    logging.error(f"No 'Result' found for CPF/CNPJ {cpfcnpj}. Response Data: {data}")
            else:
                logging.error(f"Failed to retrieve data for CPF/CNPJ {cpfcnpj}: {response.status_code}, {response.text}")
        except requests.exceptions.RequestException as e:
            logging.error(f"Error: {e}")

        return None

    def index(self):
        if request.method == 'POST' and 'cpfcnpj' in request.form:
            if self.form_cpfcnpj.validate_on_submit():
                cpfcnpj = self.form_cpfcnpj.cpfcnpj.data.strip()
                logging.debug(f"Form submitted with CPF/CNPJ: {cpfcnpj}")
                data = self.consultar_api(cpfcnpj)
                if data:
                    return jsonify(data)
                else:
                    flash('Erro ao consultar CPF/CNPJ. Por favor, tente novamente.', 'danger')
            else:
                response = jsonify({'errors': self.form_cpfcnpj.errors})
                response.status_code = 400
                return response

        return render_template('index.html', cpfcnpj_form=self.form_cpfcnpj, email_form=self.form_email)
