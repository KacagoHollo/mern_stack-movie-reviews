import { React } from "react";
import Button from '@mui/material/Button'

const Login = ({ server, client_id, url }) => {
	const googleLogin = async () => {
		window.open(
			`https://accounts.google.com/o/oauth2/v2/auth
			?response_type=code
			&client_id=${client_id}
			&scope=openid%20email
			&redirect_uri=${url}/redirect`,
			"_self"
		);
	};

	return (
		<div className="options">
			<h2>Log in options:</h2>
			<Button onClick={googleLogin}>Google Login</Button>
		</div>
	);
};

export default Login;
