# Usa uma imagem base oficial do Python
FROM python:3.9-slim

# Instala as dependências necessárias para construir psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de requisitos para o diretório de trabalho
COPY requirements.txt requirements.txt

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o conteúdo do diretório atual para o diretório de trabalho dentro do contêiner
COPY . .

# Define a variável de ambiente para o Flask
ENV FLASK_APP=run.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expõe a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["flask", "run"]
