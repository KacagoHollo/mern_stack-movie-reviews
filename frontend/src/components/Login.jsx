import { React } from "react";

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
		<div>
			<h2>Log in options:</h2>
			<button onClick={googleLogin}>Google Login</button>
		</div>
	);
};

export default Login;
