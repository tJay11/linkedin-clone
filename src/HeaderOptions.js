import { Avatar } from "@mui/material";
import React from "react";
import "./HeaderOptions.css";

function HeaderOptions({ avatar, Icon, title }) {
  return (
    <div className="headerOptions">
      {/* if i pass in an Icon only then should i render the icon as a component */}
      {Icon && <Icon className="headerOptions__icon" />}

      {/* if i pass in an Avatar only then should i render the Avatar as a component */}
      {avatar && <Avatar className="headerOptions__icon" src={avatar} />}

      <h6 className="headerOptions__title">{title}</h6>
    </div>
  );
}

export default HeaderOptions;
