import styled from "styled-components";
const Wrapper = styled.section`
  border: 2px solid black;
  padding: 20px 0;
  display: grid;
  padding-left: 20px;
  border-radius: 8px;
  height: 80%;
  margin: 0 auto;
  width: 100%;
  .info {
    //border: 2px solid red;
    position: relative;

    margin-bottom: 1rem;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 6rem 4rem 1fr;
    align-items: center;
    gap: 5px;
    width: 23rem;
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
  .infop {
    margin-left: -2rem;
  }

  .info img {
    width: 5rem;
    aspect-ratio: 1/1;
    border: 3px solid var(--color-brand-main-2);
    object-fit: cover;
    border-radius: 50%;
  }
  .info svg {
    color: var(--color-brand-main-2);
    width: 4rem;
    height: 4rem;
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: space-evenly;
  }
  .accept {
    font-size: 1.2rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    border: 2px solid var(--color-grey-0);
    padding: 4px;
    color: var(--color-grey-0);
    width: 5rem;
    min-width: fit-content;
    margin: 0 0 0 20px;
    justify-self: stretch;
  }
  .accept:hover {
    background-color: var(--color-brand-main-3);
  }
  .decline {
    font-size: 1.4rem;
    background: none;
    border: none;
    min-width: fit-content;
  }
  .decline:hover {
    color: var(--color-red-800);
  }
`;
export default Wrapper;
