import {UserRepository} from "../repositories"
import {UserCreateInterface} from "../common/interfaces/user.create.interface";
import {Types} from "mongoose";

class UserService{
	async create(user: UserCreateInterface){
		return UserRepository.create(user)
	}

	async getAll(){
		return UserRepository.getAll()
	}

	async getById(id: Types.ObjectId | string){
		return UserRepository.getById(id)
	}

	async getByEmail(email: string){
		return UserRepository.getByEmail(email)
	}

	async setUserPremiumAccount(id: Types.ObjectId | string){
		return UserRepository.setUserPremiumAccount(id)
	}

	async setUserNotPremiumAccount(id: Types.ObjectId | string){
		return UserRepository.setUserNotPremiumAccount(id)
	}
}

export default new UserService()