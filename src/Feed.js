import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Feed.css";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

function Feed() {
	const user = useSelector(selectUser);
	// Hook-- writen like a variable
	const [input, setInput] = useState("");
	//the const has an array of variable "posts" and a function which changes the variable
	const [posts, setPosts] = useState([]);

	// Hook that allows you to fire of code when the component loads
	// it also fires of when its re-rendered if the second arg is not passed "[]"
	useEffect(() => {
		//note that in the firebase db there is collection and there are docs in collection
		// onSnapshot gives us a realtime listener connection to the db which give a snapshot of the posts NB: these methods are from firebase
		// the posts here is the name of the collection in the db
		db.collection("posts")
			// odering by the timestamp and arranged in descending order
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
	}, []);

	// sending Post
	const sendPost = (e) => {
		e.preventDefault();

		db.collection("posts").add({
			name: user.displayName,
			description: user.email,
			message: input,
			photoUrl: user.photoUrl || "", //use the user.photo or if it doesnt exist use ""
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput("");
	};

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<Avatar className="avatar__img" src={user.photoUrl}>{user?.displayName[0]}</Avatar>
					<form>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
							placeholder="Start a post"
						/>
						<button onClick={sendPost} type="submit">
							Send
						</button>
					</form>
				</div>
				<div className="feed__inputOptions">
					{/* Icon start with capital coz iits a component u are passing */}
					<InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
					<InputOption Icon={YouTubeIcon} title="Video" color="#7fc15e" />
					<InputOption Icon={EventNoteIcon} title="Event" color="#e7a33e" />
					<InputOption
						Icon={CalendarViewDayIcon}
						title="Write article"
						color="#fc9295"
					/>
				</div>
			</div>

			<hr />

			{/* Posts */}

			<FlipMove>
				{posts.map(({ id, data: { name, description, message, photoUrl } }) => (
					<Post
						//passing the props to the Post component
						// key is very important when rendering out a list & the FlipMove animation needs it to work
						key={id}
						name={name}
						description={description}
						message={message}
						photoUrl={photoUrl}
					/>
				))}
			</FlipMove>
		</div>
	);
}

export default Feed;
