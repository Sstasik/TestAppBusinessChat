import { AnswerModel } from "../models";
import { AnswerCreateInterface} from "../common/interfaces/answer.create.interface";
import {Types} from "mongoose";
import {AnswerInterface} from "../common/interfaces/modelInterfaces/answer.interface";
import {DeleteAnswerResponse} from "../common/interfaces/responses.interface";


class AnswerRepository{
	async create(data: AnswerCreateInterface):Promise<AnswerInterface>{
		try {
			return AnswerModel.create(data)
		}catch (e) {
			throw new Error(`Server error: ${e}`)
		}
	}

	async getAll(companyId: string | Types.ObjectId):Promise<AnswerInterface[]>{
		return AnswerModel.find({
			company: companyId
		})
	}

	async getById(id: Types.ObjectId | string):Promise<AnswerInterface>{
		try {
			const answer = await AnswerModel.findById(id);
			if (!answer) {
				throw new Error('Answer not found');
			}
			return answer;
		} catch (e) {
			throw new Error('Error fetching answer by ID: ' + e);
		}
	}

	async update(id: string | Types.ObjectId, data: Partial<AnswerCreateInterface>):Promise<AnswerInterface> {
		try {
			const answer = await AnswerModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
			if (!answer) {
				throw new Error(`Company with id ${id} not found`);
			}
			return answer;
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}

	async deleteAnswer(id: string | Types.ObjectId):Promise<DeleteAnswerResponse> {
		try {
			const result = await AnswerModel.findByIdAndDelete(id);
			if (!result) {
				throw new Error(`Answer with id ${id} not found`);
			}
			return { message: 'Answer successfully deleted', result };
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}

	async updateOrCreate(userId: string | Types.ObjectId,  companyId: string | Types.ObjectId, data: AnswerCreateInterface):Promise<AnswerInterface> {
		try {
			const answer = await AnswerModel.findOneAndUpdate(
				{ user: userId, company: companyId },
				data,
				{ new: true, upsert: true, runValidators: true }
			);

			return answer;
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}

	async getByUserAndCompany(userId: string | Types.ObjectId,  companyId: string | Types.ObjectId):Promise<AnswerInterface | null>{
		try {
			const answer = await AnswerModel.findOne({user: userId, company: companyId})
			return answer
		} catch (e) {
			throw new Error(`Server error: ${e}`);
		}
	}
}

export default new AnswerRepository()