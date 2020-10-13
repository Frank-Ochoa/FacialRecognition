import React, {Component} from 'react';
import {connect} from 'react-redux'
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkFrom/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import './App.css';

import {setInputField} from "../components/ImageLinkFrom/actions";

const app = new Clarifai.App({
	apiKey: '09f34723a8284203a0b4f225c3b59054'
})

const mapStateToProps = state => ({
	// The state that we are subscribing to in the reducer
	inputField: state.searchImage.inputField,
})


// Dispatch is what triggers the action, gets dispatched to the reducer
const mapDispatchToProps = dispatch => ({
	onInputChange: (event) => dispatch(setInputField(event.target.value
	)),
})

const particlesOptions = {
	particles: {
		number: {
			value: 90,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			imageURL: '',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	// Want to call this function based on the inputs we get from Clarifai
	calculateFaceLocation = (data) =>
	{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) =>
	{
		this.setState({box: box})
	}


	onButtonSubmit = () =>
	{
		const {inputField} = this.props
		this.setState({imageURL: inputField})

		app.models.predict(Clarifai.FACE_DETECT_MODEL, inputField)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	onRouteChange = (route) =>
	{
		if(route === 'signout')
		{
			this.setState({isSignedIn: false})
		}
		else if (route === 'home')
		{
			this.setState({isSignedIn: true})
		}

		this.setState({route: route})
	}

	render()
	{
		const {isSignedIn, imageURL, route, box} = this.state
		const {onInputChange} = this.props;

		return (
			<div className="App">
				<Particles className={'particles'}
				           params={particlesOptions}/>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
				{route === 'home' ?
					<div>
						<Logo/>
						<Rank/>
						<ImageLinkForm onInputChange={onInputChange} onButtonSubmit={this.onButtonSubmit}/>
						<FaceRecognition box={box} imageURL={imageURL}/>
					</div>
					:
					(
						route === 'signin' ?
							<SignIn onRouteChange={this.onRouteChange}/>
							:
							<Register onRouteChange={this.onRouteChange}/>
					)
				}
			</div>
		)
	};
}

// Subscribe to any state changes in the redux store, we now call this a "smart component"
// Now we have to tell it what state and actions to listen to, so we need to define these parameters
export default connect(mapStateToProps, mapDispatchToProps)(App);
