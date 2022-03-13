import { timeSignatureCodes } from "../UnicodeAssignment";


let getTimeSig = (e, sig, i, mode) => {
	// in bar mode, 8 eight note is actually 4/4

	if (mode === "bar" && e === 8) {
		e = 4;
	}
	switch (e) {
		case 1:
			sig[i] = timeSignatureCodes.one;
			break;
		case 2:
			sig[i] = timeSignatureCodes.two;
			break;
		case 3:
			sig[i] = timeSignatureCodes.three;
			break;
		case 4:
			sig[i] = timeSignatureCodes.four;
			break;
		case 5:
			sig[i] = timeSignatureCodes.five;
			break;
		case 6:
			sig[i] = timeSignatureCodes.six;
			break;
		case 7:
			sig[i] = timeSignatureCodes.seven;
			break;
		case 8:
			sig[i] = timeSignatureCodes.eight;
			break;
		default:
			return;
	}
};

export default getTimeSig;
