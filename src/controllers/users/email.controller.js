// const AtencionCita = require('../../models/atencionCita/AtencionCita');
const { handleHttpError } = require('../../helpers/handleErrors');
const pool = require('../../config/dbConnectMySql');
const { EMAIL_USER, PASWORD_USER, SERVICE_USER, HOST_USER } = process.env;
var nodemailer = require('nodemailer');
const listContractos = async(req, res) => {
    try {
        const contratosSel = 'SELECT * from contracts co INNER JOIN contract_items ci ON co.id = ci.contract_id WHERE ci.item LIKE "%dominio%" or ci.item LIKE "%Dominio%" or ci.item LIKE "%Hosting%" or ci.item LIKE "%hosting%"';
        // const  SELECT * FROM contract_items WHERE `item` LIKE "%dominio%" or `item` LIKE "%hosting%"
        // const contratosSel = 'SELECT * from contracts';
        // const query2 = 'SELECT * FROM contract_items';
        const [contratos] = await pool.query(contratosSel);
        var consultaUsu = 'SELECT * FROM persons WHERE id = ?';
        const fechaActual = new Date();
        console.log(fechaActual);
        const customer = await Promise.all(
            contratos.map(async(item, i) => {
                const [usuario] = await pool.query(consultaUsu, [
                    item.customer_id
                ]);
                return {
                    usuario: usuario[0],
                };
            })
        );

        const datos = await Promise.all(contratos.map((item, i) => {
            // console.log(contratos[i].date_of_issue);
            // console.log(customer[i].usuario.email);
            let milisegundosDia = 24 * 60 * 60 * 1000;
            let milisegundosTranscurridos = Math.abs(fechaActual.getTime() - contratos[i].date_of_issue.getTime());
            let diasTranscurridos = Math.round(milisegundosTranscurridos / milisegundosDia);
            console.log(diasTranscurridos);

            if (diasTranscurridos === 335 || diasTranscurridos === 350 || diasTranscurridos === 364) {
                var transporter = nodemailer.createTransport({
                    service: SERVICE_USER,
                    host: HOST_USER,
                    port: 465,
                    auth: {
                        user: EMAIL_USER,
                        pass: PASWORD_USER
                    }
                });
                // var mensaje = "Hola, Sumilda Tu Documento Electr??nica est?? disponible C??digo de Cliente 20220805566 ??ltimo d??a de pago: 03/10/2022 Total a Pagar S/ 59.00";
                var mailOptions = {
                    from: EMAIL_USER,
                    to: customer[i].usuario.email,
                    subject: 'Renovaci??n de Servicio - 2CLOUD ',
                    // text: mensaje,
                    html: ` <div> 
               <p>Buenos tardes,</p> 
        
               <p>Nuestro mensaje es para informarles que su servicio de su p??gina web </p> 
        
               <p>Caduca el d??a ` + contratos[i].date_of_due.toLocaleDateString() + `, le indico el procedimiento para renovar el(los) servicio(s).</p> 
        
               <p>Total: ` + contratos[i].total + `</p> 
        
               <p>Cuentas bancarias:</p> 
        
               <p>Cuenta Corriente - Banco Cr??dito - BCP : 194-8968651-0-32, nuevos soles. (2CLOUD PERU SAC)</p> 
        
               <p>Cuenta Interbancaria - Banco Cr??dito - BCP : 00219400896865103295, nuevos soles. (2CLOUD PERU SAC - RUC:20607235709 )</p> 
        
               <p>Cuenta Corriente - d??lares : 1949291475190, d??lares. (2CLOUD PERU SAC)</p> 
        
               <p>Cuenta Interbancaria - d??lares : 00219400929147519091, d??lares. (2CLOUD PERU SAC - RUC:20607235709 )</p> 
        
               <p>Esperamos su pronta respuesta indic??ndonos el n??mero de dep??sito.</p> 
        
               <p>Gracias</p> 
        
               <p>Marily Segura</p> 
               <p>Asesor Comercial</p> 
               <p>2CLOUD PERU SAC.</p> 
               <p>Web Site: www.2cloud.pe</p> 
        
        `
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });
            }
        }));

    } catch (err) {
        handleHttpError(res, err);
    }
};

module.exports = {
    listContractos,
};