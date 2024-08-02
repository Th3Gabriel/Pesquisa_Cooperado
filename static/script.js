// Referências aos elementos dos formulários
const consultaPrincipalForm = document.getElementById('consultaForm');
const consultaEmailageForm = document.getElementById('consultaEmailForm');

// Referências aos ícones
const iconBdc = document.getElementById('icon_bdc_1'); // Atualizado para corresponder ao ID correto
const iconBdc2 = document.getElementById('icon_bdc_2');

// Função para exibir o formulário principal (CPF/CNPJ)
function showPrincipalForm() {
    consultaPrincipalForm.style.display = 'block';
    consultaEmailageForm.style.display = 'none';
}

// Função para exibir o formulário Emailage
function showEmailageForm() {
    consultaPrincipalForm.style.display = 'none';
    consultaEmailageForm.style.display = 'block';
}

// Adicionando eventos de clique aos ícones
iconBdc.addEventListener('click', showPrincipalForm);
iconBdc2.addEventListener('click', showEmailageForm);

document.addEventListener("DOMContentLoaded", function() {
    // Mostra a tela de carregamento quando o conteúdo da página é carregado
    document.getElementById('loadingScreen').style.visibility = 'visible';

    // Função para criar PDF do conteúdo do resultado
    document.getElementById('icon_pdf').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Pega o conteúdo do elemento com id resultado
        const resultadoElement = document.getElementById('resultado');
        const resultadoHtml = resultadoElement.innerHTML;

        // Converte o HTML para texto simples para evitar problemas de renderização
        const resultadoText = resultadoElement.innerText;

        // Adiciona o conteúdo ao PDF
        doc.text(resultadoText, 10, 10);

        // Salva o documento como resultado.pdf
        doc.save('resultado.pdf');
    });
});

window.onload = function() {
    // Esconde a tela de carregamento quando a página é completamente carregada
    document.getElementById('loadingScreen').style.visibility = 'hidden';
};

