import styled from "styled-components";

import bgImage from "../../assets/img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: url(${bgImage}) #000; */
  /* background: 
    radial-gradient(100% 225% at 0% 0%, #DE3E3E 0%, #17115C 100%),
    radial-gradient(100% 225% at 100% 0%, #FF9040 0%, #FF0000 100%), 
    linear-gradient(180deg, #CE63B7 0%, #ED6283 100%), 
    radial-gradient(100% 120% at 75% 0%, #A74600 0%, #000000 100%),
    linear-gradient(310deg, #0063D8 0%, #16009A 50%);
  background-blend-mode: overlay, color-dodge, color-burn, color-dodge, normal;
  background-size: cover;
  overflow: hidden; */
`;

export const StyledTetris = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2.5rem;
  margin: 0 auto;
  /* max-width: 900px; */
  width: 100%;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 1.25rem;
  }
`;
