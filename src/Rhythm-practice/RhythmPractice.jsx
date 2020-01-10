import React, { Component } from "react";
import { checkFirst, checkLast, checkMid } from "./beamchecker.js";
import { fillInTuplets } from "./tupletBracketChecker.js";
import "./RhythmPractice.css";
import getTimeSig from "./render.js";
import {
	barlines,
	singleStaff,
	timeSignatureCodes
} from "../UnicodeAssignment.js";
import Instructions from "./Instructions.jsx";
import reducer from "./reducer.js";
import { blip01, blip02, clap, countdownSound } from "../Audio.js";

class RhythmPractice extends Component {
	state = {
		tempoInput: "60",
		repInput: "4",
		size: [[3]],
		timeSignatures: [0, 0],
		binaryFigures: [],
		displayedTimeSignatures: [undefined, undefined],
		displayedFigures: [],
		displayedTuplets: [],
		started: false,
		countDownCheck: false,
		allowEmptyBars: false,
		playAnswer: false,
		phase: "countdown",
		lastBeat: new Date() / 1,
		repCount: 1,
		subdivisionCount: 1,
		mode: "bar",
		playEveryEighth: false
	};

	countDownFrame;
	playAndCountFrame;

	componentWillUnmount = () => {
		this.stopExercise();
	};

	tempoInputHandler = e => {
		this.setState({ tempoInput: e.target.value });
	};

	repInputHandler = e => {
		this.setState({ repInput: e.target.value });
	};

	modeChangeHandler = ev => {
		let mode = ev.target.value;
		this.setState({ mode });
	};

	checkBoxChecker = (event, value) => {
		let size = [...this.state.size];
		//if box is being checked, push the value to the size array
		if (event.target.checked) {
			size.push(value);
		} else {
			//if the box is being unchecked, iterate through the size array and compare the values in subarrays to match with the one provided by the checkbox
			size.forEach((currentSize, i) => {
				let ret = true;
				if (currentSize.length === value.length) {
					currentSize.forEach((figure, j) => {
						if (figure !== value[j]) {
							//if these is any mismatch, ret is false
							ret = false;
						}
					});
					if (ret) {
						//if everything matches, remove the subdivisions array from size
						size.splice(i, 1);
					}
				}
			});
		}
		this.setState({ size }, () => {
			console.log("state", this.state);
		});
	};

	clickFrequencyChecker = e => {
		this.setState({ playEveryEighth: !this.state.playEveryEighth });
	};

	allowEmptyBarChecker = e => {
		this.setState({ allowEmptyBars: !this.state.allowEmptyBars });
	};

	playAnswerChecker = e => {
		this.setState({ playAnswer: !this.state.playAnswer });
	};

	getRandomTimeSig = size => {
		let randomSig = size[Math.floor(Math.random() * size.length)];
		if (this.state.mode === "tuplet") {
			randomSig = [randomSig.reduce(reducer, 0)];
		}

		console.log("random time sigs", randomSig);
		return randomSig;
	};