$(document).ready(function() {
    var translations = {
        "Age": "Idade",
        "FatherName": "Nome do Pai",
        "Gender": "Gênero",
        "MotherName": "Nome da Mãe",
        "Name": "Nome",
        "IsCurrentlyOnCollection": "Está em Cobrança",
        "FinancialActivityLevel": "Nível de Atividade Financeira",
        "IsFinancialSectorEmployee": "É Funcionário do Setor Financeiro",
        "IsFinancialSectorOwner": "É Proprietário do Setor Financeiro",
        "PossibleUtilizedBanks": "Bancos Utilizados",
        "RelatedFinancialInstitutionActivities": "Atividades Relacionadas à Instituições Financeiras",
        "LikelyInDebt": "Provavelmente Endividado",
        "CourtNameDistribution": "Distribuição de Nomes de Tribunal",
        "StateDistribution": "Distribuição por Estado",
        "TotalLawsuits": "Total de Processos",
        "TotalIncomeRange": "Faixa de Renda",
        "IsEmployed": "Está Empregado",
        "TotalActiveProfessions": "Total de Profissões Ativas",
        "TotalDiscounts": "Total de Descontos",
        "TotalIncome": "Renda Total",
        "TotalProfessions": "Total de Profissões",
        "AgeOfFirstJob": "Idade do Primeiro Emprego",
        "AvgYearsBetweenProfessionalTurnover": "Média de Anos Entre Mudanças de Profissão",
        "FirstJobAdmissionDate": "Data de Admissão no Primeiro Emprego",
        "HasWorkedInPrivateSector": "Trabalhou no Setor Privado",
        "HasWorkedInPublicSector": "Trabalhou no Setor Público",
        "IsCurrentlyEmployed": "Está Atualmente Empregado",
        "IsEntrepeneur": "É Empreendedor",
        "MaxYearsBetweenProfessionalTurnover": "Máximo de Anos Entre Mudanças de Profissão",
        "MinYearsBetweenProfessionalTurnover": "Mínimo de Anos Entre Mudanças de Profissão",
        "TotalProfessionalTurnover": "Total de Mudanças de Profissão",
        "TotalProfessionalTurnoverIn10Years": "Total de Mudanças de Profissão em 10 Anos",
        "TotalProfessionalTurnoverIn15Years": "Total de Mudanças de Profissão em 15 Anos",
        "TotalProfessionalTurnoverIn5Years": "Total de Mudanças de Profissão em 5 Anos",
        "NumberOfUndergraduateCourses": "Número de Cursos de Graduação",
        "PublicationHistory": "Histórico de Publicações",
        "ScholarshipHistory": "Histórico de Bolsas de Estudo",
        "BasicData": "Dados Básicos",
        "Collections": "Cobrança",
        "FinancialInterests": "Interesses Financeiros",
        "IndebtednessQuestion": "Endividamento",
        "LawsuitsDistributionData": "Dados de Distribuição de Ações Judiciais",
        "ProfessionData": "Dados de Profissão",
        "ProfessionalTurnover": "Rotatividade Profissional",
        "Scholarship": "Escolaridade",
        "Phones": "Telefones",
        "Primary": "Primário",
        "Secondary": "Secundário",
        "AreaCode": "Código de Área",
        "Complement": "Complemento",
        "CountryCode": "Código de País",
        "LastUpdateDate": "Última Atualização",
        "Number": "Número",
        "PhoneNumberOfEntities": "Número de Telefone das Entidades",
        "Type": "Tipo",
        "Domain": "Domínio",
        "EmailAddress": "Endereço de E-mail",
        "UserName": "Nome de Usuário",
        "CurrentConsecutiveCollectionMonths": "Meses Atuais de Cobrança Consecutivos",
        "MaxConsecutiveCollectionMonths": "Máximo de Meses de Cobrança Consecutivos",
        "TotalCollectionOccurrences": "Ocorrências Totais de Cobrança",
        "TotalCollectionOrigins": "Origens Totais de Cobrança",
        "CompanyGroups": "Grupos de Empresas",
        "TotalCompanies": "Total de Empresas",
        "TotalEmployeesRange": "Faixa Total de Empregados",
        "GovernmentDebtors": "Devedores Governamentais",
        "Debts": "Dívidas",
        "TotalDebtValue": "Valor Total da Dívida",
        "TotalDebtValuePerOrigin": "Valor Total da Dívida por Origem",
        "TotalDebts": "Total de Dívidas",
        "TotalDebtsPerOrigin": "Total de Dívidas por Origem",
        "MatchKeys": "Chaves de Correspondência",
        "RegistrationData": "Dados de Registro",
        "Addresses": "Endereços",
        "AddressMain": "Endereço Principal",
        "City": "Cidade",
        "Country": "País",
        "Neighborhood": "Bairro",
        "Numero": "Número",
        "State": "Estado",
        "Title": "Título",
        "ZipCode": "Código Postal",
        "ComplementType": "Tipo de Complemento",
        "Ultima Atualização": "Última Atualização",
        "Typology": "Tipologia",
        "Activity": "Atividade",
        "Code": "Código",
        "IsMain": "É Principal",
        "AdditionalOutputData": "Dados de Saída Adicionais",
        "FoundedDate": "Data de Fundação",
        "IsHeadquarter": "É Sede",
        "LegalNature": "Natureza Jurídica",
        "OfficialName": "Nome Oficial",
        "TaxIdNumber": "Número de Identificação Fiscal",
        "TaxIdStatus": "Status do Número de Identificação Fiscal",
        "TaxIdStatusDate": "Data do Status do Número de Identificação Fiscal",
        "TradeName": "Nome Comercial",
        "IsLikelyDigitalBank": "É provável que seja um banco digital",
        "BankName": "Nome do Banco",
        "false": "Falso",
        "true": "Verdadeiro",
        "VERY LOW": "Muito Baixo",
        "LOW": "Baixo",
        "HIGH": "Alto",
        "VERY HIGH": "Muito Alto",
        "M": "MASCULINO",
        "F": "FEMININO",
        "GRADUATED": "GRADUADO",
        "EMPLOYMENT": "Empregado",
        "Institution" : "Instituição",
        "Level" : "Nivel",
        "EducationalLevel" : "Nivel de Educação",
        "EAAdvice": "Recomendação EA",
        "Moderate Fraud Risk": "Risco Moderado de Fraude",
        "EAAdviceID": "ID de Recomendação EA",
        "EAReason": "Motivo EA",
        "Limited History for Email": "Histórico Limitado para Email",
        "EAReasonID": "ID de Motivo EA",
        "EARiskBand": "Faixa de Risco EA",
        "Fraud Score 301 to 600": "Pontuação de Fraude de 301 a 600",
        "EARiskBandID": "ID de Faixa de Risco EA",
        "EAScore": "Pontuação EA",
        "EAStatusID": "ID de Status EA",
        "billAddressToFullNameConfidence": "Confiança de Endereço de Cobrança para Nome Completo",
        "billAddressToLastNameConfidence": "Confiança de Endereço de Cobrança para Sobrenome",
        "company": "Empresa",
        "Sicoob": "Sicoob",
        "correlationId": "ID de Correlação",
        "b00e1cdb-6fd0-41e6-94f0-4edf0148abd4": "b00e1cdb-6fd0-41e6-94f0-4edf0148abd4",
        "country": "País",
        "BR": "Brasil",
        "disDescription": "Descrição",
        "domainAge": "Idade do Domínio",
        "1999-03-05T00:00:00Z": "1999-03-05T00:00:00Z",
        "domainExists": "Domínio Existe",
        "Yes": "Sim",
        "domain_creation_days": "Dias de Criação do Domínio",
        "domaincategory": "Categoria do Domínio",
        "Financial": "Financeiro",
        "domaincompany": "Empresa do Domínio",
        "domaincorporate": "Domínio Corporativo",
        "domaincountryname": "Nome do País do Domínio",
        "Brazil": "Brasil",
        "domainname": "Nome do Domínio",
        "sicoob.com.br": "sicoob.com.br",
        "domainrelevantinfo": "Informação Relevante do Domínio",
        "Low Risk Domain Category": "Categoria de Domínio de Baixo Risco",
        "domainrelevantinfoID": "ID de Informação Relevante do Domínio",
        "domainriskcountry": "País de Risco do Domínio",
        "No": "Não",
        "domainrisklevel": "Nível de Risco do Domínio",
        "Low": "Baixo",
        "domainrisklevelID": "ID de Nível de Risco do Domínio",
        "eName": "Nome Eletrônico",
        "email": "Email",
        "gabriel.paz@sicoob.com.br": "gabriel.paz@sicoob.com.br",
        "emailAge": "Idade do Email",
        "emailExists": "Email Existe",
        "Not Sure": "Não Certeza",
        "emailToBillAddressConfidence": "Confiança de Email para Endereço de Cobrança",
        "emailToFullNameConfidence": "Nível de Confiança do Nome",
        "emailToIpConfidence": "Confiança de Email para IP",
        "emailToLastNameConfidence": "Confiança de Email para Sobrenome",
        "emailToPhoneConfidence": "Confiança de Email para Telefone",
        "emailToShipAddressConfidence": "Confiança de Email para Endereço de Entrega",
        "email_creation_days": "Dias de Criação do Email",
        "firstVerificationDate": "Data da Primeira Verificação",
        "2024-07-18T18:47:13Z": "2024-07-18T18:47:13Z",
        "first_seen_days": "Primeiros Dias Vistos",
        "fraudRisk": "Risco de Fraude",
        "500 Moderate": "500 Moderado",
        "fraud_type": "Tipo de Fraude",
        "ipToBillAddressConfidence": "Confiança de IP para Endereço de Cobrança",
        "ipToFullNameConfidence": "Confiança de IP para Nome Completo",
        "ipToLastNameConfidence": "Confiança de IP para Sobrenome",
        "ipToPhoneConfidence": "Confiança de IP para Telefone",
        "ipToShipAddressConfidence": "Confiança de IP para Endereço de Entrega",
        "lastVerificationDate": "Data da Última Verificação",
        "2024-07-18T18:47:30Z": "2024-07-18T18:47:30Z",
        "lastflaggedon": "Último Marcado em",
        "location": "Localização",
        "overallDigitalIdentityScore": "Pontuação Geral de Identidade Digital",
        "phoneToBillAddressConfidence": "Confiança de Telefone para Endereço de Cobrança",
        "phoneToFullNameConfidence": "Confiança de Telefone para Nome Completo",
        "phoneToLastNameConfidence": "Confiança de Telefone para Sobrenome",
        "phoneToShipAddressConfidence": "Confiança de Telefone para Endereço de Entrega",
        "phone_status": "Status do Telefone",
        "shipAddressToBillAddressConfidence": "Confiança de Endereço de Entrega para Endereço de Cobrança",
        "shipAddressToFullNameConfidence": "Confiança de Endereço de Entrega para Nome Completo",
        "shipAddressToLastNameConfidence": "Confiança de Endereço de Entrega para Sobrenome",
        "shipforward": "Envio Adiante",
        "No": "Não",
        "smfriends": "Amigos de Mídia Social",
        "smlinks": "Links de Mídia Social",
        "source_industry": "Indústria Fonte",
        "status": "Status",
        "ValidDomain": "Domínio Válido",
        "title": "Título",
        "totalhits": "Total de Acessos",
        "transAmount": "Quantidade da Transação",
        "transCurrency": "Moeda da Transação",
        "uniquehits": "Acessos Únicos",
        "userdefinedrecordid": "ID de Registro Definido pelo Usuário",
        "VERY HIGH": "Muito Alto",
        "M": "Masculino",
        "F": "Feminino",
        "GRADUATED": "Graduado",
        "EMPLOYMENT": "Empregado",
        "Institution": "Instituição",
        "Level": "Nível",
        "EducationalLevel": "Nível de Educação"
        // Adicione todas as traduções relevantes aqui
    };

    // Chaves a serem ignoradas no resultado
    var ignoredKeys = ["Data do Status do Número de Identificação Fiscal", "MatchKeys"];

    // Função para criar um item de resultado com base no rótulo e valor fornecidos
    function createResultItem(label, value) {
        var translatedLabel = translations[label] || label; // Traduz o rótulo se houver tradução disponível

        if (typeof value === 'object' && value !== null) {
            // Se o valor for um objeto, cria uma lista de itens de resultado
            var result = '';
            for (var subKey in value) {
                if (value.hasOwnProperty(subKey)) {
                    result += createResultItem(subKey, value[subKey]);
                }
            }
            return result;
        } else {
            // Traduz o valor se houver tradução disponível
            var translatedValue = translations[value] || value;
            return '<div class="result-item"><strong>' + translatedLabel + ':</strong> ' + translatedValue + '</div>';
        }
    }

    // Manipulador de envio do formulário de consulta CPF/CNPJ
    $('#consultaForm').on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: '/', // URL para enviar o formulário
            type: 'POST', // Método HTTP para envio
            data: $(this).serialize(), // Serializa os dados do formulário
            success: function(data) {
                var resultadoDiv = $('#resultado');
                resultadoDiv.empty();

                data.forEach(function(item) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key) && !ignoredKeys.includes(key)) {
                            var value = item[key];
                            var resultItem = createResultItem(key, value);

                            var groupName = key;
                            if (translations[groupName]) {
                                groupName = translations[groupName];
                            }

                            var resultGroup = $('<div class="result-group bordered-box">');
                            var resultGroupHeader = $('<div class="result-group-header"><strong>' + groupName + '</strong></div>');
                            var resultGroupContent = $('<div class="result-group-content">' + resultItem + '</div>');

                            resultGroup.append(resultGroupHeader);
                            resultGroup.append(resultGroupContent);
                            resultadoDiv.append(resultGroup);
                        }
                    }
                });
            },
            error: function(xhr, status, error) {
                var resultadoDiv = $('#resultado');
                resultadoDiv.empty();
                if (xhr.responseJSON && xhr.responseJSON.errors) {
                    // Exibe mensagens de erro específicas do formulário
                    for (const [key, messages] of Object.entries(xhr.responseJSON.errors)) {
                        messages.forEach(message => {
                            resultadoDiv.append('<p class="text-red-500">' + message + '</p>');
                        });
                    }
                } else {
                    // Exibe mensagem de erro genérica
                    resultadoDiv.append('<p class="text-red-500">Erro ao consultar CPF/CNPJ. Por favor, tente novamente.</p>');
                }
            }
        });
    });
