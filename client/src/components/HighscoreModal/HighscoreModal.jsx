import React, { useState } from "react";

import { StyledHighscoreModal } from "./HighscoreModal.styles";

const HighscoreModal = ({ submitName }) => {
  const [name, setName] = useState("");

  return <StyledHighscoreModal>
    <h2>Highscore!</h2>
    <input onChange={e => setName(e.target.value)} placeholder="Enter your name" value={name} />
    <button onClick={() => submitName(name)}>Submit</button>
  </StyledHighscoreModal>
};

export default HighscoreModal;
