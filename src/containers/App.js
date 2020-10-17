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
	apiKey: '4771c32298c94ebca67a964b973b3296'
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

const initialState = {
	imageURL: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''

	}
}

class App extends Component
{
	constructor(props)
	{
		super(props);
		this.state = initialState;
	}

	loadUser = (user) =>
	{
		console.log(user);
		this.setState(Object.assign(this.state.user, {
			id: user.id,
			name: user.name,
			email: user.email,
			entries: user.entries,
			joined: user.joined
		}))
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

		fetch('https://lit-lowlands-59154.herokuapp.com/imageurl', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({input: inputField})
		})
			.then(response => response.json())
			.then(response =>
			{
				if (response)
				{
					fetch('https://lit-lowlands-59154.herokuapp.com/image', {
						method: 'PUT',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({id: this.state.user.id})
					})
						.then(resp => resp.json())
						.then(userEntries => this.setState(Object.assign(this.state.user, {entries: userEntries})))
						.catch(console.log)
				}

				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err));
	}

	onRouteChange = (route) =>
	{
		if (route === 'signout')
		{
			this.setState(initialState);
			return;
		} else if (route === 'home')
		{
			this.setState({isSignedIn: true});
		}

		this.setState({route: route});
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
						<Rank userName={this.state.user.name} entries={this.state.user.entries}/>
						<ImageLinkForm onInputChange={onInputChange} onButtonSubmit={this.onButtonSubmit}/>
						<FaceRecognition box={box} imageURL={imageURL}/>
					</div>
					:
					(
						route === 'signin' ?
							<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
							:
							<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					)

				}
			</div>
		)
	};
}

// Subscribe to any state changes in the redux store, we now call this a "smart component"
// Now we have to tell it what state and actions to listen to, so we need to define these parameters
export default connect(mapStateToProps, mapDispatchToProps)(App);
