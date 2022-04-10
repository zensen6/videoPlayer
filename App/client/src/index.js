import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/header';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
