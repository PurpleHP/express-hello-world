import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path';
import { Hercai } from 'hercai';
const herc = new Hercai(); //new Hercai("your api key"); => Optional


/* Available Models */
/* "v3" , "v3-32k" , "turbo" , "turbo-16k" , "gemini" */
/* Default Model; "v3" */
/* Premium Parameter; personality => Optional */


const PORT = 5173;

app.use(cors());
app.use(express.json());

async function getResponse(questionTemp){
    let response = await herc.question({model:"v3",content:questionTemp});
    return response.reply;        
} 
app.post('/Question', async (req, res) => {
    const { question } = req.body;
    let answer = await getResponse(question);
    if(answer == null){
        answer = "I don't know";
    }
    res.status(200).send(answer);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});
