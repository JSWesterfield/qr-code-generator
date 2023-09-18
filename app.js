const express = require('express');
const ejs = require('ejs');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/generate', (req, res) => {
    const data = req.query.data || 'https://example.com';
    // res.render();

    QRCode.toDataURL(data, (err, url) => {
        if (err) {
            console.error(err);
            res.send('An error occured.');
        } else {
            res.render('index', { qrDataURL: url });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})