	//Generates random int between 0 and 1
	getRandomInt = (min, max) => {
		min = Math.ceil(0);
		max = Math.floor(2);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	//Adds values to an array
	getBinaryFigure = max => {
		//create returned array
		let ret = [];
		for (let i = 0; i < max; i++) {
			ret.push(this.getRandomInt());
		}
		if (!this.state.allowEmptyBars) {
			// if the bar is empty, return a new bar
			let empty = false;
			ret.forEach(value => {
				if (value === 1) {
					empty = true;
				}
			});
			if (!empty) {
				ret = this.getBinaryFigure(max);
			}
		}
		return ret;
	};

	//Assembles all components
	getFigure = (size, currentFigures) => {
		let value;
		if (
			this.state.mode === "bar" ||
			(this.state.mode === "tuplet" && (size[0] === 3 || size[0] === 2))
		) {
			value = "eighth";
		} else if (this.state.mode === "tuplet") {
			value = "sixteenth";
		}
		// create temporary array where the rhythmic figure for each subdivision is stored as binary (1 = note, 0 = rest)
		let binaryFigures = [];
		size.forEach(subdivision => {
			binaryFigures.push(this.getBinaryFigure(subdivision));
		});
		// translate the binary figure into a series of divs containing unicode characters
		let unicodeFigures = [];
		//iterate through each subdivision
		binaryFigures.forEach(figure => {
			//create array where the unicode subdivison will be pushed
			let unicodeFigure = [];
			//convert binary figures into unicode symbols. these functions return properly-beamed notes
			checkFirst(figure, unicodeFigure, value);
			for (let i = 0; i < figure.length - 2; i++) {
				checkMid(figure, unicodeFigure, i, value);
			}
			checkLast(figure, unicodeFigure, value);
			unicodeFigures.push(unicodeFigure);
		});
		//concatenate all subdivisions to store the values of the bar/tuplet in the state.
		let sum = [].concat.apply([], binaryFigures);
		currentFigures.push(sum);
		return unicodeFigures;
	};

	loadNewImage = () => {
		// copy values from state
		let binaryFigures = [...this.state.binaryFigures];
		let displayedFigures = [...this.state.displayedFigures];
		let displayedTimeSignatures = [...this.state.displayedTimeSignatures];
		let displayedTuplets = [...this.state.displayedTuplets];
		let timeSignatures = [...this.state.timeSignatures];
		// get a random time signature from the size array,
		let e = this.getRandomTimeSig(this.state.size);
		// remove the first figure and generate a new one, remove first time signature and generate new one
		binaryFigures.shift();
		displayedFigures.shift();
		displayedFigures.push(this.getFigure(e, binaryFigures));
		timeSignatures.shift();
		timeSignatures.push(e);
		if (this.state.mode === "bar") {
			displayedTimeSignatures.shift();
			getTimeSig(e, displayedTimeSignatures, 1, this.state.mode);
			timeSignatures[1] = timeSignatures[1].reduce(reducer, 0);
		}

		if (this.state.mode === "tuplet") {
			displayedTuplets.shift();
			displayedTuplets.push(fillInTuplets(e));
			if (e[0] === 4) {
				displayedTuplets[1] = null;
			}
		}
		this.setState({
			binaryFigures,
			displayedFigures,
			displayedTimeSignatures,
			displayedTuplets,
			timeSignatures
		});
	};

	playAndCount = () => {
		let now = new Date() / 1;
		let clickInterval;
		let repCount = this.state.repCount;
		let subdivisionCount = this.state.subdivisionCount;
		let divider;
		let unevenBeat = false;
		if (this.state.mode === "bar") {
			// set an event every subdivision of the pulse
			divider = 2;
			unevenBeat = subdivisionCount % 2 === 1;
			// console.log("uneven beat?", unevenBeat);
		} else if (this.state.mode === "tuplet") {
			//divide whole bar by the time signature
			divider = this.state.timeSignatures[0];
		}
		// set the frequency of each potential click
		clickInterval = 60000 / parseInt(this.state.tempoInput) / divider;
		if (now - this.state.lastBeat > clickInterval) {
			if (this.state.repCount === 1 && this.state.phase === "play") {
				//load new image and ensure a new one isn't loaded right after
				this.loadNewImage();
				this.setState({ phase: "firstFigure" });
			}

			if (
				!this.state.playEveryEighth &&
				this.state.timeSignatures[0] === 6
			) {
				if (subdivisionCount === 1) {
					blip02.play();
				} else if (subdivisionCount === 4) {
					blip01.play();
				}
			} else if (!this.state.playEveryEighth && unevenBeat) {
				// play only a click on uneven beats (strong beats)
				if (subdivisionCount === 1) {
					blip02.play();
				} else {
					blip01.play();
				}
			} else if (
				!this.state.playEveryEighth &&
				this.state.mode === "tuplet"
			) {
				// play only a click on the first beat of the bar
				if (subdivisionCount === 1) {
					blip02.play();
				}
			} else if (this.state.playEveryEighth) {
				// play a click on every subdivision
				if (subdivisionCount === 1) {
					blip02.play();
				} else {
					blip01.play();
				}
			}

			if (this.state.playAnswer) {
				if (this.state.binaryFigures[0][subdivisionCount - 1] === 1) {
					clap.play();
				}
			}

			subdivisionCount++;
			if (subdivisionCount > this.state.timeSignatures[0]) {
				// increase the repcount and reset subdivision counter
				repCount++;
				subdivisionCount = 1;
			}
			if (repCount > parseInt(this.state.repInput)) {
				//reset repcount and prepare to load new image at next loop
				// console.log("resetting repcount!");
				repCount = 1;
				if (this.state.phase === "firstFigure") {
					this.setState({ phase: "play" });
				}
			}
			this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
			let lastBeat = new Date() / 1;
			this.setState({ repCount, lastBeat, subdivisionCount });
			return;
		}
		this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
	};

	countDown = () => {
		//if countdown is already done, return
		if (this.state.countDownCheck) return;
		//set the current date to check if enough time has passed
		let now = new Date() / 1;
		//number of clicks per minute
		let clickInterval = 60000 / parseInt(this.state.tempoInput);
		if (now - this.state.lastBeat > clickInterval) {
			let repCount = this.state.repCount;
			if (repCount > 4) {
				//if the 4 beat countdown is over, reset repcount and start the exercise
				repCount = 1;
				let countDownCheck = true;
				this.setState({
					repCount,
					countDownCheck,
					phase: "firstFigure"
				});
				this.playAndCount();
				return;
			}
			countdownSound.play();

			repCount++;
			// if the coundown isn't over, set the time of the last beat and call the function again
			let lastBeat = new Date() / 1;
			this.countDownFrame = requestAnimationFrame(this.countDown);
			this.setState({ repCount, lastBeat });
			return;
		}
		this.countDownFrame = requestAnimationFrame(this.countDown);
	};

	startExercise = () => {
		if (this.state.size.length > 0 && !this.state.started) {
			// copy values from state
			let timeSignatures = [...this.state.timeSignatures];
			let binaryFigures = [...this.state.binaryFigures];
			let displayedFigures = [...this.state.displayedFigures];
			let displayedTimeSignatures = [
				...this.state.displayedTimeSignatures
			];
			let displayedTuplets = [...this.state.displayedTuplets];
			// going through possible time signatures for each of the two displayed bars
			timeSignatures.forEach((timeSignature, i) => {
				//select a random value in the possible sizes (time signatures) and push both the time signature symbol and its corresponding rhythmic figure
				if (this.state.mode === "bar") {
					//generate a random number based on the user's selected possible values which will become the time signature
					timeSignatures[i] = this.getRandomTimeSig(this.state.size);
					//generate the rhythmic figures to be dispalyed. first arg is an array containing each subdivision of the bar,
					//second is the array in which these values will be stored in the state
					displayedFigures.push(
						this.getFigure(timeSignatures[i], binaryFigures)
					);
					//generate the unicode symbols for the time signature
					getTimeSig(
						timeSignatures[i],
						displayedTimeSignatures,
						i,
						this.state.mode
					);
					// rewrite the time signature as the sum of all subdivisions
					timeSignatures[i] = timeSignatures[i].reduce(reducer, 0);
				}
				if (this.state.mode === "tuplet") {
					timeSignatures[i] = this.getRandomTimeSig(this.state.size);
					console.log("time siggiez", timeSignatures);
					displayedFigures.push(
						this.getFigure(timeSignatures[i], binaryFigures)
					);
					getTimeSig([1], displayedTimeSignatures, i);
					displayedTuplets.push(fillInTuplets(timeSignatures[i]));
					if (timeSignatures[i][0] === 4) {
						displayedTuplets[i] = null;
					}
				}
			});
			//start countdown, update state
			this.countDown();
			let started = true;
			this.setState({
				started,
				timeSignatures,
				binaryFigures,
				displayedFigures,
				displayedTimeSignatures,
				displayedTuplets
			});
		}
	};

	stopExercise = () => {
		cancelAnimationFrame(this.countDownFrame);
		cancelAnimationFrame(this.playAndCountFrame);
		this.setState({
			timeSignatures: [0, 0],
			binaryFigures: [],
			displayedFigures: [],
			displayedTuplets: [],
			started: false,
			repCount: 1,
			subdivisionCount: 1,
			countDownCheck: false,
			phase: "countdown"
		});
	};

	createValueSelectors = () => {
		//list of possible subdivisions for rhythmic values. their sum represents the total number of 8th notes in the bar or the size of the tuplet
		let values = [[3], [2, 2], [3, 2], [3, 3], [3, 2, 2], [2, 2, 2, 2]];
		//automatically generate checkboxes
		let ret = values.map(value => {
			//sum of all the subdivisions in the bar this is displayed next to the radio button
			let sumValue = value.reduce(reducer, 0);
			let checked = false;
			//check 3 by default
			if (sumValue === 3) {
				checked = true;
			}
			return (
				<div>
					{sumValue}
					{sumValue === 8 ? " (4/4)" : null}
					<input
						type="checkbox"
						onClick={event => {
							this.checkBoxChecker(event, value);
						}}
						defaultChecked={checked}
						className="checkbox"
						id={"timeSigButton" + value}
					/>
				</div>
			);
		});
		return ret;
	};

	render = () => {
		return (
			<div className="rhythmContainer">
				<div className="instructions">
					<div style={{ width: "1000px" }}>
						<div>
							This app allows you to practice all types of regular
							and irregular rhythmic groups, as well as
							alternating between different values. It works by
							randomly generating an endless number of rhythmic
							figures. Simply start the app and clap your hands or
							follow along with your instrument. The value in the
							first bar is to be played as many times as the rep
							number. The second bar is provided for ease of
							reading.
						</div>
					</div>
				</div>
				<div className="rhythmContainer">
					<div>
						<button id="start" onClick={this.startExercise}>
							Start
						</button>
						<button id="stop" onClick={this.stopExercise}>
							Stop
						</button>
					</div>
					<div className="rp-controlpanel">
						<div className="rp-panelsection">
							<div className="rp-controlitem">
								Tempo:{" "}
								<input
									type="text"
									onChange={this.tempoInputHandler}
									value={this.state.tempoInput}
									className="rp-inputBox"
								/>
							</div>
							<div className="rp-controlitem">
								{" "}
								Reps:{" "}
								<input
									type="text"
									onChange={this.repInputHandler}
									value={this.state.repInput}
									className="rp-inputBox"
								/>
							</div>
							<div className="rp-controlitem">Values:</div>
							<div className="rp-controlitem">
								{this.createValueSelectors()}
							</div>
						</div>
						<div
							style={{ marginLeft: "20px" }}
							className="rp-panelsection"
						>
							<div className="rp-controlitem">
								<div
									style={{
										fontWeight: "bold",
										paddingRight: "5px"
									}}
								>
									Mode:{" "}
								</div>
								<div>
									Bar
									<input
										type="radio"
										name="modeselect"
										value="bar"
										className="radiobutton"
										checked={this.state.mode === "bar"}
										onChange={e => {
											this.modeChangeHandler(e);
										}}
									/>
								</div>
								<div>
									Tuplet
									<input
										type="radio"
										name="modeselect"
										value="tuplet"
										className="radiobutton"
										checked={this.state.mode === "tuplet"}
										onChange={e => {
											this.modeChangeHandler(e);
										}}
									/>
								</div>
							</div>

							<div className="rp-controlitem">
								Click every subdivision:{" "}
								<input
									type="checkbox"
									onClick={event => {
										this.clickFrequencyChecker(event);
									}}
									defaultChecked={false}
									className="checkbox"
									id="clickFrequency"
								/>
							</div>

							<div className="rp-controlitem">
								Allow empty bars{" "}
								<input
									type="checkbox"
									onClick={event => {
										this.allowEmptyBarChecker(event);
									}}
									defaultChecked={false}
									className="checkbox"
									id="clickFrequency"
								/>
							</div>

							<div className="rp-controlitem">
								Play back answer{" "}
								<input
									type="checkbox"
									onClick={event => {
										this.playAnswerChecker(event);
									}}
									defaultChecked={false}
									className="checkbox"
									id="clickFrequency"
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "50px"
					}}
				>
					<div className="practiceMain">
						{this.state.started ? (
							<div className="rp-singlestaff">{singleStaff}</div>
						) : null}
						<div className="rp-bars">
							{this.state.displayedFigures.map((bar, i) => {
								return (
									<div className="rp-bar">
										{" "}
										<div className="rp-timesig">
											<div>
												{" "}
												{
													this.state
														.displayedTimeSignatures[
														i
													]
												}{" "}
											</div>
											<div style={{ marginTop: "-32px" }}>
												{this.state.mode === "bar" &&
												this.state.timeSignatures[i] ===
													8
													? timeSignatureCodes.four
													: null}
												{this.state.mode === "bar" &&
												this.state.timeSignatures[i] !==
													8
													? timeSignatureCodes.eight
													: null}
												{this.state.mode === "tuplet"
													? timeSignatureCodes.four
													: null}
											</div>
										</div>
										<div className="rp-barcontainer">
											<div className="rp-tupletbrackets">
												{this.state.displayedTuplets[i]}
											</div>
											{bar}{" "}
										</div>
										{i === 0 ? (
											<div className="rp-barline">
												{barlines.singleBarline}
											</div>
										) : null}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<Instructions />
			</div>
		);
	};
}

export default RhythmPractice;
