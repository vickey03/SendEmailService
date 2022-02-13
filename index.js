const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();
const port = process.env.PORT || 4000;
app.use('/v1', route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

/**
* Here we're using Gmail to send 
*/
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'naidulic1838@gmail.com',
//         pass: 'naidu@123'
//     }
// });

const transporter = nodemailer.createTransport({
                // true for 465, false for other ports
                service: 'gmail',
       auth: {
        user: 'naidulic1838@gmail.com',
             pass: 'tksvxmsfobvdbnta'//'qrkhfrahjugbjdrr'
         }
       
    });
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    //   let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'naidulic1838@gmail.com',
    //     pass: 'tksvxmsfobvdbnta'//'qrkhfrahjugbjdrr'
    //     }
    // });
      
    // let mailDetails = {
    //     from: 'naidulic1838@gmail.com',
    //     to: 'naidulic1838@gmail.com',
    //     subject: 'Test mail',
    //     text: 'Node.js testing mail for'
    // };
      
    // transporter.sendMail(mailDetails, function(err, data) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log('Email sent successfully');
    //     }
    // });

app.post('/emailMessage',(req, res) => {
    // const { name, email, phone, message } = req.body;
    //debugger;
   // console.log("qazxsw")
   // cors(req, res, () => {
        let htmlMailBody = `<ul>
        <li>Name: ${req.body.name}
        <li>Mobile: ${req.body.mobile}`
        if (req.body.email) {
            htmlMailBody += `<li>Email: ${req.body.email}`
        }
        if (req.body.occupation) {
            htmlMailBody += `<li>Occupation: ${req.body.occupation}`
        }
        if (req.body.location) {
            htmlMailBody += `<li>Location: ${req.body.location}`
        }

        if (req.body.description) {
            htmlMailBody += `<li>Description: ${req.body.description}`
        }
        if (req.body.policyType) {
            htmlMailBody += `<li>Policy type: ${req.body.policyType}`
        }
        if (req.body.comment) {
            htmlMailBody += `<li>Comment: ${req.body.comment}`
        }
        htmlMailBody += `</ul>`;
        const mailOptions = {
            to: 'vickeychowdary448@gmail.com',
            from: req.body.email,
            subject: `Agent registered`,
            html: htmlMailBody
        };
        // returning result
       
        console.log(htmlMailBody)
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send({
                status: 'success',
                message: 'Submitted successfully.'
            });
        });
    // }).catch(() => {
    //     res.status(500).send("error");
    // });
});