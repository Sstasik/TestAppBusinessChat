import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import errorMiddleware from "./middlwares/errror-handling/error-handling";
import routers from "./routers";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/', routers);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from Express + TypeScript!');
});

app.get('/chat', async (req: Request, res: Response) => {
	try {
		const userInput = req.body.message || 'Hello';

		const response = await axios.post(
			`${process.env.AI_MODEL}`,
			{ inputs: `Generate a business response: ${userInput}` },
			{
				headers: {
					Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		res.json(response.data); // Send the response back to the client
	} catch (error) {
		console.error('Error communicating with Hugging Face API:', error);
		res.status(500).json({ error: 'Failed to get a response from the API.' });
	}
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URI || '');
		app.listen(Number(PORT) || 3000, () => {
			console.log('Server started on port ', PORT || 3000);
		});
	} catch (e) {
		console.log(e);
	}
};

start();