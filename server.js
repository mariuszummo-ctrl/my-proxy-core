const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.get('/proxy', async (req, res) => {
    const encodedTarget = req.query.target;
    if (!encodedTarget) return res.status(400).send("No target data provided.");
    try {
        const targetUrl = Buffer.from(encodedTarget, 'base64').toString('utf-8');
        const networkResponse = await fetch(targetUrl);
        const webHtml = await networkResponse.text();
        res.send(webHtml);
    } catch (error) { res.status(500).send("Bridge error: " + error.message); }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Operational on port ${PORT}`));
