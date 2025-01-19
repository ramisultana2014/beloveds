import { useForm } from "react-hook-form";
import Wrapper from "../assets/wrapper/signupForm";
import { useNavigate } from "react-router-dom";
import { useForgetPassword } from "../../features/authentication/useForgetPassword";
import { MiniSpinner } from ".";
function ForgetPasswordForm() {
  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { forgetPassword, isPending } = useForgetPassword();
  function onSubmit(data) {
    //console.log(data);
    forgetPassword(data, {
      onSuccess: () => reset(),
    });
  }
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>Reset Your Password</h3>

      <div className="form-row">
        <input
          placeholder="Email"
          autoComplete="email"
          type="email"
          id="email"
          {...register("email", {
            required: true,
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
        <input
          placeholder="password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isPending}
        />
        {errors?.password?.message && <span>{errors.password.message}</span>}
      </div>
      <div className="form-row">
        <input
          placeholder="passwordConfirm"
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) =>
              value === getValues().password || "passwords need to be match",
          })}
          disabled={isPending}
        />
        {errors?.passwordConfirm?.message && (
          <span>{errors.passwordConfirm.message}</span>
        )}
      </div>
      <div className="btns">
        <button disabled={isPending} className="submit" type="submit">
          {isPending ? <MiniSpinner /> : "submit"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="btn cancel"
          type="reset"
          //disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </Wrapper>
  );
}

export default ForgetPasswordForm;
