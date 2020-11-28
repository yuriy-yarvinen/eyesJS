// Made by Yuriy Yarvinen
const leftEye = document.querySelector('.leftEye');
const rightEye = document.querySelector('.rightEye');
const leftEyePupil = document.querySelector('.leftEyePupil');
const rightEyePupil = document.querySelector('.rightEyePupil');
const mouth = document.querySelector('.mouth');
const windowWidth = window.screen.width;
const windowHeight = window.screen.height;

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

	mouth.style.borderRadius = border1 + 'px ' + border1 + 'px ' + border2 + 'px ' + border2 + 'px';

	if (x > -value && x < value && y > -value && y < value) {

		mouth.classList.add('closeMouth');

	}
	else {

		mouth.classList.remove('closeMouth');
	}

}

// desctope

document.onmousemove = function changePosition(e) {

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
	let eventMouthX = clientX - mouthX;
	let eventMouthY = clientY - mouthY;
	eyeMove(leftEye, leftEyePupil, eventLeftEyeX, eventLeftEyeY, leftEyeTg, 40);
	eyeMove(rightEye, rightEyePupil, eventRightEyeX, eventRightEyeY, rightEyeTg, 40);

	mouthMove(mouth, eventMouthX, eventMouthY, 30);

}, { passive: false });