import Video_thumbnail from './video_thumbnail';

const Home = ({ VideoList }) => {
	console.log(VideoList);
	VideoList.map((video) => {
		console.log(video);
	});
	const handleClick = (video) => {
		console.log(video);
		window.location = `${video._id}`;
	};

	return (
		<div className="video_container">
			{VideoList.map((video, i) => (
				<div
					className="each_video_box"
					onClick={() => {
						handleClick(video);
					}}
					key={i}
				>
					<Video_thumbnail video={video} />
				</div>
			))}
		</div>
	);
};

export default Home;
