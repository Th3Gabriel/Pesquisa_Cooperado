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

                // Exibe o resultado no contêiner de resultados
                resultadoDiv.html(JSON.stringify(data, null, 4));
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
