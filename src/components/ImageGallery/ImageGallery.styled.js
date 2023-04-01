import styled from 'styled-components';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);

  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: 16px;
  margin: 0;
  padding: 16px;
  list-style: none;
`;
