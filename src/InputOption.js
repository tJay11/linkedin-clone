import React from "react";
import "./InputOption.css";

function InputOption({Icon, title, color}) {
	return <div className="inputOption">
		{/* Icon start with a capital coz its a component that you will be passing */}
		<Icon style={{color: color}} />
		<h4>{title}</h4>
	</div>;
}

export default InputOption;
