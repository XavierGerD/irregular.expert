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
			pitchClasses: [
				"C",
				"Db",
				"D",
				"Eb",
				"E",
				"F",
				"GB",
				"G",
				"Ab",
				"A",
				"Bb",
				"B"
			],
			pitchValues: [],
			globalDetune: 0
		};
	}

	componentWillMount = () => {
		let pitchValues = [];
		for (let i = 1; i < 8; i++) {
			let pitchClasses = this.state.pitchClasses.map(pitchClass => {
				let pitch = pitchClass + i;
				return {
					pitch,
					frequency: Tone.Frequency(pitch).toFrequency()
				};
			});
			pitchValues = pitchValues.concat(pitchClasses);
		}
		this.setState({ pitchValues });
	};

	getRatios = tonic => {
		let pitchClasses = [...this.state.pitchClasses];
		let index = pitchClasses.indexOf(tonic) + 1;
		let loopComplete = false;
		for (let i = index; i < pitchClasses.length; i++) {
			if (i === pitchClasses.length - 1 && !loopComplete) {
				i = 0;
			}
			if (pitchClasses[i] === tonic) loopComplete = true;
		}
	};

	setJustIntonation = tonic => {
		tonic = tonic + 4;
		let pitchValues = [...this.state.pitchValues];
		pitchValues.map(pitchValue => {
			return pitchValue;
		});
	};

	setNote = (event, value) => {
		event.preventDefault();
		this.setState({ currentNote: value }, () => {
			this.state.synth.triggerAttack(this.state.currentNote);
		});
	};

	createWhiteNotes = () => {
		let notes = this.state.pitchValues;
		let ret = notes.map(note => {
			let currentNote = note.pitch.replace(/[\D]/g, "");
			if (parseInt(currentNote) > 3 && parseInt(currentNote) < 6) {
				let className = "whitenotebutton";
				if (currentNote === note) {
					className = "whitenotebutton selected";
				}
				return (
					<div
						className={className}
						onClick={event => this.setNote(event, note.frequency)}
					>
						{note.pitch}
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
		console.log("state", this.state);
		return (
			<div>
				{" "}
				<div>
					{/* <div className="blacknotes">{this.createBlackNotes()}</div> */}

					<div className="whitenotes">{this.createWhiteNotes()}</div>
				</div>
			</div>
		);
	};
}
