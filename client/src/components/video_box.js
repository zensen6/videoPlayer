import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Video_box = ({ VideoList }) => {
	//const { fileUrl, author, title, description, owner } = VideoList[0];
	let { id } = useParams();

	console.log(id);
	//console.log(fileUrl, author);
	console.log(VideoList[0]);
	const video = VideoList.filter((v) => {
		return v._id == id;
	})[0];
	console.log(video);
	return video ? (
		<div>
			<p>zxxxxxx</p>
			<video src={video.fileUrl} controls />
			<p>{video.author}</p>
			<p>{video.title}</p>
		</div>
	) : null;
};
// must render when the video is not undefined
export default Video_box;
