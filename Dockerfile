# Use uma imagem base do Python
FROM python:3.9

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os requisitos para o diretório de trabalho
COPY requirements.txt requirements.txt

# Instale as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copie o conteúdo do projeto para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta que o serviço vai usar
EXPOSE 5000

# Comando para rodar o aplicativo
CMD ["flask", "run", "--host=0.0.0.0"]
