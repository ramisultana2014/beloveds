import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background: var(--body-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  .box {
    background: var(--body-background-color);
    border: 1px solid var(--text-color);
    border-radius: var(--border-radius-md);

    padding: 4.8rem;
    flex: 0 1 96rem;
    text-align: center;

    & h1 {
      color: var(--text-color);
      margin-bottom: 3.2rem;
    }
  }
  a:link,
  a:visited {
    color: var(--text-color);
    text-decoration: none;
    display: inline-block;
    border: 2px solid var(--text-color);
    padding: 8px 20px;
    border-radius: 8px;
    transition: all 1s;
  }
  a:hover {
    color: var(--color-brand-main-2);
  }
`;

export default Wrapper;
