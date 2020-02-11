import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(85vh / ${props => props.height})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 500px;
  background-color: rgb(22, 22, 22);
  filter: brightness(${props => props.gameOver ? 50 : 100}%);
`;
