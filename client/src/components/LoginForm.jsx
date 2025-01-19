import { useForm } from "react-hook-form";
import { useState } from "react";
import Wrapper from "../assets/wrapper/LoginForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogin } from "../../features/authentication/useLogIn";
import { MiniSpinner } from "../components";
function LoginForm() {
  const { logIn, isPending } = useLogin();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [showpassword, setShowPassword] = useState(false);
  function onSubmit(data) {
    logIn(data, {
      onSettled: () => reset(),
    });
    //console.log(data);
  }
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>Log Into Beloveds</h3>

      <div className="form-row">
        <input
          placeholder="Email"
          autoComplete="email"
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isPending}
        />
        {errors?.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div className="form-row show-password">
        <span onClick={() => setShowPassword((s) => !s)} className="icon">
          {showpassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <input
          placeholder="password"
          type={showpassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isPending}
        />
        {errors?.password?.message && <span>{errors.password.message}</span>}
      </div>

      <button disabled={isPending} className="submit" type="submit">
        {isPending ? (
          <>
            <MiniSpinner />
          </>
        ) : (
          "Log In"
        )}
      </button>
      <div className="action">
        <Link to="/forgetpassword">Forget password?</Link>
        <Link to="/signup">Sign up for Beloveds</Link>
      </div>
    </Wrapper>
  );
}

export default LoginForm;
