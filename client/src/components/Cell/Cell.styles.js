import styled from "styled-components";

export const StyledCell = styled.div`
  /* width: auto; */
  background: rgba(${props => props.color}, ${props => props.type === 0 ? 0.6 : .8});
  border: ${props => (props.type === 0 ? "none" : "4px solid")};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);

  &::after {
    padding-bottom: 100%;
    content: "";
    display: block;
  }
`;
