import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause, faReply, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from 'react';
import axios from 'axios';
const Header = ({
	loggedIn,
	sessionStorage,
	Micro,
	stateMicro,
	microText,
	stateMicroText,
	viaMicro,
	stateViaMicro
}) => {
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	useEffect(
		() => {
			if (!listening && transcript) {
				console.log(transcript);
				stateMicroText(transcript);
			}
		},
		[ transcript, listening ]
	);

	const handleMicro = (e) => {
		console.log('micro');
		if (Micro) {
			stateMicro(false);
			SpeechRecognition.stopListening();
			document.querySelector('.siri-bar').style.top = '-200px';
		} else {
			stateMicro(true);
			stateViaMicro(true);
			document.querySelector('.siri-bar').style.top = '50px';
			SpeechRecognition.startListening({ timeout: 6000 });
			setTimeout(() => {
				SpeechRecognition.stopListening();
				resetTranscript();
				document.querySelector('.siri-bar').style.top = '-200px';
			}, 6000);
		}
	};

	if (microText !== '' && !listening) {
		let text_data = { text: microText };
		stateMicroText('');
		axios
			.post('/api/siri', text_data)
			.then((res) => {
				console.log(res.data);
				stateViaMicro(true);
				window.location = `/${res.data._id}`;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="header_component">
			{loggedIn !== null ? (
				<div className="header_little">
					<div className="search_bar">
						<form>
							<input />
						</form>
					</div>
					<FontAwesomeIcon className="Icon" onClick={handleMicro} icon={faMicrophone} />
					<div className="header_little">
						<Link to="/logout">
							<span className="header_text">Logout</span>
						</Link>
					</div>
					<div className="header_little">
						<Link to="/upload">
							<span className="header_text">upload</span>
						</Link>
					</div>
					<div className="siri-bar">
						<div className="siri-compo">
							<div>
								<div className="pulsating-circle" />
							</div>
							<div className="asking">
								<p>듣고 싶은 노래 제목을 얘기해주세요</p>
							</div>
						</div>
						<div className="transcript">
							<p>{transcript}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="log_sign">
					<div className="search_bar">
						<form>
							<input />
						</form>
					</div>
					<div className="header_little">
						<Link to="/signup">
							<span className="header_text">Signup</span>
						</Link>
					</div>
					<div className="header_little">
						<Link to="/login">
							<span className="header_text">Login</span>
						</Link>
					</div>
					<div className="siri-bar">
						<div className="siri-compo">
							<div>
								<div className="pulsating-circle" />
							</div>
							<div className="asking">
								<p>듣고 싶은 노래 제목을 얘기해주세요</p>
							</div>
						</div>
						<div className="transcript">
							<p>{transcript}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
