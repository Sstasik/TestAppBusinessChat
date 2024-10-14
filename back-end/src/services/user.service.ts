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

	async getById(id: Types.ObjectId){
		return UserRepository.getById(id)
	}

	async getByEmail(email: string){
		return UserRepository.getByEmail(email)
	}
}

export default new UserService()