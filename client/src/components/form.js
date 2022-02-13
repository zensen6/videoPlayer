import { useRef, useEffect } from 'react';
import axios from 'axios';

const Form = ({ text, stateText }) => {
	const formRef = useRef();

	useEffect(
		() => {
			axios
				.post('/api/test', { bod: { text } })
				.then(function(res) {
					alert('post success');
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
		console.log(text);
	};

	return (
		<div className="form-box">
			<textarea ref={formRef} />
			<input type="submit" onClick={handleText} />
		</div>
	);
};

export default Form;
