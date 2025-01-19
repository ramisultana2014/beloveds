import { Link } from "react-router-dom";
import Wrapper from "../assets/wrapper/Login";
import { Logo, ForgetPasswordForm } from "../components";
function ForgetPassword() {
  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>
      <ForgetPasswordForm />
    </Wrapper>
  );
}

export default ForgetPassword;
