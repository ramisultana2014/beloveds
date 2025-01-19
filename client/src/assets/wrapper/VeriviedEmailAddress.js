import styled from "styled-components";
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  h1 {
    font-size: 1.6rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    width: 50%;
    max-width: 30rem;
    gap: 2rem;
  }
  input {
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    padding: 0.8rem 1.2rem;
    width: 100%;
    position: relative;
    &::placeholder {
      position: absolute;
      top: 35%;
    }
  }
  .submit {
    font-size: 2rem;
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
  .code {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .act {
    background: none;
    border: none;
    text-decoration: underline;
    color: var(--color-brand-main-2);
    font-weight: 500;
    font-size: 1.8rem;
  }
  .act:hover {
    text-decoration: none;
  }
  .act:disabled {
    text-decoration: none;
  }
  @media (min-width: 500px) {
    h1 {
      font-size: 2rem;
    }
  }
`;
export default Wrapper;
