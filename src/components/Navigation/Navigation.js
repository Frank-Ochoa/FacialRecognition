import React from 'react'

// Not going to have any state, so it can be a pure function
// Without the () => onRouteChange, if we just had onRouteChange('signin') it would run that function when rendered and not when clicked
const Navigation = ({onRouteChange, isSignedIn}) =>
{
	return (
		isSignedIn ?
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav> :
			(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign
					In</p>
				<p onClick={() => onRouteChange('register')}
				   className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
			)
	)
}

export default Navigation;