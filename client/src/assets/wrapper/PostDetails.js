import styled from "styled-components";
const Wrapper = styled.div`
  //border: 2px solid red;
  width: 30rem;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  gap: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 10px;
  position: relative;
  border-radius: 8px;
  img {
    border-radius: 8px;
    width: 25rem;
  }
  .minus-div {
    position: absolute;
    right: 3%;
    top: 3%;
  }
  .showcomments {
    display: block;
    font-size: 1.2rem;
    background: none;
    border: none;
    color: var(--color-brand-main-2);
  }
  .commentdetails {
    display: flex;
    align-items: center;
    gap: 3px;
    align-self: flex-start;
    margin-bottom: 1rem;
  }
  .commentdetails img {
    width: 4rem;
    aspect-ratio: 1/1;
    border: 2px solid var(--color-grey-900);
    object-fit: cover;
    border-radius: 50%;
  }
  .text {
    background: var(--color-grey-200);
    padding: 5px;
    border-radius: 8px;
    width: 10rem;
    font-size: 1.4rem;
  }
  p:first-child {
    color: var(--color-brand-main-2);
  }
`;

export default Wrapper;
