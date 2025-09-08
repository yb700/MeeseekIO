import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS_PAGES = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        pages
      }
    }
  }
`;

export const GET_ALL_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info{
          next
        }
        results{
          id
          name
          status
          species
          gender
          origin { name, dimension }
          image
          location { name , dimension}
          episode {
            name
          }
      }
    }
  }
`;

export const GET_CHARACTER_BY_NAME = gql`
query GetCharacter($name: String){
  characters(filter: {name: $name}) {
    results{
      name
      id
      name
      status
      species
      gender
      origin { name }
      image
    }
  }
}
`