import React from "react";
import {
	completeNotes,
	beamCodes,
	flagCodes,
	restCodes
} from "../UnicodeAssignment.js";

let checkFirst = (figure, unicodeFigure, value, mode) => {
	//f the first beat and the second beat are both active, add a beam to the right
	if (figure[0] === 1 && figure[1] === 1) {
		unicodeFigure.push(
			<div className="rp-note">
				{completeNotes.beamless}
				<div className="rp-eighthbeam">{beamCodes[value]}</div>
			</div>
		);
		//if the first beat is active but the second beat is a rest, add a flag
	} else if (figure[0] === 1 && figure[1] === 0) {
		unicodeFigure.push(
			<div className="rp-note" style={{ marginRight: "34px" }}>
				{completeNotes.beamless}

				{mode === "bar" ? null : (
					<div className="rp-eighthflag">{flagCodes[value].up}</div>
				)}
			</div>
		);
		//if the current beat is a rest, push a rest
	} else if (figure[0] === 0) {
		unicodeFigure.push(
			<div className="rp-rest" style={{ marginLeft: "0px" }}>
				{restCodes[value]}
			</div>
		);
	}
};

//Checks to see which beam to push for any middle note
let checkMid = (figure, unicodeFigure, i, value, mode) => {
	//if the current beat, the one before and the one after are active, add a through beam
	if (figure[1 + i] === 1 && figure[0 + i] === 1 && figure[2 + i] === 1) {
		unicodeFigure.push(
			<div className="rp-note">
				{completeNotes[value]}
				<div className="rp-eighthbeam">{beamCodes[value]}</div>
			</div>
		);
		//if the current beam is active, but only the one after is active, add a beam to the right
	} else if (
		figure[0 + i] === 0 &&
		figure[1 + i] === 1 &&
		figure[2 + i] === 1
	) {
		unicodeFigure.push(
			<div className="rp-note">
				{completeNotes.beamless}
				<div className="rp-eighthbeam">{beamCodes[value]}</div>
			</div>
		);
		//if the current beam is active, but only the one before is active, add a beam to the left
	} else if (
		figure[0 + i] === 1 &&
		figure[1 + i] === 1 &&
		figure[2 + i] === 0
	) {
		unicodeFigure.push(
			<div className="rp-note">{completeNotes[value]}</div>
		);
		//if only the current beat is active, add a flag
	} else if (
		figure[0 + i] === 0 &&
		figure[1 + i] === 1 &&
		figure[2 + i] === 0
	) {
		unicodeFigure.push(
			<div className="rp-note">
				{completeNotes.beamless}

				<div className="rp-eighthflag">{flagCodes[value].up}</div>
			</div>
		);
	} else if (
		figure[0 + i] === 1 &&
		figure[1 + i] === 0 &&
		figure.length === 3 &&
		mode === "bar"
	) {
		return;
		//if the current beat is a rest, push a rest
	} else if (figure[1 + i] === 0) {
		unicodeFigure.push(<div className="rp-rest">{restCodes[value]}</div>);
	}
};

//Checks to see which beam for last note
let checkLast = (figure, unicodeFigure, value, mode) => {
	if (figure[figure.length - 1] === 1 && figure[figure.length - 2] === 1) {
		//if last beat and the one before are active, add a beam to the left
		unicodeFigure.push(
			<div className="rp-note" style={{ marginRight: "17px" }}>
				{completeNotes[value]}
			</div>
		);
		//if only last beat is active, add a flag
	} else if (
		figure[figure.length - 1] === 1 &&
		figure[figure.length - 2] === 0
	) {
		unicodeFigure.push(
			<div className="rp-note" style={{ marginRight: "17px" }}>
				{completeNotes.beamless}
				<div className="rp-eighthflag">{flagCodes[value].up}</div>
			</div>
		);
		//if the current beat is a rest
	} else if (
		figure[figure.length - 2] === 1 &&
		figure[figure.length - 1] === 0 &&
		figure.length === 2 &&
		mode === "bar"
	) {
		return;
		//if the current beat is a rest, push a rest
	} else if (figure[figure.length - 1] === 0) {
		unicodeFigure.push(<div className="rp-rest">{restCodes[value]}</div>);
	}
};

// render beamless black notes
let renderBeamless = (i, e) => {
	i.forEach(note => {
		if (note === 1) {
			e.push(
				<div className="rp-note">
					{completeNotes.beamless}
					<div className="rp-spacer" />
				</div>
			);
		}
		if (note === 0) {
			e.push(<div className="rp-rest">{restCodes.quarter}</div>);
		}
	});
};

export { checkFirst, checkLast, checkMid, renderBeamless };
