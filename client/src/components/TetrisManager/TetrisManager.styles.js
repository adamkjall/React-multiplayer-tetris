import styled from "styled-components";

export const StyledTetrisManager = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  /* grid-auto-rows: 1fr; */
  justify-items: center;
  align-items: center;
`;
