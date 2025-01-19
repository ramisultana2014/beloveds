import styled from "styled-components";
const Wrapper = styled.section`
  //border: 3px solid red;
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-lg);
  width: 50vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  padding: 8px 16px;
  h3 {
    text-align: center;
  }
  img {
    border-radius: 50%;
  }
  form {
    //border: 3px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    display: inline-block;
    padding: 6px 12px;

    cursor: pointer;
  }
  .custom-file-upload:hover {
    color: var(--color-brand-main-2);
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
    background: var(--color-red-800);
  }
  @media (max-width: 700px) {
    width: 70vw;
    h3 {
      font-size: 1.6rem;
    }
    img {
      width: 70%;
    }
  }
`;

export default Wrapper;
