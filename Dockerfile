FROM node:13-alpine
ENV PORT 8081
ENV SECRET_KEY mvp-imm-egi
ENV MY_SQL dev-env-devopsacademy-pe.chdpe1wgua0r.us-east-1.rds.amazonaws.com
ENV MY_SQL_USER admin
ENV MY_SQL_PASSWORD y360y360
ENV MY_SQL_DB imm_legacy
ENV AWS_KEY_ID AKIAYVR7N3ZJCHYQETG4
ENV AWS_SECRET_KEY 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
ENV FRONTEND_URL_LOCAL http://localhost:3000
ENV FRONTEND_URL_PROD https://egi.devopsacademy.pe
ENV ESTADO_CITA_PENDIENTE 2
ENV MONGO_URL mongodb+srv://PachaQtecAcademy:EgXBJ2fgPdJxLdfB@cluster0.hioie.mongodb.net/immDB?retryWrites=true&w=majority
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["nodemon", "/usr/src/app/app.js"]
