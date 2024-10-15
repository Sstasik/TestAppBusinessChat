
interface AnswerInterface{
	question: QuestionInterface,
	answer: string
}
export interface QuestionInterface{
	question?: string,
	answers?: { [key: string]: AnswerInterface};
}