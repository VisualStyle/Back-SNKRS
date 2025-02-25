const NewsLetter = require("../../schemas/NewsLetter")
const mailTransport = require("../../config/mailTransportConfig")
const config = require('../../config/config');
const newsletter = async (req, res) => {
    const { email } = req.body
    try {
        const foundEmail = await NewsLetter.findOne({ email })
        if (foundEmail) {
            return res.status(400).json({ error: 'Email already subscribed' })
        }   
        const newSubscriber = new NewsLetter({email});
        await newSubscriber.save()

        const mailOptions = {
            from: config.MAIL_SNKRS,
            to: email,
            subject: 'Subscription to Newsletter confirmation',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Newsletter</title>
                <style>
                    @font-face {
                        font-family: 'MontHeavy';
                        src: url('FONT_HEAVY_URL.woff2') format('woff2'),
                             url('FONT_HEAVY_URL.woff') format('woff');
                    }
                    @font-face {
                        font-family: 'Mont';
                        src: url('FONT_NORMAL_URL.woff2') format('woff2'),
                             url('FONT_NORMAL_URL.woff') format('woff');
                    }
                    body {
                        font-family: Mont, Arial, sans-serif;
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 550px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        border-radius: 25px;
                        text-align: center;
                        margin-top: 10px;
                        border-bottom: #424242 solid 5px;
                        border-left: #424242 solid 5px;
                    }
                    .logo {
                        width: 300px;
                        height: 50px;
                        margin: 0;
                        background-image: url('https://firebasestorage.googleapis.com/v0/b/snkrs-4a559.appspot.com/o/interface%2FBack%2FLogo.svg?alt=media&token=822e07c4-b982-46b7-b207-7bd0c74c46ad&_gl=1*1ruddtq*_ga*MTg5Nzc0NTk2NS4xNjk1MTgzNzc0*_ga_CW55HF8NVT*MTY5Njg1MzIzMS4yMy4xLjE2OTY4NTU4NjEuNjAuMC4w');
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    .line {
                        border-bottom: 5px dashed #424242;
                        margin-top: 10px;
                        margin-left: 20px;
                        width: 90%;
                    }
                    .header {
                        font-family: MontHeavy;
                        color: #2d2d2d;
                        font-size: 25px;
                        margin-top: 5px;
                    }
                    p {
                        font-family: Mont;
                        color: #2d2d2d;
                        font-size: 18px;
                    }
                    .button-container {
                        margin-top: 20px;
                    }
                    .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        background-color: #2d2d2d;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: 0.3s ease-out;
                    }
                    .btn a {
                        font-family: Mont;
                        font-size: 20px;
                        text-decoration: none;
                        color: #fff;
                    }
                    .btn:hover {
                        transform: scale(1.1);
                        background-color: #135553;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo"></div>
                    <div class="line"></div>
                    <div class="header">
                        <h1>Latest News</h1>
                        <h3>Stay up-to-date with our updates!</h3>
                    </div>
                    <p>Discover our special offers, new products, and exciting events in our newsletter. Don't miss out, subscribe now.</p>
                    <div class="button-container">
                        <button class="btn">
                            <a href="SUBSCRIPTION_URL">Subscribe</a>
                        </button>
                    </div>
                </div>
            </body>
            </html>
            `,
          };
          mailTransport.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.error('Error sending email', error)
            } else {
                console.log('Mail sended succesfully', info.response)
            }

          })
          res.status(201).json({message: 'Succesfully subscribed'})

    } catch (error) {
        res.status(500).json({error: 'Error subscribing'})
        
    }
}

module.exports = newsletter