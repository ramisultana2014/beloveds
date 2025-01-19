import { useForm } from "react-hook-form";
import Wrapper from "../assets/wrapper/signupForm";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../features/authentication/useSignUp";
import { MiniSpinner } from "../components";
const day = 31;
const month = 12;
function SignupForm() {
  const { register, formState, handleSubmit, reset, getValues } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { signUp, isPending } = useSignUp();
  function onSubmit({
    name,
    lastName,
    year,
    month,
    day,
    email,
    password,
    gender,
    passwordConfirm,
  }) {
    const birthday = `${year}/${month}/${day}`;

    const data = {
      name,
      lastName,
      email,
      password,
      passwordConfirm,
      birthday,
      gender,
    };
    //console.log(data);
    signUp(data, {
      onSuccess: () => reset(),
    });
  }
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>Create a new account</h3>
      <div className="user-info">
        <input
          type="text"
          placeholder="First name"
          id="name"
          {...register("name", {
            required: true,
            maxLength: 20,
          })}
          disabled={isPending}
        />

        <input
          type="text"
          placeholder="Last name"
          id="lastName"
          {...register("lastName", {
            required: true,
            pattern: /^[A-Za-z]+$/i,
          })}
          disabled={isPending}
        />
      </div>
      <div className="birthday-info">
        <input
          type="text"
          placeholder="year"
          id="year"
          {...register("year", {
            required: true,
            min: 1960,
            max: 2010,
          })}
          disabled={isPending}
        />

        {/* <input
          type="text"
          placeholder="month"
          id="month"
          {...register("month", {
            required: true,
            min: 1,
            max: 12,
          })}
          disabled={isPending}
        /> */}
        <select
          disabled={isPending}
          id="month"
          {...register("month", { required: true })}
        >
          <option value="">month</option>
          {Array.from({ length: month }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          placeholder="day"
          id="day"
          {...register("day", {
            required: true,
            min: 1,
            max: 31,
          })}
          disabled={isPending}
        /> */}
        <select
          disabled={isPending}
          id="day"
          {...register("day", { required: true })}
        >
          <option value="">day</option>
          {Array.from({ length: day }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="gender">
        <select
          disabled={isPending}
          id="gender"
          {...register("gender", { required: true })}
        >
          <option value="">gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
      </div>
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
          {isPending ? <MiniSpinner /> : "Sign Up"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="btn cancel"
          type="reset"
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </Wrapper>
  );
}

export default SignupForm;
