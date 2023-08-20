const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey('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');

const message = {
    to :'r.mahrous01249@dmu.edu.eg',
    from :'rewansdel1266@gmail.com',
    subject : "Hello to bazaar",
    text :'hi',
    html : '<h1>welcome</h1>'
};

sgMail.send(message)
       .then( () => console.log("Email sent")) 
       .catch((err) =>console.log(err));