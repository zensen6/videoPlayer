import { useRef, useEffect } from 'react';
import axios from 'axios';

const Form = ({ text, stateText, user, stateUser }) => {
	const formRef = useRef();

	useEffect(
		() => {
			axios
				.post('/api/test', { bod: { text } })
				.then(function(res) {
					console.log(res.data);
				})
				.catch(function(error) {
					alert('post fail');
				});
		},
		[ text ]
	);

	const handleText = (e) => {
		e.preventDefault();
		stateText(formRef.current.value);
		console.log('text:' + text);
	};

	return (
		<div className="form-box">
			<form method="post" action="/comments">
				<textarea ref={formRef} />
				<input type="submit" onClick={handleText} />
			</form>
		</div>
	);
};

export default Form;
