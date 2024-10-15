import axios from "axios";

export class ChatService{
	async sendMessage(userInput: string){
		try {
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
			return response.data
		} catch (error) {
			throw new Error(`Failed to get a response from the API: ${error}`)
		}
	}
}

export default new ChatService();