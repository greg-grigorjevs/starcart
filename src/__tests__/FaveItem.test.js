import {screen, render} from '@testing-library/react'
import FaveItem from '../components/Faves/FaveItem'
import { removeFave, rateFave } from '../features/faves'


test('it renders FaveItem', () => {
  const fave = {id: 1, name: 'A New Hope', rating: 5}
  render(<FaveItem fave={fave} handleRemove={()=>{}} handleRating={()=>{}}/>)
  const faveItem = screen.getByTestId(`faveitem-${fave.id}`)
  
  expect(faveItem).toBeInTheDocument()
  expect(faveItem).toHaveTextContent(fave.name)
  expect(faveItem).toContainHTML('<img')
})
