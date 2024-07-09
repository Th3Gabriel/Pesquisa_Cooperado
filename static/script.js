document.addEventListener("DOMContentLoaded", function() {
    // Mostra a tela de carregamento
    document.getElementById('loadingScreen').style.visibility = 'visible';
});

window.onload = function() {
    // Esconde a tela de carregamento
    document.getElementById('loadingScreen').style.visibility = 'hidden';
};

$(document).ready(function() {
    // Dicionário de traduções
    var translations = {
        // Translations dictionary
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
        "GRADUATED": "GRADUADO"
    };

    // Chaves a serem ignoradas
    var ignoredKeys = ["TaxIdStatusDate", "MatchKeys"];

    // Função para criar um item de resultado
    function createResultItem(label, value) {
        var translatedLabel = translations[label] || label; // Traduz o rótulo se houver tradução disponível

        if (typeof value === 'object' && value !== null) {
            var result = '<div class="result-item">';
            result += '<span class="result-label">'+ '</span><ul>';
            for (var subKey in value) {
                if (value.hasOwnProperty(subKey)) {
                    result += '<li>' + createResultItem(subKey, value[subKey]) + '</li>';
                }
            }
            result += '</ul></div>';
            return result;
        } else {
            var translatedValue = translations[value] || value; // Traduz o valor se houver tradução disponível
            return '<div class="result-item"><span class="result-label">' + translatedLabel + ':</span> ' + translatedValue + '</div>';
        }
    }

    // Manipulador de eventos para alternar a exibição do conteúdo do grupo de resultados
    $(document).on('click', '.toggle-button', function() {
        var content = $(this).next('.result-group-content');
        $(this).find('i').toggleClass('fa-angle-down fa-angle-up');
        content.slideToggle();
    });

    // Botão para expandir ou recolher todos os grupos de resultados
    $('#toggleAllButton').on('click', function() {
        var allContents = $('.result-group-content');
        var allButtons = $('.toggle-button');
        var visible = allContents.is(':visible');
        if (visible) {
            allContents.slideUp();
            allButtons.find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            allContents.slideDown();
            allButtons.find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    });

    // Manipulador de envio do formulário de consulta
    $('#consultaForm').on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: '/',
            type: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                var resultadoDiv = $('#resultado');
                resultadoDiv.empty();
                resultadoDiv.append('<div class="search-wrapper"><input type="text" id="searchInput" class="form-control mb-3" placeholder="Buscar nos resultados..."><div id="searchIcon" class="btn btn-light"><i class="fas fa-search"></i></div></div>');

                for (var key in data[0]) {
                    if (data[0].hasOwnProperty(key) && !ignoredKeys.includes(key)) {
                        var value = data[0][key];
                        var resultItem = createResultItem(key, value);

                        var groupName = key;
                        if (translations[groupName]) {
                            groupName = translations[groupName];
                        }

                        var resultGroup = $('<div class="result-group">');
                        var toggleButton = $('<button class="toggle-button" type="button">' + groupName + ' <i class="fas fa-angle-down"></i></button>');
                        var resultGroupContent = $('<div class="result-group-content">' + resultItem + '</div>');

                        resultGroup.append(toggleButton);
                        resultGroup.append(resultGroupContent);
                        resultadoDiv.append(resultGroup);
                    }
                }
            },
            error: function(xhr, status, error) {
                var resultadoDiv = $('#resultado');
                resultadoDiv.empty();
                if (xhr.responseJSON && xhr.responseJSON.errors) {
                    for (const [key, messages] of Object.entries(xhr.responseJSON.errors)) {
                        messages.forEach(message => {
                            resultadoDiv.append('<p class="text-danger">' + message + '</p>');
                        });
                    }
                } else {
                    resultadoDiv.append('<p class="text-danger">Erro ao consultar CPF/CNPJ. Por favor, tente novamente.</p>');
                }
            }
        });
    });

    // Botão para limpar os resultados
    $('#limparResultado').on('click', function(event) {
        event.preventDefault();
        $('#resultado').empty();
        $('#consultaForm').trigger('reset');
    });

    // Ícone de busca
    $(document).on('click', '#searchIcon', function() {
        $('.search-wrapper').toggleClass('expanded');
        if ($('.search-wrapper').hasClass('expanded')) {
            $('#searchInput').focus();
        }
    });

    // Busca nos resultados
    $(document).on('input', '#searchInput', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('.result-group').each(function() {
            var groupName = $(this).find('.toggle-button').text().toLowerCase();
            var groupContent = $(this).find('.result-group-content').text().toLowerCase();

            if (groupName.includes(searchTerm) || groupContent.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

