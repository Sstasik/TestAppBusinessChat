import { UserModel } from "../models/index";
import {UserCreateInterface} from "../common/interfaces/user.create.interface";
import {Types} from "mongoose";


class UserRepository{
	async create(user: UserCreateInterface){
		try {
			return UserModel.create(user)
		}catch (e){
			throw new Error(`Server error: ${e}`)
		}
	}

	async getAll(){
    return UserModel.find()
	}

	async getById(userId: Types.ObjectId){
		try {
			const user = await UserModel.findById(userId); // Exclude password
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			throw new Error('Error fetching user by ID: ' + error);
		}
	}

	async getByEmail(email: string) {
		const user = await UserModel.findOne({email}).select('+password');
		return user;
	}
}

export default new UserRepository()