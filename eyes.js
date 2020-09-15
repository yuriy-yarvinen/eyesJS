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

function changeStyleLeft(elem,value){
elem.style.left = value+'px';
}

function round(v) {
	return (v >= 0 || -1) * Math.round(Math.abs(v));
}	
var leftEyeX = 	round(leftEye.getBoundingClientRect().left);
var leftEyeY = 	round(leftEye.getBoundingClientRect().top);
var rightEyeX = round(rightEye.getBoundingClientRect().left);
var rightEyeY = round(rightEye.getBoundingClientRect().top);
var mouthLeft = round(mouth.getBoundingClientRect().left);
var mouthTop = round(mouth.getBoundingClientRect().top);
var mouthRight = round(mouth.getBoundingClientRect().right);
var mouthBottom = round(mouth.getBoundingClientRect().bottom);

document.onmousemove = function changePosition(e){
	
	changeStyleLeft(leftEyePupil,70);
	changeStyleLeft(rightEyePupil,70);
	var eventLeftEyeX = mouseCoordsX(e)-(leftEyeX + 50);
	var eventLeftEyeY = mouseCoordsY(e)-(leftEyeY + 50);
	var eventRightEyeX = mouseCoordsX(e)-(rightEyeX + 50);
	var eventRightEyeY = mouseCoordsY(e)-(rightEyeY + 50);
	var mouseX = mouseCoordsX(e);
	var mouseY = mouseCoordsY(e);
	let leftEyeTg = arc(eventLeftEyeX,eventLeftEyeY);
	let rightEyeTg = arc(eventRightEyeX,eventRightEyeY);
	console.log(mouthLeft);
	console.log(mouthTop);
	console.log(mouthRight);
	console.log(mouthBottom);
	console.log(mouseX);
	console.log(mouseY);
	if(mouseX >= mouthLeft && mouseX <= mouthRight &&  mouseY >= mouthTop && mouseY <= mouthBottom){
		mouth.style.height = '2px';
	}
	else{
		mouth.style.height = '20px';
	}

	var katet1 = mouseX-mouthLeft-150;
	var katet2 = mouseY-mouthBottom-150;
	var gipo = katet1*katet1 + katet2*katet2;
	var gipo = Math.sqrt(gipo);

	if((mouseX <= mouthLeft-150 || mouseX >= mouthRight+150) || (mouseY >= mouthBottom+150)){
		// if((mouseX <= mouthLeft-150 || mouseX >= mouthRight+150) && (mouseY >= mouthTop-100 || mouseY <= mouthBottom+100)){
		// 	if(mouseX <= mouthLeft-150){
		// 		var step = mouseX/((mouthLeft-150)/70);
		// 		mouth.style.borderRadius = (70-step)+'px '+(70-step)+'px '+step+'px '+step+'px';
		// 	}
		// 	if(mouseX >= mouthRight+150){
		// 		var step = (windowWidth - mouseX)/((windowWidth - (mouthRight+150))/70);
		// 		mouth.style.borderRadius = (70-step)+'px '+(70-step)+'px '+step+'px '+step+'px';
		// 	}			
		// }
		// if((mouseY >= mouthBottom+100) && (mouseX > mouthLeft-150 && mouseX < mouthRight+150)){
		// 	if(mouseY >= mouthBottom+100){
		// 		var step = (windowHeight - mouseY)/((windowHeight - (mouthBottom+100))/70);
		// 		mouth.style.borderRadius = (70-step)+'px '+(70-step)+'px '+step+'px '+step+'px';
		// 	}	
		// }
		
		var step = gipo/70;
		mouth.style.borderRadius = (70-step)+'px '+(70-step)+'px '+step+'px '+step+'px';
		mouth.style.width = '40px';
	}
	else{
		if((mouseX > mouthLeft-100 || mouseX < mouthRight+100) || (mouseY < mouthBottom+100)){
			mouth.style.borderRadius = '70px 70px 70px 70px';
			mouth.style.width = '40px';
		}
		if((mouseX > mouthLeft-150 || mouseX < mouthRight+150) || (mouseY < mouthBottom+100)){
			mouth.style.borderRadius = '0px 0px 70px 70px';
		}
	}

	if(eventLeftEyeX > -40 && eventLeftEyeX < 40 && eventLeftEyeY > -40 && eventLeftEyeY < 40){
		leftEye.style.transform = 'rotate(0deg)';
		leftEyePupil.classList.add('closeEye');
		changeStyleLeft(leftEyePupil,0);
		
	}
	else{
		leftEye.style.transform = 'rotate('+leftEyeTg+'deg)';	
		leftEyePupil.classList.remove('closeEye');
	}
	if(eventRightEyeX > -40 && eventRightEyeX < 40 && eventRightEyeY > -40 && eventRightEyeY < 40){
		rightEye.style.transform = 'rotate(0deg)';
		rightEyePupil.classList.add('closeEye');
		changeStyleLeft(rightEyePupil,0);
	}
	else{
		rightEye.style.transform = 'rotate('+rightEyeTg+'deg)';
		rightEyePupil.classList.remove('closeEye');
	}
	function mouseCoordsX(e) {
		// Для браузера IE
		if (document.all)  { 
			var	x = event.x + document.body.scrollLeft; 
		// Для остальных браузеров
		} else {
			var	x = e.pageX; // Координата X курсора
		}
		return x;
	 }
	 function mouseCoordsY(e) {
		// Для браузера IE
		if (document.all)  { 
			var	y = event.y + document.body.scrollTop; 
		// Для остальных браузеров
		} else {
			var	y = e.pageY; // Координата Y курсора
		}
		return y;
	 }
	 function arc(x,y){
		if (x < 0 && y < 0) {
			return (Math.PI + Math.atan(y/x)) * 57.2958;
		}
		if (x > 0 && y < 0) {
			return (3*Math.PI/2 + Math.abs(Math.atan(x/y))) * 57.2958;
		}
		if (x < 0 && y > 0) {
			return (Math.PI/2 - Math.atan(x/y)) * 57.2958;
		}
		if (x > 0 && y > 0) {
			return (Math.PI/2 - Math.atan(x/y)) * 57.2958;
		}
		
	}
};

