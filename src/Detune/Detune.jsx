import React, { Component } from "react";
import Tone from "tone";

export default class Detune extends Component {
	constructor() {
		super();
		this.state = {
			synth: new Tone.PolySynth().toMaster(),
			octave: 4,
			wave: "triangle",
			currentNote: "",
			pitchClasses: [{ class: "C", frequency: 200 }]
		};
	}

	setNote = (event, value) => {
		event.preventDefault();
		this.setState({ currentNote: value }, () => {
			this.state.synth.triggerAttack(this.state.currentNote);
		});
	};

	createWhiteNotes = () => {
		let notes = ["C", "D", "E", "F", "G", 438, "B"];
		let currentNote = this.state.currentNote;
		// currentNote = currentNote.replace(/[0-9]/g, "");
		let ret = notes.map(note => {
			if (currentNote === note) {
				return (
					<div
						className="whitenotebutton selected"
						onClick={event =>
							this.setNote(event, note + this.state.octave)
						}
					>
						{note}
					</div>
				);
			} else {
				return (
					<div
						className="whitenotebutton"
						onClick={event =>
							this.setNote(event, note + this.state.octave)
						}
					>
						{note}
					</div>
				);
			}
		});

		return ret;
	};

	createBlackNotes = () => {
		let notes = ["Db", "Eb", "spacer", "GB", "Ab", "Bb"];
		let currentNote = this.state.currentNote;
		// currentNote = currentNote.replace(/[0-9]/g, "");
		let ret = notes.map(note => {
			if (currentNote === note) {
				return (
					<div
						className="blacknotebutton selected"
						onClick={event =>
							this.setNote(event, note + this.state.octave)
						}
					>
						{note}
					</div>
				);
			} else if (note === "spacer") {
				return <div className="notespacer" />;
			} else {
				return (
					<div
						className="blacknotebutton"
						onClick={event =>
							this.setNote(event, note + this.state.octave)
						}
					>
						{note}
					</div>
				);
			}
		});

		return ret;
	};

	render = () => {
		return (
			<div>
				{" "}
				<div>
					<div className="blacknotes">{this.createBlackNotes()}</div>

					<div className="whitenotes">{this.createWhiteNotes()}</div>
				</div>
			</div>
		);
	};
}
