import styled from "styled-components";
const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
  width: 100%;
  .tooltip {
    position: relative;
  }
  .tooltiptext {
    position: absolute;
    bottom: -20%;
    left: 30%;
    visibility: hidden;
  }
  .tooltip:hover .tooltiptext {
    visibility: visible;
    color: black;
  }
  .search {
    position: relative;
    width: 50%;
  }
  .search svg {
    position: absolute;
    right: 5%;
    top: 20%;
    width: 2rem;
    height: 2rem;
  }
  input {
    border-radius: 50px;
    padding: 4px 20px;
    width: 100%;
    //color: var(--color-grey-900);
  }
  input::placeholder {
    font-size: 2rem;
    color: var(--color-brand-main-2);
  }
  .nav-account-info {
    //margin-left: auto;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .nav-account-info p {
    font-size: 1rem;
  }
  .nav-account-info img {
    width: 5rem;
    aspect-ratio: 1/1;
    border: 2px solid var(--color-grey-900);
    object-fit: cover;
    border-radius: 50%;
  }

  .show-logout {
    position: relative;
    /* transform: translateY(10%); */
  }
  .logout {
    padding: 4px;
    font-size: 1.5rem;
    border-radius: 8px;
    background-color: var(--color-brand-main-2);
    position: absolute;
    top: 80%;
    right: 0;
    transform: translateX(40%);
    visibility: hidden;
    color: var(--color-grey-50);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 999;
    //align-items: center;

    width: 20rem;
  }
  .show-logout:hover img {
    border: 2px solid var(--color-brand-main-2);
  }
  .show-logout:hover .logout {
    visibility: visible;
    border: 2px solid var(--color-brand-main-2);
  }
  .logoutbutton {
    //margin-top: 5px;
    background: none;
    border: none;
    padding: 1px;
    text-align: left;
    //width: 100%;
  }
  .logoutbutton:hover {
    color: #eee7fe;
    background-color: #3e0aac;
    border-radius: 8px;
  }
  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
    position: relative;
  }
  a:hover,
  a:active {
    //color: var(--color-grey-800);
    color: #eee7fe;
    background-color: #3e0aac;
    border-radius: 8px;
  }
  a:has(svg):hover,
  a:has(svg):active {
    background-color: var(--body-background-color);
    color: var(--color-brand-main-2);
  }
  .svg {
    height: 3rem;
    width: 3rem;

    transition: all 1s;
    cursor: pointer;
  }

  .svg:hover {
    color: var(--color-brand-main-2);
  }
  .darkMode {
    background: none;
    border: none;
  }
  .svgspan {
    position: absolute;
    bottom: -30%;
    right: 5%;
    transition: color 1s;
    color: var(--color-brand-main-2);
    font-weight: 400;
  }

  /* .darkMode svg {
    width: 3rem;
    height: 3rem;
  } */
  @media (max-width: 500px) {
    padding: 0;

    .search {
      width: 100%;
    }
    input {
      padding: 0 0 0 5px;
    }
    input::placeholder {
      font-size: 1.2rem;
      color: var(--color-brand-main-2);
    }
    .svg {
      height: 2rem;
      width: 2rem;
    }
    .logoutbutton {
      font-size: 2rem;
      padding: 1px;
    }
    a:link,
    a:visited {
      font-size: 1.4rem;
    }
    .logout {
      width: 8rem;
    }
    .nav-account-info img {
      min-width: 3rem;
    }
  }
`;
export default Wrapper;