window.addEventListener('touchmove', function(event) {
	event.preventDefault();
	event.stopPropagation();
	changeStyleLeft(leftEyePupil,70);
	changeStyleLeft(rightEyePupil,70);
		var eventLeftEyeX = mouseCoordsX(event)-(leftEyeX + 50);
		var eventLeftEyeY = mouseCoordsY(event)-(leftEyeY + 50);
		var eventRightEyeX = mouseCoordsX(event)-(rightEyeX + 50);
		var eventRightEyeY = mouseCoordsY(event)-(rightEyeY + 50);
		let leftEyeTg = arc(eventLeftEyeX,eventLeftEyeY);
		let rightEyeTg = arc(eventRightEyeX,eventRightEyeY);
	
		if(eventLeftEyeX > -40 && eventLeftEyeX < 40 && eventLeftEyeY > -40 && eventLeftEyeY < 40){
			leftEye.style.transform = 'rotate(0deg)';
			leftEyePupil.classList.add('closeEye');
			changeStyleLeft(leftEyePupil,0);			
		}
		else{
			leftEye.style.transform = 'rotate('+leftEyeTg+'deg)';	
			leftEyePupil.classList.remove('closeEye');
		}
		if(eventRightEyeX > -40 && eventRightEyeX < 40 && eventRightEyeY > -40 && eventRightEyeY < 40){
			rightEye.style.transform = 'rotate(0deg)';
			rightEyePupil.classList.add('closeEye');
			changeStyleLeft(rightEyePupil,0);
		}
		else{
			rightEye.style.transform = 'rotate('+rightEyeTg+'deg)';
			rightEyePupil.classList.remove('closeEye');
		}
	
	function arc(x,y){
		if (x < 0 && y < 0) {
			return (Math.PI + Math.atan(y/x)) * 57.2958;
		}
		if (x > 0 && y < 0) {
			return (3*Math.PI/2 + Math.abs(Math.atan(x/y))) * 57.2958;
		}
		if (x < 0 && y > 0) {
			return (Math.PI/2 - Math.atan(x/y)) * 57.2958;
		}
		if (x > 0 && y > 0) {
			return (Math.PI/2 - Math.atan(x/y)) * 57.2958;
		}
		
	}
	
	function mouseCoordsX(e) {
			var	x = e.changedTouches[0].pageX; // Координата X 
		return x;
	 }
	 function mouseCoordsY(e) {
			var	y = e.changedTouches[0].pageY // Координата Y 
		return y;
	 }
	}, { passive: false });

