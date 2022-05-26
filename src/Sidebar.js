import { Avatar } from "@mui/material";
import React from "react";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import coverImg from "./assets/cover3.jpg";


import "./Sidebar.css";

function Sidebar() {
	const user = useSelector(selectUser);
	// if you use =>{ you have to return()} but another way to return is just => ()
	const recentItem = (topic) => (
		<div className="sidebar__recentItem">
			<span className="sidebar__hash">#</span>
			<p>{topic}</p>
		</div>
	);

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<img src={coverImg} alt="" />

				<Avatar src={user.photoUrl} className="sidebar__avatar">
					{user?.displayName[0]}
				</Avatar>

				<h2>{user.displayName}</h2>
				<h4>{user.email}</h4>
			</div>

			<div className="sidebar__stats">
				<div className="sidebar__stat">
					<div className="sidebar__statLabel">
						<p>Connections</p>
						<p className="textBold">Grow your network</p>
					</div>

					<p className="sidebar__statNumber">69</p>
				</div>
				<div className="sidebar__stat">
					<p>Who viewed your profile</p>
					<p className="sidebar__statNumber">7</p>
				</div>
			</div>

			<div className="sidebar__bottom">
				<p>Recent</p>
				{recentItem("reactjs")}
				{recentItem("programming")}
				{recentItem("frontend")}
				{recentItem("development")}
				{recentItem("softwareengineering")}
				{recentItem("figma")}
			</div>
		</div>
	);
}

export default Sidebar;
