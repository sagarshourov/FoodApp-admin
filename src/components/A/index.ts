import styled from 'styled-components/macro';

export const A = styled.a`
  color: ${p => p.theme.text};
  text-decoration: none;
  width: 100%;
  display: block;
  padding: 1em 3em 1em;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:active {
    opacity: 0.4;
  }
`;
