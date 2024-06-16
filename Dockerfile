FROM ubuntu

COPY . .

CMD [ "./pocketbase_linux", "serve" ]