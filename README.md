# eyesJS
Animated face javascript

# Usage


### Put code in youre page

```html
	<!-- Html block with classes  -->
	<div class="face face-block">
		<div class="eyes">
			<div class="leftEye">
				<div class="leftEyePupil"></div>
			</div>
			<div class="rightEye">
				<div class="rightEyePupil"></div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="mouth">
		</div>
	</div>

	<!-- Block mouth interacts with -->

	<div class="submit-button-block">
		<button class="submit-button face-button">Submit</button>
	</div>

	<script>
		var faceConfig = {
			/// set blocks classes
			objectClass: {
				face: 'face',
				eyes: 'eyes',
				leftEye: 'leftEye',
				rightEye: 'rightEye',
				leftEyePupil: 'leftEyePupil',
				rightEyePupil: 'rightEyePupil',
				mouth: 'mouth',
				button: 'face-button',
			},
			/// css style customising
			css: {
				face: {
					width: '350px',
				}
			}
		};
	</script>
<!-- js file, may place in head block, if needed on all pages -->
<script src="eyes.min.js"></script></body>
```

### All setings


```json
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
			'height': '200px'
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
			'margin-right': '9px'
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
			'margin-left': '9px'
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
			'left': '0'
		},
		closeRightEye: {
			'border-radius': '0',
			'margin-top': '15px',
			'width': '100%',
			'height': '5px',
			'left': '0'
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
```

It not not quite all settings. You can add your css setings, in quotes '' 

Like so
```json
	mouth: {
		'opacity':0,
		'background': '#000',
	}
```