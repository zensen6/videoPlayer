const Video_thumbnail = ({ video }) => {
	console.log('video.fileUrl');
	return (
		<div className="each_video">
			<p>{video.title}</p>
		</div>
	);
};

export default Video_thumbnail;
