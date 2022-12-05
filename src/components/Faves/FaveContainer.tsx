import { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { RatingProps } from 'semantic-ui-react'
import { removeFave, rateFave } from '../../features/faves'
import FaveItem from './FaveItem'
import { FaveItemObj } from './types'

const FaveContainer = ({ fave }:{fave:FaveItemObj}) => {
	const dispatch = useDispatch()
	const handleRating = (_e:SyntheticEvent, data:RatingProps) => {
    dispatch(rateFave({id: fave.id, rating: data.rating}))
	}
	const handleRemove = () => {
		dispatch(removeFave(fave.id))
	}

	return <FaveItem fave={fave} handleRating={handleRating} handleRemove={handleRemove} />
}
export default FaveContainer
