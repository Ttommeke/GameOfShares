FROM ubuntu

RUN  apt-get update \
    && apt-get install -y wget \
    && apt-get install -y curl

COPY . .

CMD [ "./pocketbase_linux", "serve", "--http", "0.0.0.0:80" ]