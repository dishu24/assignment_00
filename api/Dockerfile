FROM python:3.10-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /api
COPY requirements.txt requirements.txt
RUN python -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . .