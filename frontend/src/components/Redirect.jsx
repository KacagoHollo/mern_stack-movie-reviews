import { React, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import message from "./message";

const Redirect = ({ server, url }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const authenticate = async () => {
		const code = searchParams.get("code");

		try {
			const response = await axios.post(`${server}/user/authenticate`, {
				code,
			});
			sessionStorage.setItem("token", response.data);
			message("User signed in.");
			navigate(`/`);
		} catch (error) {
			if (!error.response) {
				message("Network error");
			} else if (error.response.status === 403) {
				message("User not verified.");
			} else if (error.response.status === 401) {
				message("Wrong creditentials.");
			} else if (error.response.status === 400) {
				message("Bad request.");
			} else {
				message("Server error.");
			}
			sessionStorage.removeItem("token");
			navigate(`/login`);
		}
	};

	useEffect(() => {
		authenticate();
	}, []);

	return <div>Redirecting...</div>;
};

export default Redirect;
