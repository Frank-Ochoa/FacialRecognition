import React from 'react'

// Not going to have any state, so it can be a pure function
const Rank = ({userName, entries}) =>
{
	return (
		<div>
			<div className={'white f3'}>
				{`${userName} your current entry count is...`}
			</div>
			<div className={'white f1'}>
				{`#${entries}`}
			</div>
		</div>
	)
}

export default Rank;