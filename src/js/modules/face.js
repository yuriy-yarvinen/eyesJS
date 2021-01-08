const face = (userSettings = {}) => {
	let defaultSetting = {
		objectClass: {
			leftEye: 'leftEye',
			rightEye: 'rightEye',
			leftEyePupil: 'leftEyePupil',
			rightEyePupil: 'rightEyePupil',
			mouth: 'mouth',
			face: 'face',
			eyes: 'eyes',
		},
		css: {
			face: {
				'position': 'relative',
				'width': '230px',
				'border': '3px solid black',
				'border-radius': '100%',
				'z-index': '1',
				'height': '200px',
				'box-sizing': 'content-box'
			},
			eyes: {
				'width': '100%'
			},
			leftEye: {
				'width': '100px',
				'height': '100px',
				'border': '3px solid black',
				'border-radius': '100%',
				'float': 'left',
				'position': 'relative',
				'background': '#fff',
				'z-index': '100',
				'transform': 'rotate(0deg)',
				'margin-right': '9px',
				'box-sizing': 'content-box'
			},
			rightEye: {
				'width': '100px',
				'height': '100px',
				'border': '3px solid black',
				'border-radius': '100%',
				'float': 'left',
				'position': 'relative',
				'background': '#fff',
				'z-index': '100',
				'transform': 'rotate(0deg)',
				'margin-left': '9px',
				'box-sizing': 'content-box'
			},
			leftEyePupil: {
				'width': '30px',
				'height': '30px',
				'left': '35px',
				'border-radius': '100%',
				'background': 'black',
				'position': 'absolute',
				'top': '35px'
			},
			rightEyePupil: {
				'width': '30px',
				'height': '30px',
				'left': '35px',
				'border-radius': '100%',
				'background': 'black',
				'position': 'absolute',
				'top': '35px'
			},
			closeLeftEye: {
				'border-radius': '0',
				'margin-top': '15px',
				'width': '100%',
				'height': '5px',
				'left': '0',
				'background': '#000'
			},
			closeRightEye: {
				'border-radius': '0',
				'margin-top': '15px',
				'width': '100%',
				'height': '5px',
				'left': '0',
				'background': '#000'
			},
			mouth: {
				'width': '40px',
				'height': '25px',
				'border-radius': '70px 70px 70px 70px',
				'background': '#000',
				'margin-top': '10px',
				'margin-left': 'auto',
				'margin-right': 'auto'
			}
		}
	};

	function checkValue(value) {
		if (
			typeof (value) != "undefined" && value !== null
		) {
			return true;
		}
		else {
			return false;
		}
	}

	function getValueFromProportion(defaultValue1, defaultValue2, currentValue) {
		currentValue = currentValue.replace(/%|px|pt/, '');
		defaultValue1 = defaultValue1.replace(/%|px|pt/, '');
		defaultValue2 = defaultValue2.replace(/%|px|pt/, '');

		let proportion = Math.round((defaultValue1 / defaultValue2) * 1000) / 1000;
		let valueFromProportion = Math.round((currentValue * proportion) * 1000) / 1000;

		return valueFromProportion;
	}

	function returnNumber(value) {
		return value.replace(/%|px|pt/, '');
	}

	let metrik = 'px';

	// set css with proportions
	let checkWidth = Number(returnNumber(userSettings.css.face.width));
	if(checkWidth < 100){
		userSettings.css.face.width = '100px';
	}

	if(checkWidth > 500){
		userSettings.css.face.width = '500px';
	}

	let defaultWidth = userSettings.css.face.width || defaultSetting.css.face.width;

	defaultSetting.css.face.height = getValueFromProportion('200', '230', defaultWidth) + metrik;
	defaultSetting.css.leftEye.width = getValueFromProportion('100', '230', defaultWidth) + metrik;
	defaultSetting.css.leftEye.height = getValueFromProportion('100', '230', defaultWidth) + metrik;
	let leftEyeMarginRight = getValueFromProportion('9', '260', defaultWidth);
	defaultSetting.css.leftEye['margin-right'] = leftEyeMarginRight > 7 ? leftEyeMarginRight + metrik : '0px';
	defaultSetting.css.rightEye.width = getValueFromProportion('100', '230', defaultWidth) + metrik;
	defaultSetting.css.rightEye.height = getValueFromProportion('100', '230', defaultWidth) + metrik;
	let rightEyeMarginLeft = getValueFromProportion('9', '260', defaultWidth);
	defaultSetting.css.rightEye['margin-left'] = rightEyeMarginLeft > 5 ? rightEyeMarginLeft + metrik : '0px';
	defaultSetting.css.leftEyePupil.width = getValueFromProportion('30', '230', defaultWidth) + metrik;
	defaultSetting.css.leftEyePupil.height = getValueFromProportion('30', '230', defaultWidth) + metrik;
	defaultSetting.css.leftEyePupil.left = getValueFromProportion('35', '230', defaultWidth) + metrik;
	defaultSetting.css.leftEyePupil.top = getValueFromProportion('35', '230', defaultWidth) + metrik;
	defaultSetting.css.rightEyePupil.width = getValueFromProportion('30', '230', defaultWidth) + metrik;
	defaultSetting.css.rightEyePupil.height = getValueFromProportion('30', '230', defaultWidth) + metrik;
	defaultSetting.css.rightEyePupil.left = getValueFromProportion('35', '230', defaultWidth) + metrik;
	defaultSetting.css.rightEyePupil.top = getValueFromProportion('35', '230', defaultWidth) + metrik;
	defaultSetting.css.closeLeftEye['margin-top'] = getValueFromProportion('15', '30', defaultSetting.css.leftEyePupil.height) + metrik;
	defaultSetting.css.closeRightEye['margin-top'] = getValueFromProportion('15', '30', defaultSetting.css.rightEyePupil.height) + metrik;
	defaultSetting.css.mouth.width = getValueFromProportion('40', '230', defaultWidth) + metrik;
	defaultSetting.css.mouth.height = getValueFromProportion('25', '230', defaultWidth) + metrik;
	defaultSetting.css.mouth['margin-top'] = getValueFromProportion('10', '200', defaultSetting.css.face.height) + metrik;

	// rebuild settings
	if (Object.keys(userSettings).length != 0) {
		if (checkValue(userSettings.objectClass)) {
			if (Object.keys(userSettings.objectClass).length != 0) {
				for (let objectClassKey in userSettings.objectClass) {
					if (checkValue(defaultSetting.objectClass[objectClassKey])) {
						defaultSetting.objectClass[objectClassKey] = userSettings.objectClass[objectClassKey];
					}
				}
			}
		}
		if (checkValue(userSettings.css)) {
			if (Object.keys(userSettings.css).length != 0) {
				for (let cssKey in userSettings.css) {
					if (checkValue(defaultSetting.css[cssKey])) {
						if (Object.keys(userSettings.css[cssKey]).length != 0) {
							for (let key in userSettings.css[cssKey]) {
								defaultSetting.css[cssKey][key] = userSettings.css[cssKey][key];
							}
						}
					}
				}
			}
		}
	}

	const face = document.querySelector('.' + defaultSetting.objectClass.face);
	const leftEye = document.querySelector('.' + defaultSetting.objectClass.leftEye);
	const leftEyePupil = document.querySelector('.' + defaultSetting.objectClass.leftEyePupil);
	const rightEye = document.querySelector('.' + defaultSetting.objectClass.rightEye);
	const rightEyePupil = document.querySelector('.' + defaultSetting.objectClass.rightEyePupil);
	const mouth = document.querySelector('.' + defaultSetting.objectClass.mouth);

	function setStyle(settings) {
		let str = '';

		for (let className in settings) {
			str += '.' + className + '{\n';
			for (let cssName in settings[className]) {
				var cssCurname = cssName;

				str += cssCurname + ':' + settings[className][cssName] + ';\n';
			}
			str += '}\n';
		}

		return str;
	}

	// set styles
	if (!face.classList.contains('face-active')) {
		const head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

		var css = setStyle(defaultSetting.css);

		head.appendChild(style);

		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		face.classList.add('face-active');
	}
	
	var eyesPluginButton;
	if (checkValue(userSettings.objectClass.button)) {
		var eyesPluginButton = document.querySelector('.' + userSettings.objectClass.button);
	}
	else {
		var eyesPluginButton = mouth;
	}

	var leftEyeX = round(leftEye.getBoundingClientRect().left);
	var leftEyeY = round(leftEye.getBoundingClientRect().top);
	var rightEyeX = round(rightEye.getBoundingClientRect().left);
	var rightEyeY = round(rightEye.getBoundingClientRect().top);
	var mouthLeft = round(eyesPluginButton.getBoundingClientRect().left);
	var mouthTop = round(eyesPluginButton.getBoundingClientRect().top);
	var mouthRight = round(eyesPluginButton.getBoundingClientRect().right);
	var mouthBottom = round(eyesPluginButton.getBoundingClientRect().bottom);
	var mouthX = ((mouthRight - mouthLeft) / 2) + mouthLeft;
	var mouthY = ((mouthBottom - mouthTop) / 2) + mouthTop;

	function changeStyleLeft(elem, value) {
		elem.style.left = value + 'px';
	}

	function arc(x, y) {
		if (x < 0 && y < 0) {
			return (Math.PI + Math.atan(y / x)) * 57.2958;
		}
		if (x > 0 && y < 0) {
			return (3 * Math.PI / 2 + Math.abs(Math.atan(x / y))) * 57.2958;
		}
		if (x < 0 && y > 0) {
			return (Math.PI / 2 - Math.atan(x / y)) * 57.2958;
		}
		if (x > 0 && y > 0) {
			return (Math.PI / 2 - Math.atan(x / y)) * 57.2958;
		}
	}

	function clientCoordsX(e) {
		var x = e.changedTouches[0].pageX; // coordinate X 
		return x;
	}
	function clientCoordsY(e) {
		var y = e.changedTouches[0].pageY // coordinate Y 
		return y;
	}

	function round(v) {
		return (v >= 0 || -1) * Math.round(Math.abs(v));
	}

	function mouseCoordsX(e) {
		var x;
		// For IE
		if (document.all) {
			x = event.x + document.body.scrollLeft;
			// For others browsers
		} else {
			x = e.pageX; // mouse coordinate X
		}
		return x;
	}

	function mouseCoordsY(e) {
		var y;
		// For IE
		if (document.all) {
			y = event.y + document.body.scrollTop;
			// For others browsers
		} else {
			y = e.pageY; // mouse coordinate Y
		}
		return y;
	}

	function eyeMove(leftOrRight, eye, pupil, x, y, tg, value) {
		if (x > -value && x < value && y > -value && y < value) {
			eye.style.transform = 'rotate(0deg)';
			if (leftOrRight == 'left') {
				pupil.classList.add('closeLeftEye');
			}
			if (leftOrRight == 'right') {
				pupil.classList.add('closeRightEye');
			}

			changeStyleLeft(pupil, 0);
		}
		else {
			eye.style.transform = 'rotate(' + tg + 'deg)';
			if (leftOrRight == 'left') {
				pupil.classList.remove('closeLeftEye');
			}
			if (leftOrRight == 'right') {
				pupil.classList.remove('closeRightEye');
			}
		}
	}

	function mouthMove(mouth, x, y, value) {
		let cathetus1, cathetus2;
		cathetus1 = Math.abs(x);
		cathetus2 = Math.abs(y);
		let hypotenuse = Math.round(Math.sqrt(Math.pow(cathetus1, 2) + Math.pow(cathetus2, 2)));
		let border1, border2;
		border1 = Math.round(Math.sqrt(hypotenuse));
		border2 = 25;

		mouth.style.borderTopLeftRadius = border1 + 'px';
		mouth.style.borderTopRightRadius = border1 + 'px';
		mouth.style.borderBottomLeftRadius = border2 + 'px';
		mouth.style.borderBottomRightRadius = border2 + 'px';
	}

	// desctope

	document.onmousemove = (e) => {

		changeStyleLeft(leftEyePupil, returnNumber(defaultSetting.css.leftEyePupil.left) * 2);
		changeStyleLeft(rightEyePupil, returnNumber(defaultSetting.css.rightEyePupil.left) * 2);

		let mouseX = mouseCoordsX(e);
		let mouseY = mouseCoordsY(e);

		let eventLeftEyeX = mouseX - (leftEyeX + returnNumber(defaultSetting.css.leftEye.width) / 2);
		let eventLeftEyeY = mouseY - (leftEyeY + returnNumber(defaultSetting.css.leftEye.height) / 2);

		let eventRightEyeX = mouseX - (rightEyeX + returnNumber(defaultSetting.css.rightEye.width) / 2);
		let eventRightEyeY = mouseY - (rightEyeY + returnNumber(defaultSetting.css.rightEye.height) / 2);

		let leftEyeTg = arc(eventLeftEyeX, eventLeftEyeY);
		let rightEyeTg = arc(eventRightEyeX, eventRightEyeY);

		let eventMouthX = mouseX - mouthX;
		let eventMouthY = mouseY - mouthY;

		mouthMove(mouth, eventMouthX, eventMouthY, returnNumber(defaultSetting.css.mouth.width) / 2);
		eyeMove('left', leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, returnNumber(defaultSetting.css.leftEye.width) / 2);
		eyeMove('right', rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, returnNumber(defaultSetting.css.rightEye.width) / 2);

	};

	// mobile

	window.addEventListener('touchmove', (event) => {
		event.preventDefault();
		event.stopPropagation();

		changeStyleLeft(leftEyePupil, returnNumber(defaultSetting.css.leftEyePupil.left) * 2);
		changeStyleLeft(rightEyePupil, returnNumber(defaultSetting.css.rightEyePupil.left) * 2);

		let eventLeftEyeX = clientCoordsX(event) - (leftEyeX + returnNumber(defaultSetting.css.leftEye.width) / 2);
		let eventLeftEyeY = clientCoordsY(event) - (leftEyeY + returnNumber(defaultSetting.css.leftEye.height) / 2);

		let eventRightEyeX = clientCoordsX(event) - (rightEyeX + returnNumber(defaultSetting.css.rightEye.width) / 2);
		let eventRightEyeY = clientCoordsY(event) - (rightEyeY + returnNumber(defaultSetting.css.rightEye.height) / 2);

		let leftEyeTg = arc(eventLeftEyeX, eventLeftEyeY);
		let rightEyeTg = arc(eventRightEyeX, eventRightEyeY);

		let clientX = event.touches[0].clientX;
		let clientY = event.touches[0].clientY;

		let eventMouthX = clientX - mouthX;
		let eventMouthY = clientY - mouthY;

		eyeMove('left', leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, returnNumber(defaultSetting.css.leftEye.width) / 2);
		eyeMove('right', rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, returnNumber(defaultSetting.css.rightEye.width) / 2);

		mouthMove(mouth, eventMouthX, eventMouthY, returnNumber(defaultSetting.css.mouth.width) / 2);
	}, { passive: false });
};

export default face;