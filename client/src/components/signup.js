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
			})
			.catch(function(error) {
				console.log(error.response.data);
				alert(`${error.response.data.error}`);
			});
	};

	return (
		<div className="signup-box">
			<form method="post">
				<input type="email" name="email" placeholder="email" ref={emailRef} />
				<input type="text" name="name" placeholder="name" ref={nameRef} />
				<input type="password" name="password" placeholder="password" ref={pwRef} />
				<input type="password" name="confirm-password" placeholder="password-confirm" ref={pwcRef} />
				<input type="submit" onClick={signup_submit} />
			</form>
		</div>
	);
};

export default Signup;
