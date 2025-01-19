import styled from "styled-components";
const Wrapper = styled.form`
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  background: var(--color-grey-0);
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 1rem;
  .form-row {
    display: grid;
    font-size: 1.4rem;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  .show-password {
    position: relative;
  }
  .icon {
    font-size: 2rem;
    position: absolute;
    color: var(--color-grey-800);
    right: 5%;
    top: 30%;
  }
  input {
    color: var(--color-grey-900);
    padding: 15px 30px;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    width: 100%;
  }
  span {
    color: var(--color-red-800);
    font-size: 1.6rem;
    font-weight: 500;
  }
  .btn {
    background: none;
    border: none;
    display: inline-block;
    transition: all 1s;
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
  .action {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25rem;
  }
  a:link,
  a:visited {
    color: var(--color-brand-main-2);
    text-decoration: none;
    transition: all 1s;
  }
  a:hover,
  a:active {
    color: var(--color-grey-800);
    text-decoration: underline;
  }
  @media (min-width: 800px) {
    padding: 3rem 5rem;
    width: 50vw;
    a:link,
    a:visited {
      font-size: 1.6rem;
    }
    a:hover,
    a:active {
      color: var(--color-grey-800);
    }
  }
  @media (min-width: 1000px) {
    padding: 3rem 5rem;
    width: 40vw;
  }
`;
export default Wrapper;
