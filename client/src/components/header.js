import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="header_component">
			<BrowserRouter>
				<Link to="/signup">Signup</Link>
			</BrowserRouter>
		</div>
	);
};

export default Header;
