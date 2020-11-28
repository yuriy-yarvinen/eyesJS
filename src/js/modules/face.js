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
				position: 'relative',
				margin: '0 auto',
				width: '230px',
				border: '3px solid black',
				borderRadius: '100%',
				height: '200px',
				zIndex: '1'
			},
			eyes: {
				width: '100%'
			},
			leftEye: {
				width: '100px',
				height: '100px',
				border: '3px solid black',
				borderRadius: '100%',
				float: 'left',
				position: 'relative',
				background: '#fff',
				zIndex: '100',
				transform: 'rotate(0deg)',
				marginRight: '9px'
			},
			rightEye: {
				width: '100px',
				height: '100px',
				border: '3px solid black',
				borderRadius: '100%',
				float: 'left',
				position: 'relative',
				background: '#fff',
				zIndex: '100',
				transform: 'rotate(0deg)',
				marginLeft: '9px'
			},
			leftEyePupil: {
				width: '30px',
				height: '30px',
				left: '35px',
				borderRadius: '100%',
				background: 'black',
				position: 'absolute',
				top: '35px'
			},
			rightEyePupil: {
				width: '30px',
				height: '30px',
				left: '35px',
				borderRadius: '100%',
				background: 'black',
				position: 'absolute',
				top: '35px'
			},
			closeEye: {
				borderRadius: '0',
				margin: '15px 0 0 0px',
				width: '100%',
				height: '5px',
				left: '0'
			},
			mouth: {
				width: '40px',
				height: '25px',
				borderRadius: '70px 70px 70px 70px',
				background: '#000',
				margin: '10px auto 0'
			},
			closeMouth: {
				width: '40px',
				height: '2px',
				borderRadius: '70px 70px 70px 70px',
				background: '#000',
				margin: '10px auto 0'
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
								if (checkValue(defaultSetting.css[cssKey][key])) {
									defaultSetting.css[cssKey][key] = userSettings.css[cssKey][key];
								}
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
				if (cssName == 'borderRadius') {
					cssCurname = 'border-radius';
				}
				if (cssName == 'zIndex') {
					cssCurname = 'z-index';
				}
				if (cssName == 'marginRight') {
					cssCurname = 'margin-right';
				}
				if (cssName == 'marginLeft') {
					cssCurname = 'margin-left';
				}

				str += cssCurname + ':' + settings[className][cssName] + ';\n';
			}
			str += '}\n';
		}

		return str;
	}



	if (!face.classList.contains('face-active')) {
		const head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');

		var css = setStyle(defaultSetting.css);

		head.appendChild(style);

		style.type = 'text/css';

		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		face.classList.add('face-active');
	}

	var leftEyeX = round(leftEye.getBoundingClientRect().left);
	var leftEyeY = round(leftEye.getBoundingClientRect().top);
	var rightEyeX = round(rightEye.getBoundingClientRect().left);
	var rightEyeY = round(rightEye.getBoundingClientRect().top);
	var mouthLeft = round(mouth.getBoundingClientRect().left);
	var mouthTop = round(mouth.getBoundingClientRect().top);
	var mouthRight = round(mouth.getBoundingClientRect().right);
	var mouthBottom = round(mouth.getBoundingClientRect().bottom);
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
		// For IE
		if (document.all) {
			var x = event.x + document.body.scrollLeft;
			// For others browsers
		} else {
			var x = e.pageX; // mouse coordinate X
		}
		return x;
	}
	function mouseCoordsY(e) {
		// For IE
		if (document.all) {
			var y = event.y + document.body.scrollTop;
			// For others browsers
		} else {
			var y = e.pageY; // mouse coordinate Y
		}
		return y;
	}

	function eyeMove(eye, pupil, x, y, tg, value) {
		if (x > -value && x < value && y > -value && y < value) {
			eye.style.transform = 'rotate(0deg)';
			pupil.classList.add('closeEye');
			changeStyleLeft(pupil, 0);

		}
		else {
			eye.style.transform = 'rotate(' + tg + 'deg)';
			pupil.classList.remove('closeEye');
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

		if (x > -value && x < value && y > -value && y < value) {

			mouth.classList.add('closeMouth');

		}
		else {

			mouth.classList.remove('closeMouth');
		}

	}

	// desctope

	document.onmousemove = (e) => {

		changeStyleLeft(leftEyePupil, 70);
		changeStyleLeft(rightEyePupil, 70);
		let mouseX = mouseCoordsX(e);
		let mouseY = mouseCoordsY(e);

		let eventLeftEyeX = mouseX - (leftEyeX + 50);
		let eventLeftEyeY = mouseY - (leftEyeY + 50);

		let eventRightEyeX = mouseX - (rightEyeX + 50);
		let eventRightEyeY = mouseY - (rightEyeY + 50);

		let leftEyeTg = arc(eventLeftEyeX, eventLeftEyeY);
		let rightEyeTg = arc(eventRightEyeX, eventRightEyeY);

		let eventMouthX = mouseX - mouthX;
		let eventMouthY = mouseY - mouthY;

		mouthMove(mouth, eventMouthX, eventMouthY, 20);
		eyeMove(leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, 40);
		eyeMove(rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, 40);

	};

	// mobile

	window.addEventListener('touchmove', (event) => {
		event.preventDefault();
		event.stopPropagation();
		changeStyleLeft(leftEyePupil, 70);
		changeStyleLeft(rightEyePupil, 70);
		let eventLeftEyeX = clientCoordsX(event) - (leftEyeX + 50);
		let eventLeftEyeY = clientCoordsY(event) - (leftEyeY + 50);
		let eventRightEyeX = clientCoordsX(event) - (rightEyeX + 50);
		let eventRightEyeY = clientCoordsY(event) - (rightEyeY + 50);
		let leftEyeTg = arc(eventLeftEyeX, eventLeftEyeY);
		let rightEyeTg = arc(eventRightEyeX, eventRightEyeY);
		let clientX = event.touches[0].clientX;
		let clientY = event.touches[0].clientY;
		let eventMouthX = clientX - mouthX;
		let eventMouthY = clientY - mouthY;
		eyeMove(leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, 40);
		eyeMove(rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, 40);

		mouthMove(mouth, eventMouthX, eventMouthY, 30);

	}, { passive: false });
};

export default face;