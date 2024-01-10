const express = require("express");
const cors = require("cors");
//const secure_configuration = require('./secure');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
//const port = 3000;
const port = process.env.port || 3000;

const corsOptions = {
    origin: ['http://127.0.0.1:5501/'], // This allows requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware to parse JSON
app.use(bodyParser.json());

// Serve the HTML page
/*app.get("/", (req, res) => {
    res.sendFile(__dirname + "../../index.html");
});*/
/*
app.get('../../index.html', (req, res) => {
    res.sendFile(__dirname + '../../index.html');
});*/


// Handle form submission
app.post("/send-email", (req, res) => {
    const { name, email, subject//, message 
    } = req.body;

    // Create a nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'h.hedjame27@gmail.com',
            pass: 'Hadj-1967'
        },
    });

    // Email options
    const mailOptions = {
        from: `${email}`,
        to: "h.hedjame27@gmail.com",
        subject: `${subject}`,
        text: `Name: ${name}\nEmail: ${email}
        \nMessage: ${subject}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Error sending email" });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: "Email sent successfully" });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});