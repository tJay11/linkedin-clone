import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function App() {
	// useSelector is a hook from redux which allows you to extract data from data store
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	//set a lister which runs when the app is initialised to see if there is a user
	useEffect(() => {
		//onAuthStateChanged is a listerner
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//user is logged in
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth.uid,
						displayName: userAuth.displayName,
						photoUrl: userAuth.photoURL,
					})
				);
			} else {
				//user is logged out
				// dispatch logut to the redux data store to make user=null
				dispatch(logout());
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<>
					<Header />
					<div className="app__body">
						<Sidebar />
						<Feed />
						<Widgets />
					</div>
				</>
			)}
		</div>
	);
}

export default App;
