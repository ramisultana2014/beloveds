import styled from "styled-components";
const Wrapper = styled.form`
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  background: var(--color-grey-0);
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 1rem;
  .user-info {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .birthday-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .gender {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    //border: 2px solid red;
    width: 100%;
  }
  select {
    border: 1px solid var(--color-grey-300);
    font-weight: 300;
    border-radius: var(--border-radius-md);
    padding: 8px 15px;
  }

  .form-row {
    display: grid;
    font-size: 1.4rem;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  input {
    color: var(--color-grey-900);
    padding: 8px 15px;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    width: 100%;
  }
  input:placeholder-shown {
    font-size: 1.2rem;
  }
  span {
    color: var(--color-red-800);
    font-size: 1.6rem;
    font-weight: 500;
  }

  .btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .btn {
    background: none;
    border: none;
    display: inline-block;
    transition: all 1s;
    border-radius: var(--border-radius-md);
  }
  .submit {
    font-size: 1.7rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    border: 2px solid var(--color-grey-0);
    box-shadow: 0 0 0 3px white;
    padding: 8px 20px;
    color: var(--color-grey-0);
    width: 100%;
  }
  .submit:hover {
    background-color: var(--color-brand-main-3);
    /* color: var(--color-brand-main-2); */
  }

  .cancel:hover {
    background: var(--color-grey-100);
  }
  @media (min-width: 700px) {
    padding: 3rem 5rem;
    width: 50vw;
    input:placeholder-shown {
      font-size: 1.6rem;
    }
  }
  @media (min-width: 1000px) {
    padding: 3rem 5rem;
    width: 40vw;
  }
`;
export default Wrapper;
