import Home from './components/home';
import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Upload from './components/upload';
import Video_box from './components/video_box';
import Dictaphone from './components/aaa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './styles/app.scss';

let sessionStorage = window.sessionStorage;
function App() {
	const [ user, stateUser ] = useState({});
	const [ VideoList, stateVideoList ] = useState([]);
	const [ Micro, stateMicro ] = useState(false);
	const [ microText, stateMicroText ] = useState('');
	const loggedIn = sessionStorage.getItem('loginId');
	console.log(loggedIn);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios('/api/home');
			stateVideoList(result.data);
		};
		fetchData();
	}, []);
	return VideoList != [] ? (
		<div className="App">
			<Header
				loggedIn={loggedIn}
				sessionStorage={sessionStorage}
				Micro={Micro}
				stateMicro={stateMicro}
				microText={microText}
				stateMicroText={stateMicroText}
			/>
			<Switch>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/login">
					<Login sessionStorage={sessionStorage} />
				</Route>
				<Route path="/logout">
					<Logout sessionStorage={sessionStorage} />
				</Route>
				<Route path="/upload">
					<Upload sessionStorage={sessionStorage} />
				</Route>
				<Route path="/:id">
					<Video_box VideoList={VideoList} />
				</Route>
				<Route path="/">
					<Home VideoList={VideoList} />
				</Route>
			</Switch>
		</div>
	) : null;
}

export default App;
