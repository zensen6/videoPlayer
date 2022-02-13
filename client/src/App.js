import Form from './components/form';
import Comments from './components/comments';
import { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/app.scss';

function App() {
	const [ text, stateText ] = useState('');
	const [ user, stateUser ] = useState({});

	return (
		<div className="App">
			<h1>11111122233</h1>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Form text={text} stateText={stateText} user={user} stateUser={stateUser} />}
					/>
					<Route path="/comments" element={<Comments text={text} />} />
				</Routes>
			</BrowserRouter>
			<h1>{user.email}</h1>
		</div>
	);
}

export default App;
