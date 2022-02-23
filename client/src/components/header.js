import { Link } from 'react-router-dom';

const Header = ({ loggedIn, sessionStorage }) => {
	return (
		<div className="header_component">
			{loggedIn !== null ? (
				<div className="header_little">
					<div className="search_bar">
						<form>
							<input />
						</form>
					</div>
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
				</div>
			)}
		</div>
	);
};

export default Header;
