import styled from "styled-components";

export const StyledStage = styled.div`
  width: 100%;
  min-width: 350px;
  display: grid;
  /* grid-template-rows: repeat(
    ${props => props.height}, minmax(25px, 
    calc(25vw / ${props => props.width})
  )); */
  grid-template-rows: repeat(
    ${props => props.height}, 1fr);
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid ${props => props.whiteBorder ? "#bbb" : "#333"};
  /* background-color: rgb(22, 22, 22); */
  filter: brightness(${props => props.gameOver ? 50 : 100}%);
`;
