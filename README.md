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

### All settings


```
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
			'border': '3px solid black',
		},
		leftEye: {
			'border': '3px solid black',
			'background': '#fff',
		},
		rightEye: {
			'border': '3px solid black',
			'background': '#fff',
		},
		leftEyePupil: {
			'background': 'black',
		},
		rightEyePupil: {
			'background': 'black',
		},
		closeLeftEye: {
			'background': '#000',
		},
		closeRightEye: {
			'background': '#000',
		},
		mouth: {
			'background': '#000',
		}
	}
```

It not quite all settings. You can add your css settings, in quotes '' 

Like so
```
	mouth: {
		'opacity':0.5,
		'background': '#000',
	}
```