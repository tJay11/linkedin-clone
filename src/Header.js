import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import HeaderOptions from "./HeaderOptions";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function Header() {
	return (
		<div className="header">
			<div className="header__content">
				<div className="header__left">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="34"
						height="34"
						viewBox="0 0 34 34"
						class="logo"
					>
						<title>LinkedIn</title>

						<g>
							<path
								d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z"
								fill="currentColor"
							></path>
						</g>
					</svg>

					<div className="header__search">
						<SearchIcon className="search__icon" />
						<input type="text" placeholder="Search" />
					</div>
				</div>

				{/* Using reusable components */}
				<div className="header__right">
					<HeaderOptions Icon={HomeIcon} title="Home" />
					<HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
					<HeaderOptions Icon={WorkIcon} title="Jobs" />
					<HeaderOptions Icon={CommentIcon} title="Messaging" />
					<HeaderOptions Icon={NotificationsIcon} title="Notifications" />
					<Dropdown avatar={true} title="Me">
						<DropdownMenu />
					</Dropdown>
				</div>
			</div>
		</div>
	);
}

//Dropdown fuctional component Section

function Dropdown({ avatar, title, children }) {
	const user = useSelector(selectUser);

	const [open, setOpen] = useState(false);

	return (
		<div className="dropdown" onClick={() => setOpen(!open)}>
			{/* if i pass in an Avatar only then should i render the Avatar as a component */}
			{/* user? is an optional chaining which shows that it might be undefined which protects it */}
			{avatar && (
				<Avatar className="dropdown__icon" src={user?.photoUrl}>
					<p>{user?.displayName[0]}</p>
				</Avatar>
			)}

			<h6 className="dropdown__title">
				{title}
				<span className={`arrow ${!open ? "" : "rotateArrow"}`}>
					<KeyboardArrowDownOutlinedIcon />
				</span>
			</h6>

			<div className="dropdown__content">{open && children}</div>
		</div>
	);
}

function DropdownMenu() {
	const dispatch = useDispatch();

	const logOutOfApp = () => {
		// dispatch logut to the redux data store to make user=null
		dispatch(logout());
		auth.signOut();
	};

	function MenuItems({ title, onClick }) {
		return (
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			<a href="#" className="menuItems" onClick={onClick}>
				{title}
			</a>
		);
	}
	return (
		<div className="dropdownMenu">
			<MenuItems title="Logout" onClick={logOutOfApp} />
		</div>
	);
}

export default Header;
