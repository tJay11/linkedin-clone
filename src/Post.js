import { Avatar } from "@mui/material";
import React, { forwardRef } from "react";
import InputOption from "./InputOption";
import "./Post.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

//Changed to an arrow function because of how flipmove animation works with funcitonal components (src:github)
const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
	return (
		<div className="post" ref={ref}>
			<div className="post__header">
				<Avatar src={photoUrl}>{name[0]}</Avatar>
				<div className="post__info">
					<h2>{name}</h2>
					<p>{description}</p>
				</div>
			</div>

			<div className="post__body">
				<p>{message}</p>
			</div>

			<hr />
			<div className="post__buttons">
				<InputOption Icon={ThumbUpOutlinedIcon} title="Like" color="gray" />
				<InputOption Icon={CommentOutlinedIcon} title="Comment" color="gray" />
				<InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
				<InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
			</div>
		</div>
	);
});

export default Post;
