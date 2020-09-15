// Made by Yuriy Yarvinen
const leftEye = document.querySelector('.leftEye');
const rightEye = document.querySelector('.rightEye');
const leftEyePupil = document.querySelector('.leftEyePupil');
const rightEyePupil = document.querySelector('.rightEyePupil');
const mouth = document.querySelector('.mouth');
const windowWidth = window.screen.width;
const windowHeight = window.screen.height;
leftEyePupil.style.left = '35px';
rightEyePupil.style.left = '35px';

var leftEyeX = round(leftEye.getBoundingClientRect().left);
var leftEyeY = round(leftEye.getBoundingClientRect().top);
var rightEyeX = round(rightEye.getBoundingClientRect().left);
var rightEyeY = round(rightEye.getBoundingClientRect().top);
var mouthLeft = round(mouth.getBoundingClientRect().left);
var mouthTop = round(mouth.getBoundingClientRect().top);
var mouthRight = round(mouth.getBoundingClientRect().right);
var mouthBottom = round(mouth.getBoundingClientRect().bottom);

function changeStyleLeft(elem, value) {
	elem.style.left = value + 'px';
}

function closeMouth(mouth, x, y, left, right, top, bottom) {
	if (x >= left && x <= right && y >= top && y <= bottom) {
		mouth.style.height = '2px';
	}
	else {
		mouth.style.height = '20px';
	}
}

function mouthBorderChange(mouth, x, y, left, right, top, bottom) {
	if ((x <= left - 150 || x >= right + 150) || (y >= bottom + 150)) {
		if ((x <= left - 150 || x >= right + 150) && (y >= top - 100 || y <= bottom + 100)) {
			if (x <= left - 150) {
				var step = x / ((left - 150) / 70);
				mouth.style.borderRadius = (70 - step) + 'px ' + (70 - step) + 'px ' + step + 'px ' + step + 'px';
			}
			if (x >= right + 150) {
				var step = (windowWidth - x) / ((windowWidth - (right + 150)) / 70);
				mouth.style.borderRadius = (70 - step) + 'px ' + (70 - step) + 'px ' + step + 'px ' + step + 'px';
			}
		}
		if ((y >= bottom + 100) && (x > left - 150 && x < right + 150)) {
			if (y >= bottom + 100) {
				var step = (windowHeight - y) / ((windowHeight - (bottom + 100)) / 70);
				mouth.style.borderRadius = (70 - step) + 'px ' + (70 - step) + 'px ' + step + 'px ' + step + 'px';
			}
		}

	}
	else {
		if ((x > left - 100 || x < right + 100) || (y < bottom + 100)) {
			mouth.style.borderRadius = '70px 70px 70px 70px';
			mouth.style.width = '40px';
		}
		if ((x > left - 150 || x < right + 150) || (y < bottom + 100)) {
			mouth.style.borderRadius = '0px 0px 70px 70px';
		}
	}
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

// desctope

document.onmousemove = function changePosition(e) {

	changeStyleLeft(leftEyePupil, 70);
	changeStyleLeft(rightEyePupil, 70);
	let eventLeftEyeX = mouseCoordsX(e) - (leftEyeX + 50);
	let eventLeftEyeY = mouseCoordsY(e) - (leftEyeY + 50);
	let eventRightEyeX = mouseCoordsX(e) - (rightEyeX + 50);
	let eventRightEyeY = mouseCoordsY(e) - (rightEyeY + 50);
	let mouseX = mouseCoordsX(e);
	let mouseY = mouseCoordsY(e);
	let leftEyeTg = arc(eventLeftEyeX, eventLeftEyeY);
	let rightEyeTg = arc(eventRightEyeX, eventRightEyeY);

	closeMouth(mouth, mouseX, mouseY, mouthLeft, mouthRight, mouthTop, mouthBottom);
	mouthBorderChange(mouth, mouseX, mouseY, mouthLeft, mouthRight, mouthTop, mouthBottom);
	eyeMove(leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, 40);
	eyeMove(rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, 40);

};

// mobile

window.addEventListener('touchmove', function (event) {
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

	eyeMove(leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, 40);
	eyeMove(rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, 40);

	closeMouth(mouth, clientX, clientY, mouthLeft, mouthRight, mouthTop, mouthBottom);
	mouthBorderChange(mouth, clientX, clientY, mouthLeft, mouthRight, mouthTop, mouthBottom);

}, { passive: false });

