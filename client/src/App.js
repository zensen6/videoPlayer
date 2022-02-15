import Form from './components/form';
import Comments from './components/comments';
import Header from './components/header';
import Signup from './components/signup';
import { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/app.scss';

function App() {
	const [ text, stateText ] = useState('');
	const [ user, stateUser ] = useState({});

	return (
		<div className="App">
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/comments" element={<Comments text={text} />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/"
						element={<Form text={text} stateText={stateText} user={user} stateUser={stateUser} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
