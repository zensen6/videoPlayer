import axios from 'axios';
import { useRef } from 'react';

const Upload = ({ sessionStorage }) => {
	const fileRef = useRef(null);
	const titleRef = useRef(null);
	const desRef = useRef(null);
	const uploadsubmit = (e) => {
		e.preventDefault();
		console.log(fileRef.current.files[0]);
		let frm = new FormData();
		frm.append('video', fileRef.current.files[0]);
		frm.append('user_id', sessionStorage.getItem('loginId'));
		frm.append('title', titleRef.current.value);
		frm.append('description', desRef.current.value);
		const data = {
			user_id: sessionStorage.getItem('loginId'),
			fileContent: frm,
			title: titleRef.current.value,
			description: desRef.current.value
		};
		console.log(data);
		axios
			.post('/api/video/uploadVideo', frm, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(function(res) {
				console.log(res.data);
			})
			.catch(function(err) {
				console.log(err.response.data.error);
			});
	};

	return (
		<div className="SubmitForm">
			<form method="post" enctype="multipart/form-data">
				<div class="filebox">
					<label for="ex_file">Upload</label>
					<input
						className="UPLOADFILE"
						type="file"
						id="video"
						name="video"
						accept="video/*"
						required
						id="ex_file"
						ref={fileRef}
					/>
				</div>
				<input
					className="UPLOADINPUT"
					placeholder="Title"
					required
					type="text"
					name="title"
					maxlength="80"
					ref={titleRef}
				/>
				<input
					className="UPLOADINPUT"
					placeholder="Description"
					required
					type="text"
					name="description"
					ref={desRef}
				/>
				<input className="UPLOADINPUT" type="submit" value="Upload Video" onClick={uploadsubmit} />
			</form>
		</div>
	);
};

export default Upload;
