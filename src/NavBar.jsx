import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
	render = () => {
		return (
			<div className="navmain">
				<div className="title">
					IRREGULAR.EXPERT{" "}
					<div style={{ fontSize: "10px" }}>v.2.0</div>
				</div>

				<div style={{ display: "flex" }}>
					<div className="menuitem">
						<Link to={"/drone"}>Drone </Link>
					</div>
					<div className="menuitem">
						<Link to={"/"}>Rhythm </Link>
					</div>
				</div>
			</div>
		);
	};
}
