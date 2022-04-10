import User from './schema/User';
import { model } from 'mongoose';

interface SignupData {
	email: string;
	name: string;
	password: string;
	password_confirm: string;
}

interface Error {
	error: string;
}

interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	age: number;
}

interface LoginData {
	email: string;
	password: string;
}

export const signup: any = async (data: any) => {
	let error_message: Error = { error: '' };
	let signup_data: SignupData = data;
	let error_: string;
	if (signup_data.password !== signup_data.password_confirm) {
		error_ = 'password does not match with confirm one';
		error_message.error = error_;
		return error_message;
	}
	const Exist = await User.findOne({ email: signup_data.email });
	const ExistPW = await User.findOne({ password: signup_data.password });
	if (Exist || ExistPW) {
		error_ = (Exist ? 'email ' : '') + (ExistPW ? 'password ' : '') + 'already exists';
		error_message.error = error_;
		return error_message;
	}
	const user = new User({
		email: signup_data.email,
		name: signup_data.name,
		password: signup_data.password
	});
	await user.save();
	console.log('saving user success');
	return 'success';
};

export const login: any = async (data: any) => {
	let error_message: Error = { error: '' };
	let login_data: LoginData = data;
	let error_: string;
	const user = await User.findOne({ email: login_data.email });
	if (user) {
		const userPWMatch = user.password === login_data.password;
		if (!userPWMatch) {
			error_ = 'pw does not match';
			error_message.error = error_;
			return error_message;
		}
	} else {
		error_ = 'email does not exists ';
		error_message.error = error_;
		return error_message;
	}
	return user;
};
