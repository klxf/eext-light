function Delta2RGB(wavelength) {
	const xyzIndex = wavelength - 380;
	let XYZ = tristimulus[xyzIndex].slice(1);
	let XYZMax = math.max(...XYZ);
	XYZ.forEach((value, index) => {
		XYZ[index] = value / XYZMax;
	});
	let RGB = math.multiply(Msrgb, XYZ);
	RGB = RGB.map((value) => {
		if (value <= 0.0031308) {
			return 12.92 * value;
		} else {
			return 1.055 * math.pow(value, 1 / 2.4) - 0.055;
		}
	});

	console.log(RGB);
	document.getElementById('rgb-block').style.background = `rgb(${RGB[0] * 255}, ${RGB[1] * 255}, ${RGB[2] * 255})`;
}

function SPD2RGB(wavelength, FWHM) {
	let sigma = FWHM / 2.355;
	let c = 1 / (sigma * math.sqrt(2 * math.pi));
	let x = math.range(380, 750, 1).toArray();
	let P = [];
	x.forEach((value) => {
		P.push(c * math.exp(-math.pow(value - wavelength, 2) / (2 * math.pow(sigma, 2))));
	});
	let T = [];
	tristimulus.forEach((value) => {
		T.push(value.slice(1));
	});
	let XYZ = [];
	T.forEach((value, index) => {
		XYZ.push(math.multiply(value, P[index]));
	});
	let XYZSum = math.sum(XYZ, 0);
	let XYZMax = math.max(...XYZSum);
	XYZSum.forEach((value, index) => {
		XYZSum[index] = value / XYZMax;
	});
	let RGB = math.multiply(Msrgb, XYZSum);
	RGB = RGB.map((value) => {
		if (value <= 0.0031308) {
			return 12.92 * value;
		} else {
			return 1.055 * math.pow(value, 1 / 2.4) - 0.055;
		}
	});
	document.getElementById('rgb-block').style.background = `rgb(${RGB[0] * 255}, ${RGB[1] * 255}, ${RGB[2] * 255})`;
}
