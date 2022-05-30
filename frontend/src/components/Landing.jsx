import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import message from "./message";

const Landing = ({ server, domain, setDomain }) => {
	const navigate = useNavigate();

	/* const sendRequest = async (url) => {
		try {
			const res = await axios(`${server}${url}`, {
				headers: {
					authorization: sessionStorage.getItem("token"),
				},
			});
			setDomain(res.data);
		} catch (error) {
			if (!error.response) {
				message("Network error");
			} else if (error.response.status === 401) {
				message("Login expired.");
				sessionStorage.removeItem("token");
				setDomain("");
				navigate("/login");
			} else {
				message("Hiba");
			}
		}
	}; */

	return <div></div>;
};

export default Landing;
