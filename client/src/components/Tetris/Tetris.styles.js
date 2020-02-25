import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 850px;
  outline: none;
  font-size: ${props => 1 - (props.nPlayers * 0.1)}rem;
`;

export const StyledTetris = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  margin: 0 auto;
  min-width: 600px;
  /* font-size: 0.8rem; */

  .stage {
    width: 40%;
  }

  .next-tetrimino {
    width: 30%;
    padding-right: 1.25rem;

    > * {
      margin-bottom: 1rem;
    }
  }

  .information {
    width: 30%;
    display: block;
    padding: 0 1.25rem;
  }
`;
