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