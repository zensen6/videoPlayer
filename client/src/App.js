import Form from './components/form';
import Comments from './components/comments';
import { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.scss';

function App() {
	const [ text, stateText ] = useState('');

	return (
		<div className="App">
			<h1>11111122233</h1>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Form />} />
					<Route path="/comments" element={<Comments />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
