import styled from "styled-components";
import Wrapper from "../assets/wrapper/PageNotFound";
import { Link } from "react-router-dom";

function PageNotFound({ errorMessage }) {
  return (
    <Wrapper>
      <div className="box">
        {errorMessage ? (
          <h1>{errorMessage}</h1>
        ) : (
          <h1> The page you are looking for could not be found 😢</h1>
        )}

        <Link to="/" replace="true">
          please Sign Up
        </Link>
      </div>
    </Wrapper>
  );
}

export default PageNotFound;
