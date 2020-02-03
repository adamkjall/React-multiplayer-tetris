import styled from "styled-components";

export const StyledDisplay = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.25rem 0;
  padding: 1.25rem;
  min-height: 2rem;
  width: 100%;
  border: 4px solid #333;
  border-radius: 1.25rem;
  color: ${props => props.gameOver ? 'red' : '#999'};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`