import React, { Component } from "react";
import Tone from "tone";
import Metronome from "./Metronome.jsx";
import Looper from "./Looper.jsx";
import "./Simple.css";

export default class Simple extends Component {
	constructor() {
		super();
		this.state = {
			synth: new Tone.Synth().toMaster(),
			octave: 4,
			wave: "triangle",
			currentNote: ""
		};
	}
	componentDidMount = () => {
		let state = { ...this.state };
		state.volume = new Tone.Volume(0);
		state.synth.chain(state.volume, Tone.Master);
		state.synth.oscillator.type = this.state.wave;
		Tone.Master.volume.value = -15;
		this.setState(state);
	};

	componentWillUnmount = () => {
		this.stopMe();
	};

	setNote = (event, value) => {
		event.preventDefault();
		this.setState({ currentNote: value }, () => {
			this.state.synth.triggerAttack(this.state.currentNote);
		});
	};

	setOctave = (event, value) => {
		let newNote = this.state.currentNote.substring(
			0,
			this.state.currentNote.length - 1
		);
		newNote = newNote + value;
		this.setState({ octave: value }, () => {
			this.setNote(event, newNote);
		});
	};

	setWave = (event, value) => {
		event.preventDefault();
		let state = { ...this.state };
		state.synth.oscillator.type = value;
		state.wave = value;
		this.setState(state, console.log("state", this.state));
	};

	stopMe = event => {
		// event.preventDefault();
		this.state.synth.triggerRelease();
		this.setState({ currentNote: "" });
	};

	adjustVolume = event => {
		event.preventDefault();
		let state = { ...this.state };
		state.volume.volume.value = event.target.value;
		this.setState({ state });
	};

	createWaveSelectors = () => {
		let waveforms = ["sine", "square", "triangle", "sawtooth"];
		let ret = waveforms.map(waveform => {
			if (this.state.wave === waveform) {
				return (
					<div
						className="waveselector selected"
						onClick={event => {
							this.setWave(event, waveform);
						}}
					>
						{waveform.charAt(0).toUpperCase() + waveform.slice(1)}
					</div>
				);
			} else {
				return (
					<div
						className="waveselector"
						onClick={event => {
							this.setWave(event, waveform);
						}}
					>
						{waveform.charAt(0).toUpperCase() + waveform.slice(1)}
					</div>
				);
			}
		});
		return ret;
	};

	createOctaveSelectors = () => {
		let ret = [];
		for (let i = 2; i < 6; i++) {
			if (this.state.octave === i) {
				ret.push(
					<div
						className="octave-selector selected"
						onClick={event => this.setOctave(event, i)}
					>
						{i}
					</div>
				);
			} else {
				ret.push(
					<div
						className="octave-selector"
						onClick={event => this.setOctave(event, i)}
					>
						{i}
					</div>
				);
			}
		}
		return ret;
	};

	createWhiteNotes = () => {
		let notes = ["C", "D", "E", "F", "G", "A", "B"];
		let currentNote = this.state.currentNote;
		currentNote = currentNote.replace(/[0-9]/g, "");
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
		currentNote = currentNote.replace(/[0-9]/g, "");
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
			<div className="drone-container">
				<div className="instructions">
					This app lets you practice intonation by generating a drone.
				</div>
				<div className="instructions">
					Simply click on the note you choose. You can also change the
					octave.
				</div>
				<div className="drone-container">
					<div
						style={{
							display: "flex",
							marginBottom: "20px",
							justifyContent: "center"
						}}
					>
						<div className="select-container">
							<div style={{ marginBottom: "10px" }}>OCTAVE</div>
							<div style={{ display: "flex" }}>
								{this.createOctaveSelectors()}
							</div>
						</div>
						<Metronome />
					</div>
					<div
						style={{
							display: "flex",
							marginBottom: "20px",
							justifyContent: "space-between",
							width: "445px"
						}}
					>
						{this.createWaveSelectors()}
					</div>
				</div>
				<div
					style={{
						marginBottom: "20px",
						display: "flex"
					}}
				>
					<div className="vertical-slider-container">
						<div>Volume</div>
						<input
							type="range"
							min="-12"
							max="12"
							className="slider-vertical"
							id="volumeSlider"
							defaultValue="0"
							onChange={event => {
								this.adjustVolume(event);
							}}
						/>
					</div>
					<div>
						<div className="blacknotes">
							{this.createBlackNotes()}
						</div>

						<div className="whitenotes">
							{this.createWhiteNotes()}
						</div>
					</div>
				</div>
				<button id="stop" onClick={this.stopMe}>
					Stop!
				</button>
			</div>
		);
	};
}
