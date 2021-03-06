import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

let sessionStorage = window.sessionStorage;

const Video_box = ({ VideoList, viaMicro, stateViaMicro }) => {
	//const { fileUrl, author, title, description, owner } = VideoList[0];
	const videoRef = useRef();
	const DeleteVideo = () => {
		let deleteID = { id: video._id };
		axios
			.post('/api/deleteVideo', deleteID)
			.then((res) => {
				console.log('deleted' + res.data);
				window.location = '/';
			})
			.catch((err) => {
				console.log(err);
			});
	};
	let { id } = useParams();

	console.log(id);
	//console.log(fileUrl, author);
	console.log(VideoList[0]);
	const video = VideoList.filter((v) => {
		return v._id == id;
	})[0];
	console.log(video);

	const autoplay = () => {
		videoRef.current.play();
		stateViaMicro(false);
	};

	return video ? (
		<div className="VideoBigBox">
			<video src={video.fileUrl} controls ref={videoRef} onLoadedMetadata={autoplay} className="VideoBox" />
			<p>{video.author}</p>
			<p>{video.title}</p>
			{sessionStorage.getItem('loginId') === video.owner._id && (
				<button onClick={DeleteVideo}>Delete the video</button>
			)}
		</div>
	) : null;
};
// must render when the video is not undefined
export default Video_box;
