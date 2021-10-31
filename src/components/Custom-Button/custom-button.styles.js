import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: white;
  color: black;
  border: 2px solid black;
  margin: 1rem;
  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
  }
`;


export const CustomButtonContainer = styled.button`
  min-width: 140px;
  width: auto;
  height: 40px;
  letter-spacing: 0.5px;
  line-height: 40px;
  padding: 0 30px 0 30px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  ${buttonStyles}
`;