// Manipulador de envio do formulário de consulta EmailAge
$('#consultaEmailForm').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
        url: '/email', // URL para enviar o formulário
        type: 'POST', // Método HTTP para envio
        data: $(this).serialize(), // Serializa os dados do formulário
        success: function(data) {
            var resultadoDiv = $('#resultado');
            resultadoDiv.empty();

            var emailData = data.query.results[0];
            var filteredKeys = [
                "emailExists",
                "domainExists",
                "first_seen_days",
                "EARiskBandID",
                "emailToFullNameConfidence"
            ];

            filteredKeys.forEach(function(key) {
                if (emailData.hasOwnProperty(key)) {
                    var value = emailData[key];
                    var resultItem = createResultItem(key, value);

                    var translatedLabel = translations[key] || key;
                    var resultGroup = $('<div class="result-group bordered-box">');
                    var resultGroupHeader = $('<div class="result-group-header"><strong>' + translatedLabel + '</strong></div>');
                    var resultGroupContent = $('<div class="result-group-content">' + resultItem + '</div>');

                    resultGroup.append(resultGroupHeader);
                    resultGroup.append(resultGroupContent);
                    resultadoDiv.append(resultGroup);
                }
            });
        },
        error: function(xhr, status, error) {
            var resultadoDiv = $('#resultado');
            resultadoDiv.empty();
            if (xhr.responseJSON && xhr.responseJSON.errors) {
                // Exibe mensagens de erro específicas do formulário
                for (const [key, messages] of Object.entries(xhr.responseJSON.errors)) {
                    messages.forEach(message => {
                        resultadoDiv.append('<p class="text-red-500">' + message + '</p>');
                    });
                }
            } else {
                // Exibe mensagem de erro genérica
                resultadoDiv.append('<p class="text-red-500">Erro ao consultar o e-mail. Por favor, tente novamente.</p>');
            }
        }
    });
});

    // Botão para limpar os resultados e resetar o formulário
    $('#limparResultado').on('click', function(event) {
        event.preventDefault();
        $('#resultado').empty();
        $('#consultaForm').trigger('reset');
    });

    // Botão para limpar os resultados e resetar o formulário de e-mail
    $('#limparResultadoEmail').on('click', function(event) {
        event.preventDefault();
        $('#resultado').empty();
        $('#consultaEmailForm').trigger('reset');
    });
});