import { useRef } from 'react';
import { Redirect, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ sessionStorage }) => {
	const emailRef = useRef(null);
	const pwRef = useRef(null);
	const navigate = useNavigate();

	const login_submit = async (e) => {
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			password: pwRef.current.value
		};

		axios
			.post('/api/login', data)
			.then(function(res) {
				console.log(res.data);
				sessionStorage.setItem('loginId', res.data.user_id);
				console.log('haaaaa', JSON.stringify(sessionStorage).loginId);
				window.location = '/';
			})
			.catch(function(error) {
				console.log('aaaaa');
				console.log(error.response.data);
			});
	};

	return (
		<div className="SubmitForm">
			<form method="post">
				<input className="INPUT" type="email" name="email" placeholder="email" ref={emailRef} />
				<input className="INPUT" type="password" name="password" placeholder="password" ref={pwRef} />
				<input className="INPUT" type="submit" onClick={login_submit} />
			</form>
		</div>
	);
};

export default Login;
