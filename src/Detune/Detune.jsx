import React, { Component } from "react";
import Tone from "tone";
import "./Detune.css";

export default class Detune extends Component {
	constructor() {
		super();
		this.state = {
			synth: new Tone.PolySynth(4, Tone.Synth, {
				oscillator: { type: "triangle" }
			}).toMaster(),
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
				"Gb",
				"G",
				"Ab",
				"A",
				"Bb",
				"B"
			],
			pitchValues: [],
			globalDetune: 0,
			currentTemperament: undefined,
			showFrequencies: true
		};
	}

	componentWillMount = () => {
		this.getEqualTemperament();
	};

	getEqualTemperament = () => {
		//create return array
		let pitchValues = [];
		//i starts at the lower octave to be dispalyed and the for ends before the highest octave to be dispalyed
		for (let i = 4; i < 6; i++) {
			let pitchClasses = this.state.pitchClasses.map(pitchClass => {
				//pitch class + octave
				let pitch = pitchClass + i;
				//white note unless is has an accidental
				let color = "white";
				if (pitch[1] === "b" || pitch[1] === "#") color = "black";
				return {
					pitch,
					frequency: Tone.Frequency(pitch).toFrequency(),
					ratio: undefined,
					color
				};
			});
			//create one large array with all pitches
			pitchValues = pitchValues.concat(pitchClasses);
		}
		this.setState({ pitchValues, currentTemperament: "equal" }, () => {
			console.log("state", this.state);
		});
	};

	getJustIntonation = tonic => {
		//get values from state
		let pitchClasses = this.state.pitchClasses;
		let pitchValues = [...this.state.pitchValues];
		let ratios = [
			[1, 1],
			[25, 24],
			[9, 8],
			[6, 5],
			[5, 4],
			[4, 3],
			[45, 32],
			[3, 2],
			[8, 5],
			[5, 3],
			[9, 5],
			[15, 8]
		];
		//find the frequency of the note from which to derive rations
		let tonicFrequency = Tone.Frequency(tonic + "4").toFrequency();
		//cut the ratios array in half and switch the position of the two halves.
		//this is done so that the index of the ratios matches the index of the pitch classes
		//for example if we want just intonation in F, the index of ratio [1, 1] must match the index of F
		let index = pitchClasses.indexOf(tonic);
		let distanceToEnd = pitchClasses.length - index;
		let firstHalf = ratios.slice(distanceToEnd, ratios.length);
		let secondHalf = ratios.slice(0, distanceToEnd);
		let ratiosRearranged = firstHalf.concat(secondHalf);
		let offset = 0;
		let octaveMultiplier = 1;
		pitchValues.forEach((pitchValue, i) => {
			pitchValue.frequency =
				((tonicFrequency * ratiosRearranged[i - offset][0]) /
					ratiosRearranged[i - offset][1]) *
				octaveMultiplier;
			if (i - offset < index) {
				pitchValue.frequency = pitchValue.frequency / 2;
			}

			pitchValue.ratio = ratiosRearranged[i - offset];

			if (i === ratiosRearranged.length - 1) {
				offset += 12;
				octaveMultiplier = octaveMultiplier * 2;
			}
		});

		this.setState({ pitchValues, currentTemperament: "just" });
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
			if (note.color === "white") {
				if (parseInt(currentNote) > 3 && parseInt(currentNote) < 6) {
					let className = "whitenotebutton";
					if (currentNote === note) {
						className = "whitenotebutton selected";
					}
					return (
						<div
							className={className}
							onClick={event =>
								this.setNote(event, note.frequency)
							}
						>
							<div>
								<div>{note.pitch}</div>
								{note.ratio !== undefined ? (
									<div
										style={{
											fontSize: "16px",
											display: "flex",
											justifyContent: "center"
										}}
									>
										{note.ratio[0]}:{note.ratio[1]}
									</div>
								) : null}
								{this.state.showFrequencies ? (
									<div
										style={{
											fontSize: "16px",
											display: "flex",
											justifyContent: "center"
										}}
									>
										{note.frequency.toFixed(2)}
									</div>
								) : null}
							</div>
						</div>
					);
				}
			}
		});

		return ret;
	};

	createBlackNotes = () => {
		let notes = this.state.pitchValues;
		let ret = notes.map(note => {
			let currentNote = note.pitch.replace(/[\D]/g, "");
			if (note.color === "black") {
				if (parseInt(currentNote) > 3 && parseInt(currentNote) < 6) {
					let className = "blacknotebutton";
					if (currentNote === note) {
						className = "blacknotebutton selected";
					}
					return (
						<React.Fragment>
							<div
								className={className}
								onClick={event =>
									this.setNote(event, note.frequency)
								}
							>
								<div>
									<div>{note.pitch}</div>
									{note.ratio !== undefined ? (
										<div
											style={{
												fontSize: "16px",
												display: "flex",
												justifyContent: "center"
											}}
										>
											{note.ratio[0]}:{note.ratio[1]}
										</div>
									) : null}
									{this.state.showFrequencies ? (
										<div
											style={{
												fontSize: "16px",
												display: "flex",
												justifyContent: "center"
											}}
										>
											{note.frequency.toFixed(2)}
										</div>
									) : null}
								</div>
							</div>
							{note.pitch[0] === "E" ? (
								<div className="notespacer"></div>
							) : null}
							{note.pitch[0] === "B" ? (
								<div className="notespacer"></div>
							) : null}
						</React.Fragment>
					);
				}
			}
		});

		return ret;
	};

	render = () => {
		console.log("state", this.state);
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				{" "}
				<div style={{ marginTop: "50px" }}>
					<div className="blacknotes">{this.createBlackNotes()}</div>

					<div className="whitenotes">{this.createWhiteNotes()}</div>
					<div className="detune-selector">
						<div>
							Equal Temperament
							<input
								type="radio"
								name="temperamentSelect"
								onChange={event => this.getEqualTemperament()}
								defaultChecked={true}
							/>
						</div>
						<div>
							Just intonation
							<input
								type="radio"
								name="temperamentSelect"
								onChange={event => this.getJustIntonation("C")}
							/>
							in{" "}
							<select
								disabled={
									this.state.currentTemperament !== "just"
								}
								onChange={event =>
									this.getJustIntonation(event.target.value)
								}
							>
								{this.state.pitchClasses.map(pitchClass => {
									return (
										<option value={pitchClass}>
											{pitchClass}
										</option>
									);
								})}
							</select>
						</div>
						<div
							className="waveselector"
							onClick={event => this.state.synth.releaseAll()}
						>
							Release all
						</div>
					</div>
				</div>
			</div>
		);
	};
}
