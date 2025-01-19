import { Link } from "react-router-dom";
import Wrapper from "../assets/wrapper/Login";
import { Logo } from "../components";
import SignupForm from "../components/SignupForm";

function SignUpPage() {
  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>
      <SignupForm />
    </Wrapper>
  );
}

export default SignUpPage;
