import styled from "styled-components";

export const StyledDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1.25rem 0;
  padding: 1.25rem;
  width: 100%;
  border: 4px solid #333;
  border-radius: 1.25rem;
  color: ${props => props.gameOver ? 'red' : '#999'};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  
  .text {
    margin-bottom: 0.5rem;
  }
`