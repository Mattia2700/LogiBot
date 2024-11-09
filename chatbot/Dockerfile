FROM python:3.12-alpine

WORKDIR /app

RUN pip install poetry
COPY . .
RUN poetry install --no-dev

ENTRYPOINT ["poetry", "run", "python", "chatbot/server.py"]