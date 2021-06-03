/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import backgroundImage from 'url:../assets/images/background.jpg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createAccount } from './routes';

const errorMessage = css`
  display: block;
  margin: -0.8rem 0 1rem 0;
  font-weight: 300;
  color: red;
`;
const positionStyple = css`
  width: 18em;
  position: absolute;
  z-index: 1;
  background: white;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  padding: 1.5em 1em 1.5em 1em;
`;

const SignUp = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setError,
  } = useForm();

  const submitForm = (formData) => {
    if (formData.password !== formData.verifiedPassword) return;
    setEmail(formData.email);
    createAccount(formData).then((res) => {
        if (res.status === 200) {
          setFormSubmitted(true);
        }
        if (res.status === 400) {
          setError('emailIsInvalid', {
            type: 'manual',
            message: 'Email is invalid',
          });
        }
        if (res.status === 409) {
          setError('userAlreadyExist', {
            type: 'manual',
            message: 'An account with this email already exists',
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {formSubmitted && (
        <span
          css={css`
            ${positionStyple} top: 30%;
          `}
        >
          {`Before login to Gym platform, you’ll need to verify your account. 
    We’ve sent a verification link to ${email}`}
        </span>
      )}
      {!formSubmitted && (
        <form
          css={css`
            ${positionStyple}
            top: 50%;
            justify-content: center;
            display: flex;
            flex-direction: column;
            input {
              display: block;
              padding: 0.75rem;
              font-size: 1rem;
              margin-bottom: 1rem;
            }
          `}
          onSubmit={handleSubmit(submitForm)}
        >
          <label htmlFor="fname">First name</label>
          <input
            id="fname"
            {...register('fname', { required: true })}
            type="text"
            name="fname"
          />
          {errors.fname && (
            <span css={errorMessage}>Please provide first name.</span>
          )}
          <label htmlFor="lname">Last name</label>
          <input
            id="lname"
            {...register('lname', { required: true })}
            type="text"
            name="lname"
          />
          {errors.lname && (
            <span css={errorMessage}>Please provide last name.</span>
          )}
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            name="email"
            id="email"
          />
          {errors.email && (
            <span css={errorMessage}>Please provide email.</span>
          )}
          {errors.emailIsInvalid && (
            <span css={css(errorMessage)}>{errors.emailIsInvalid.message}</span>
          )}
          <label htmlFor="password">Choose a password</label>
          <input
            id="password"
            {...register('password', { required: true })}
            type="text"
            name="password"
          />
          {errors.password && (
            <span css={errorMessage}>Please provide password.</span>
          )}
          <label htmlFor="verifiedPassword">Verify password</label>
          <input
            id="verifiedPassword"
            {...register('verifiedPassword', { required: true })}
            type="text"
            name="verifiedPassword"
          />
          {getValues('password') !== getValues('verifiedPassword') && (
            <span css={errorMessage}>Password isn't matched.</span>
          )}
          {errors.userAlreadyExist && (
            <span css={css(errorMessage)}>
              {errors.userAlreadyExist.message}
            </span>
          )}
          <button
            css={css`
              padding: 1em;
              font-size: 18px;
              &:hover {
                cursor: pointer;
              }
            `}
            type="submit"
          >
            Sign up
          </button>
        </form>
      )}
      <img
        alt=""
        css={css`
          position: fixed;
          width: 100%;
          height: 100%;
        `}
        src={backgroundImage}
      />
    </div>
  );
};

export default SignUp;
