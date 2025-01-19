import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Wrapper from "../assets/wrapper/VeriviedEmailAddress";
import { useAccountActivate } from "../../features/authentication/useAccountActivate";
import { useRequestNewCode } from "../../features/authentication/useRequestNewCode";

function VeriviedEmailAddress() {
  const [verificationCode, setverificationCode] = useState("");
  const { accountActivate, isLoading } = useAccountActivate();
  const { requestNewCode } = useRequestNewCode();
  const [showtimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    const verificationCodeTrim = verificationCode.trim();
    if (verificationCodeTrim.length > 6 || verificationCodeTrim.length < 6)
      return toast.error("please enter valid code");

    accountActivate({ verificationCode: verificationCodeTrim });
    setverificationCode("");
  }
  function handleNewCode() {
    setShowTimer((s) => !s);
    setTimer(30);
    requestNewCode();
  }
  useEffect(
    function () {
      if (showtimer && timer > 0) {
        const interValid = setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000);
        return () => clearInterval(interValid);
      } else if (timer === 0) {
        setShowTimer(false);
      }
    },
    [timer, showtimer]
  );

  return (
    <Wrapper>
      <h1>please Enter your Verivication Code</h1>
      <form onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          required
          type="text"
          placeholder="* * * * "
          onChange={(e) => setverificationCode(e.target.value)}
          value={verificationCode}
        />
        <button disabled={isLoading} className="submit">
          Submit
        </button>
      </form>
      <div className="code">
        <p>
          {showtimer
            ? "please check your email"
            : `if you did't receive your code`}
        </p>
        <button onClick={handleNewCode} className="act" disabled={showtimer}>
          {showtimer
            ? `you can ask for new code after ${timer} s`
            : "click here"}
        </button>
      </div>
    </Wrapper>
  );
}

export default VeriviedEmailAddress;
