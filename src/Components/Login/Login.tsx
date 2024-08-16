import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { getAuthToken } from '../../apiCalls';
import './Login.css';

type LoginInput = {
  email: string;
  password: string;
};

type LoginProps = {
  setToken: (token: string | undefined) => void;
  loggedIn: boolean;
};

const messages = {
  invalid: <FormattedMessage id="login.messages.invalid" defaultMessage="Invalid email or password" />,
  success: <FormattedMessage id="login.messages.success" defaultMessage="You are logged in" />,
};

export default function Login({ setToken, loggedIn }: LoginProps) {
  const { register, handleSubmit, reset } = useForm<LoginInput>();

  const [isInvalid, setIsInvalid] = useState(false);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const token = await getAuthToken(data.email, data.password);
      setToken(token);
      setIsInvalid(false);
      reset();
    } catch (error) {
      setIsInvalid(true);
    }
  };

  const handleLogout = () => {
    setToken(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-container">
      {loggedIn && <div>{messages.success}</div>}
      <div>
        <label htmlFor="email">
          <FormattedMessage id="login.email" defaultMessage="Email: " />
        </label>
        <input type="email" {...register('email', { required: true })} />
      </div>
      <div>
        <label htmlFor="password">
          <FormattedMessage id="login.password" defaultMessage="Password: " />
        </label>
        <input type="password" {...register('password', { required: true })} />
      </div>
      {isInvalid && <div>{messages.invalid}</div>}
      <div className="login-button-container">
        <button type="submit" className="login-button">
          <FormattedMessage id="login.submit" defaultMessage="Login" />
        </button>
        <button type="button" className="login-button" onClick={handleLogout}>
          <FormattedMessage id="login.logout" defaultMessage="Logout" />
        </button>
      </div>
    </form>
  );
}
