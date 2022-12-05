import { Button, Card, Loader, Message, Pagination } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import { useState } from 'react'

const Characters = () => {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useGetCharactersQuery(page)
  const dispatch = useDispatch()

  const selectCharacter = e => {
    const { title } = e.currentTarget.dataset
    const character = data.results.find(character => character.name === title)
    return character
  }
  const addToFavourites = e => dispatch(addFave(selectCharacter(e)))

  const handlePaginationChange = (e, { activePage }) => setPage(activePage);

  if (isLoading) {
    return <Loader active={isLoading} />
  }
  if (isError) {
    return <Message error={isError}>There was an error</Message>
  }
  if (data && Boolean(data?.results?.length)) {
    return (
      <Card.Group centered>
        {data.results.map(character => (
          <Card key={nanoid()}>
            <Card.Content>
              <Card.Header>{character.name}</Card.Header>
              <Card.Description>
                {`Gender : ${character.gender}`}
                <br />
                {`Born : ${character.birth_year}`}
                <br />
                {`Eye color : ${character.eye_color}`}
                <br />
                {`Height : ${character.height}`}
                <br />
                {`Mass : ${character.mass}`}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                icon={{ name: 'plus', size: 'small' }}
                data-title={character.name}
                positive
                content="Add to faves"
                onClick={addToFavourites}
              />
            </Card.Content>
          </Card>
        ))}
        <Pagination activePage={page} totalPages={Math.ceil(data.count / 10)} /> 
      </Card.Group>
    )
  } else if (data?.results?.length === 0) {
    return <Message warning>no characters found</Message>
  }
  return null
}
export default Characters
