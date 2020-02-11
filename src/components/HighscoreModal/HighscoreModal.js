import React, { useState } from "react";

import { StyledHighscoreModal } from "./HighscoreModal.styles";

const HighscoreModal = ({ submitName }) => {
  const [name, setName] = useState("");
  
  const onNameChange = e => {
    setName(e.target.value)
  }

  return <StyledHighscoreModal>
    <h2>Highscore!</h2>
    <input onChange={onNameChange} placeholder="Enter your name" value={name} />
    <button onClick={() => submitName(name)}>Submit</button>
  </StyledHighscoreModal>
};

export default HighscoreModal;
