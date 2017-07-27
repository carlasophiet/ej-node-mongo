module.exports = {
  checkEmail: function () {
    // verificar email
  },
  sendEmail: function (body) {
    'use strict';
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: 'test_node@outlook.com',
          pass: '' // <- poner el pass que les paso!
      }
    });

    var mensaje = `
      Nombre y Apellido: ${body.name} ${body.lastname}
      Email: ${body.email}

      Mensaje:
      ${body.message}
    `;

    let mailOptions = {
        from: 'test_node@outlook.com',
        to: 'test_node@outlook.com', // <- cambiar esta cuenta con la que queremos usar apra recibir el mensaje!
        subject: 'prueba email',
        text: mensaje
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}
