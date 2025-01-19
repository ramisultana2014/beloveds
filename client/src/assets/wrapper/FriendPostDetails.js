import styled from "styled-components";
const Wrapper = styled.section`
  //border: 2px solid red;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 10px 2px;
  position: relative;
  img {
    border-radius: 8px 8px 4px 4px;
  }
  .view {
    align-self: flex-end;
  }

  .btn {
    border: none;
    background: none;
    font-size: 1.2rem;
    transition: all 1s;
    padding: 2px;
  }
  form {
    padding: 6px;
  }
  input {
    border-radius: 8px;
    border: 1px solid gray;
    margin-right: 2px;
    padding: 0 4px;
  }
  .btn:hover {
    color: var(--color-brand-main-2);
  }
  .commentdetails {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 3px;
    margin-bottom: 1rem;

    //transform: translateX(-20%);
    //align-self: flex-start;
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
    width: 18rem;
    font-size: 1.4rem;
  }
  p:first-child {
    color: var(--color-brand-main-2);
  }
  @media (min-width: 700px) {
    .view {
      align-self: auto;
      margin-left: 25%;
    }
    .commentdetails {
      width: 40%;
    }
  }
`;
export default Wrapper;
