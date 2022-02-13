const Comments = ({ text }) => {
	console.log('here' + text);
	return (
		<div>
			<p>
				<h1>{text}</h1>
			</p>
		</div>
	);
};

export default Comments;
