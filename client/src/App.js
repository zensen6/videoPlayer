import Form from './components/form';
import Comments from './components/comments';
import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/app.scss';

let sessionStorage = window.sessionStorage;
function App() {
	const [ text, stateText ] = useState('');
	const [ user, stateUser ] = useState({});
	const loggedIn = sessionStorage.getItem('loginId');
	console.log(loggedIn);
	return (
		<div className="App">
			<Header loggedIn={loggedIn} sessionStorage={sessionStorage} />
			<Routes>
				<Route path="/comments" element={<Comments text={text} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login sessionStorage={sessionStorage} />} />
				<Route path="/logout" element={<Logout sessionStorage={sessionStorage} />} />
				<Route
					path="/"
					element={<Form text={text} stateText={stateText} user={user} stateUser={stateUser} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
