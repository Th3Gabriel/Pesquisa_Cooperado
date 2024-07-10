# Usar uma imagem base do Python
FROM python:3.9-slim

# Definir o diretório de trabalho na imagem
WORKDIR /app

# Copiar os arquivos de requisitos para o contêiner
COPY requirements.txt requirements.txt

# Instalar as dependências
RUN pip install -r requirements.txt

# Copiar o restante do código da aplicação para o contêiner
COPY . .

# Definir a variável de ambiente para a Flask
ENV FLASK_APP=run.py

# Expor a porta que a aplicação irá rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["flask", "run", "--host=0.0.0.0"]
