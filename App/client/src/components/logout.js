import axios from 'axios';

const Logout = ({ sessionStorage }) => {
	console.log('destroy');
	sessionStorage.removeItem('loginId');
	axios
		.post('/api/logout')
		.then(function(res) {
			alert('logged out');
		})
		.catch(function(err) {
			alert('log out failed');
		});
	window.location = '/';
	return <div />;
};

export default Logout;
