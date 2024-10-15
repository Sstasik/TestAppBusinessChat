import {Types} from "mongoose";
import {QuestionInterface} from "./question.interface";


export interface CompanyCreateInterface{
	name: string,
	admin: Types.ObjectId | string,
	botTree?: QuestionInterface
}