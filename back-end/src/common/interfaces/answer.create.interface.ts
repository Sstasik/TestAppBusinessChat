import {Types} from "mongoose";
import { BotTree } from "./question.interface";

export interface AnswerCreateInterface{
	company: Types.ObjectId | string,
	user: Types.ObjectId | string,
	answers: BotTree
}