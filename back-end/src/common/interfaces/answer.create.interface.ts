import {Types} from "mongoose";
import {QuestionInterface} from "./question.interface";

export interface AnswerCreateInterface{
	company: Types.ObjectId | string,
	user: Types.ObjectId | string,
	answers: QuestionInterface
}