import styled from "styled-components/macro";

export const Button = styled.button`
  font-weight: 400;
  text-align: center;
  user-select: none;
  background-color: ${(props) => props.color || '#17a2b8'};
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  color: #fff;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &.active {
    background-color: ${(p) => p.theme.darkBlue};
  }
  &:hover {
    background-color: ${(props) => props.hcolor || '#138496'};
  }
`;
