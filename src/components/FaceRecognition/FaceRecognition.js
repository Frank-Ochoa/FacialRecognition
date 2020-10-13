import React from 'react'
import './FaceRecognition.css'

// Not going to have any state, so it can be a pure function
// Height gets auto adjusted basde on the width
const FaceRecognition = ({imageURL, box}) => {
	return (
		<div className={'center ma'}>
			<div className={'absolute mt2'}>
				<img id='inputImage' alt='' src={imageURL} width={'500px'} height={'auto'}/>
				<div className={'bounding-box'} style={{
	top: box.topRow,
	right: box.rightCol,
	bottom: box.bottomRow,
	left: box.leftCol
}}/>
			</div>
		</div>
	)
}

export default FaceRecognition;