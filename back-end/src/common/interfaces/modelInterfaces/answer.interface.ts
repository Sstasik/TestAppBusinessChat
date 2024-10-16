import { Document, Types } from "mongoose";
import {BotTree} from "../question.interface";

export interface AnswerInterface extends Document {
	_id: Types.ObjectId;
	answers: object | BotTree;
	company: Types.ObjectId;
	user: Types.ObjectId;
}