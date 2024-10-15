import { Document, Types } from "mongoose";

export interface AnswerInterface extends Document {
	_id: Types.ObjectId;
	answers: object;
	company: Types.ObjectId;
	user: Types.ObjectId;
}