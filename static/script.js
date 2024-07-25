document.addEventListener("DOMContentLoaded", function() {
    // Mostra a tela de carregamento quando o conteúdo da página é carregado
    document.getElementById('loadingScreen').style.visibility = 'visible';
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
        "GRADUATED": "GRADUADO"
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

    // Manipulador de envio do formulário de consulta
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

    // Botão para limpar os resultados e resetar o formulário
    $('#limparResultado').on('click', function(event) {
        event.preventDefault();
        $('#resultado').empty();
        $('#consultaForm').trigger('reset');
    });

    // Ícone de busca para alternar a exibição do campo de busca
    $(document).on('click', '#searchIcon', function() {
        $('.search-wrapper').toggleClass('expanded');
        if ($('.search-wrapper').hasClass('expanded')) {
            $('#searchInput').focus();
        }
    });

    // Busca nos resultados conforme o usuário digita
    $(document).on('input', '#searchInput', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('.result-group').each(function() {
            var groupName = $(this).find('.result-group-header').text().toLowerCase();
            var groupContent = $(this).find('.result-group-content').text().toLowerCase();

            if (groupName.includes(searchTerm) || groupContent.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
