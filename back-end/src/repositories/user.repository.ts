import { UserModel } from "../models/index";
import {UserCreateInterface} from "../common/interfaces/user.create.interface";
import {Types} from "mongoose";
import {UserInterface} from "../common/interfaces/modelInterfaces/user.interface";
import {RoleEnum} from "../common/enums/role.enum";


class UserRepository{
	async create(user: UserCreateInterface):Promise<UserInterface>{
		try {
			return UserModel.create(user)
		}catch (e){
			throw new Error(`Server error: ${e}`)
		}
	}

	async getAll():Promise<UserInterface[]>{
    return UserModel.find()
	}

	async getById(userId: Types.ObjectId | string):Promise<UserInterface>{
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

	async getByEmail(email: string):Promise<UserInterface | null> {
		const user = await UserModel.findOne({email}).select('+password');
		return user;
	}


	async setUserPremiumAccount(id: string | Types.ObjectId):Promise<UserInterface> {
		try {
			const user = await UserModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			user.isPremium = true;
			await user.save();
			return user;
		} catch (e) {
			throw new Error(`Server error: ${e}`)
		}
	}

	async setUserNotPremiumAccount(id: string | Types.ObjectId):Promise<UserInterface>{
		try {
			const user = await UserModel.findById(id);
			if (!user) {
				throw new Error('User not found');
			}
			user.isPremium = false;
			await user.save();
			return user;
		} catch (e) {
			throw new Error(`Server error: ${e}`)
		}
	}

	async changeRole(id: string | Types.ObjectId, role: RoleEnum): Promise<UserInterface>{
		try {
			const user = await UserModel.findByIdAndUpdate(
				id,
				{ role },
				{ new: true, runValidators: true }
			);

			if (!user) {
				throw new Error(`User with id ${id} not found`);
			}

			return user;
		} catch (e) {
			throw new Error(`Failed to change role: ${e}`);
		}
	}
}

export default new UserRepository()