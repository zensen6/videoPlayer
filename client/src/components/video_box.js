import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Video_box = ({ fileUrl, author, owner, title, description }) => {
	return (
		<div>
			<p>zxxxxxx</p>
			<video src={fileUrl} controls />
			<p>{author}</p>
			<p>{title}</p>
		</div>
	);
};
export default Video_box;
