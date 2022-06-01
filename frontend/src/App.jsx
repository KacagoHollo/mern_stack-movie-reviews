import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { React, useState } from "react";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import Redirect from "./components/Redirect";

function App() {
	const server = "http://localhost:4000/api";
	const url = "http://localhost:3000";
	const client_id =
		"49752783666-472eikn6usgtfi93ka8mt93qjpdbfd52.apps.googleusercontent.com";
	const [domain, setDomain] = useState("");

	return (
		<Router>
			<Header setDomain={setDomain} />
			<Routes>
				{/* <Route path="/" element={<Landing />}></Route> */}
        <Route
          path={`/`}
          exact
          element={<Landing server={server} domain={domain} setDomain={setDomain}/>}
				/>
				<Route path="/movie" element={<Movie />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route
          path={`/login`}
          exact
          element={<Login server={server} client_id={client_id} url={url} />}
				/>
				<Route
          path={`/redirect`}
          exact
          element={<Redirect server={server} client_id={client_id} url={url} />}
        />
			</Routes>
		</Router>
	);
}

export default App;
