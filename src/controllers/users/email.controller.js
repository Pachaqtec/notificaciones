// const AtencionCita = require('../../models/atencionCita/AtencionCita');
const { handleHttpError } = require('../../helpers/handleErrors');
const pool = require('../../config/dbConnectMySql');
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
                    service: 'gmail',
                    host: 'smtp.gmail.com ',
                    port: 465,
                    auth: {
                        user: 'macu05b@gmail.com',
                        pass: 'utvyqvhvtrjwujix'
                    }
                });
                // var mensaje = "Hola, Sumilda Tu Documento Electrónica está disponible Código de Cliente 20220805566 Último día de pago: 03/10/2022 Total a Pagar S/ 59.00";
                var mailOptions = {
                    from: 'macu05b@gmail.com',
                    to: customer[i].usuario.email,
                    subject: 'Renovación de Servicio - 2CLOUD ',
                    // text: mensaje,
                    html: ` <div> 
               <p>Buenos tardes,</p> 
        
               <p>Nuestro mensaje es para informarles que su servicio de su página web </p> 
        
               <p>Caduca el día ` + contratos[i].date_of_due.toLocaleDateString() + `, le indico el procedimiento para renovar el(los) servicio(s).</p> 
        
               <p>Total: ` + contratos[i].total + `</p> 
        
               <p>Cuentas bancarias:</p> 
        
               <p>Cuenta Corriente - Banco Crédito - BCP : 194-8968651-0-32, nuevos soles. (2CLOUD PERU SAC)</p> 
        
               <p>Cuenta Interbancaria - Banco Crédito - BCP : 00219400896865103295, nuevos soles. (2CLOUD PERU SAC - RUC:20607235709 )</p> 
        
               <p>Esperamos su pronta respuesta indicándonos el número de depósito.</p> 
        
               <p>Gracias</p> 
        
               <p>Marily Segura</p> 
               <p>Asesor Comercial</p> 
               <p>2CLOUD PERU SAC.</p> 
               <p>Web Site: www.2cloud.pe</p> 
        
        
               <p>--</p> 
               <p>Wilmer Segura</p> 
               <p>Cel : 511 - 972732240</p> 
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