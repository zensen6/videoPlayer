import { useRef } from 'react';
import axios from 'axios';

const Signup = () => {
	const emailRef = useRef(null);
	const nameRef = useRef(null);
	const pwRef = useRef(null);
	const pwcRef = useRef(null);

	const signup_submit = async (e) => {
		console.log('sending');
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			name: nameRef.current.value,
			password: pwRef.current.value,
			password_confirm: pwcRef.current.value
		};
		/*
		(async () => {
			const res = await fetch('api/signup', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(res);
        })();
        */
		axios
			.post('/api/signup', data)
			.then(function(res) {
				console.log(res.data);
				window.location = '/login';
			})
			.catch(function(error) {
				console.log(error.response.data);
				alert(`${error.response.data.error}`);
			});
	};

	return (
		<div className="SubmitForm">
			<form method="post">
				<input className="SIGNINPUT" type="email" name="email" placeholder="email" ref={emailRef} />
				<input className="SIGNINPUT" type="text" name="name" placeholder="name" ref={nameRef} />
				<input className="SIGNINPUT" type="password" name="password" placeholder="password" ref={pwRef} />
				<input
					className="SIGNINPUT"
					type="password"
					name="confirm-password"
					placeholder="password-confirm"
					ref={pwcRef}
				/>
				<input className="SIGNINPUT" type="submit" onClick={signup_submit} />
			</form>
		</div>
	);
};

export default Signup;
