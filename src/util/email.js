const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async(msg, res)=>{
    sgMail.send(msg)
    .then(
        res.json({message: 'link has been set to your email'})
    )
    .catch((err)=> console.log(err));
} 

exports.resetPassEmail = async(link, userEmail, res)=>{
    const msg = {
        from : process.env.EMAIL_NAME,
        to   : userEmail,
        subject : "Bazaar",
        html : `<h2>Hello</h2>
        <p> you can reset your password by clicking the link below:</p>
        <a href='${link}'>Reset Password</a>
       <p>Please note that for added security this link becomes invalid after 45 minutes</p>`
      };
    await sendEmail(msg, res);  
};