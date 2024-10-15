import { UserService } from './index';
import { UserCreateInterface } from '../common/interfaces/user.create.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Types} from "mongoose";
import {UserAuthResponse} from "../common/interfaces/responses.interface";

class AuthService {

	async registration(data: UserCreateInterface):Promise<UserAuthResponse> {
		try {
			const existingUser = await UserService.getByEmail(data.email)
			if (existingUser) {
				throw new Error('User with this email already exists');
			}

      const newUser = await UserService.create(data)
			const token = this.generateToken(newUser._id, newUser.role);

			return {
				user: {
					_id: newUser._id,
					username: newUser.username,
					role: newUser.role,
					isPremium: newUser.isPremium,
				},
				token,
			};
		} catch (e) {
			throw new Error('Registration failed: ' + e);
		}
	}

	async login(email: string, password: string):Promise<UserAuthResponse> {
		try {
			const user = await UserService.getByEmail(email)
			if (!user) {
				throw new Error('Invalid email or password');
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				throw new Error('Invalid email or password');
			}

			const token = this.generateToken(user._id, user.role);

			return {
				user: {
					_id: user._id,
					username: user.username,
					role: user.role,
					isPremium: user.isPremium,
				},
				token,
			};
		} catch (e) {
			throw new Error('Login failed: ' + e);
		}
	}

	private generateToken(userId: Types.ObjectId, role: string): string {
		const secret = process.env.JWT_SECRET || 'your_jwt_secret';
		const token = jwt.sign({ id: userId, role }, secret, {
			expiresIn: '6h',
		});
		return token;
	}
}

export default new AuthService();
