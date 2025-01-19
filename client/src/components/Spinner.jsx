import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  width: 6.4rem;
  margin: 10rem auto;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #580ef6;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
