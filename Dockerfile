# Use a imagem base do Python
FROM python:3.8-alpine

# Instale dependências do sistema necessárias
RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev

# Copie o arquivo de requisitos para a imagem
COPY requirements.txt /app/

# Altere o diretório de trabalho
WORKDIR /app

# Instale as dependências do Python
RUN pip install --upgrade pip
RUN pip install --verbose -r requirements.txt

# Copie todo o conteúdo do diretório local para a imagem
COPY . /app

# Exponha a porta que o Flask usará
EXPOSE 5000

# Defina variáveis de ambiente
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_NAME=database
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=admin

# Comando para iniciar a aplicação Flask
CMD ["python", "app.py"]
