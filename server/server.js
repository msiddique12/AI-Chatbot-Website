const PORT = 8000
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors(
    {
        origin: ["https://ai-chatbot-api.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json())
app.use(cors())
require('dotenv').config()

const apiKey = process.env.API_KEY;

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error)
    {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on port ' + PORT))
