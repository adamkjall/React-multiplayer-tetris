import styled from "styled-components";

export const StyledHighscoreModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  background: rgba(2, 2, 170, 0.7);
  width: 300px;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-family: Pixel;

  h2 {
    margin-top: 0;
    color: white;
  }

  input {
    font-family: Pixel;
    padding: 0.3rem;
  }

  button {
    padding: 0.6rem 1.5rem;
    font-family: Pixel;
    margin-top: 1rem;
  }
`;
