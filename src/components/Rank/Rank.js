import React from 'react'

// Not going to have any state, so it can be a pure function
const Rank = () =>
{
	return (
		<div>
			<div className={'white f3'}>
				{'Frank, your current rank is...'}
			</div>
			<div className={'white f1'}>
				{'#5'}
			</div>
		</div>
	)
}

export default Rank;