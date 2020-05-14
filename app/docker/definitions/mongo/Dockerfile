FROM mongo:4.2

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY mongod.conf /etc/mongod.conf

COPY mongodb-ssl /mongodb-ssl

RUN /mongodb-ssl

CMD ["mongod",  "-f", "/etc/mongod.conf"]
