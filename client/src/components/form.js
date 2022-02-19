import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Video_box from './video_box';

const Form = ({ text, stateText, user, stateUser }) => {
	const [ VideoList, stateVideoList ] = useState({});

	useEffect(() => {
		axios
			.get('/api/home')
			.then(function(res) {
				console.log('received_home');
				console.log(res.data[0]);
				stateVideoList(res.data[0]);
				console.log(VideoList);
			})
			.catch((err) => {});
	}, []);
	return (
		<div>
			<Video_box
				fileUrl={VideoList.fileUrl}
				author={VideoList.author}
				owner={VideoList.owner}
				title={VideoList.title}
				description={VideoList.description}
			/>
		</div>
	);
};

export default Form;
