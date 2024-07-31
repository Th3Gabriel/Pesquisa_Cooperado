// Referências aos elementos dos formulários
const consultaPrincipalForm = document.getElementById('consultaForm');
const consultaEmailageForm = document.getElementById('consultaEmailForm');

// Referências aos ícones
const iconBdc = document.getElementById('icon_bdc_1');
const iconBdc2 = document.getElementById('icon_bdc_2');

// Função para exibir o formulário principal (CPF/CNPJ) com animação
function showPrincipalForm() {
    consultaEmailageForm.classList.add('slide-exit');
    consultaEmailageForm.classList.add('slide-exit-active');
    consultaPrincipalForm.classList.add('slide-enter');
    
    setTimeout(() => {
        consultaEmailageForm.style.display = 'none';
        consultaEmailageForm.classList.remove('slide-exit');
        consultaEmailageForm.classList.remove('slide-exit-active');

        consultaPrincipalForm.style.display = 'block';
        consultaPrincipalForm.classList.add('slide-enter-active');
    }, 0);

    setTimeout(() => {
        consultaPrincipalForm.classList.remove('slide-enter');
        consultaPrincipalForm.classList.remove('slide-enter-active');
    }, 300);
}

// Função para exibir o formulário Emailage com animação
function showEmailageForm() {
    consultaPrincipalForm.classList.add('slide-exit');
    consultaPrincipalForm.classList.add('slide-exit-active');
    consultaEmailageForm.classList.add('slide-enter');

    setTimeout(() => {
        consultaPrincipalForm.style.display = 'none';
        consultaPrincipalForm.classList.remove('slide-exit');
        consultaPrincipalForm.classList.remove('slide-exit-active');

        consultaEmailageForm.style.display = 'block';
        consultaEmailageForm.classList.add('slide-enter-active');
    }, 0);

    setTimeout(() => {
        consultaEmailageForm.classList.remove('slide-enter');
        consultaEmailageForm.classList.remove('slide-enter-active');
    }, 300);
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
        "EducationalLevel" : "Nivel de Educação"

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

    // Função para exibir os resultados no layout padrão
    function displayResults(data) {
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
    }

    // Manipulador de envio do formulário de consulta CPF/CNPJ
    $('#consultaForm').on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: '/', // URL para enviar o formulário
            type: 'POST', // Método HTTP para envio
            data: $(this).serialize(), // Serializa os dados do formulário
            success: function(data) {
                displayResults([data]); // Passa o resultado para a função de exibição
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
                displayResults([data]); // Passa o resultado para a função de exibição
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
