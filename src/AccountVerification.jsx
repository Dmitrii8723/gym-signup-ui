/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import backgroundImage from 'url:../assets/images/background.jpg';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const UPDATE_USER = gql`
mutation UpdateUser($email_verified: Boolean, $token: String) {
  updateUser(email_verified: $email_verified, token: $token)
}
    `;

const spanStyle = css`
  width: 18em;
  position: absolute;
  z-index: 1;
  background: white;
  top: 30%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  padding: 1.5em 1em 1.5em 1em;
  text-align: center;
`;

const AccountVerification = withRouter(({ match }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (error) => console.log('error', error),
    onCompleted: (res) => {
      if (res.updateUser === 201) {
        setAuthenticated(true);
        return;
      }
      if (res.updateUser === 401) {
        setAuthenticated(false);
      }
    }
  });
  useEffect(() => {
    const { token } = match.params;
    updateUser({ variables: { email_verified: true, token }});
  }, []);
  return (
    <div>
      {authenticated && (
        <span css={spanStyle}>
          {`Congratulations, your account has been verified!`}
        </span>
      )}
      {!authenticated && (
        <span css={spanStyle}>
          {`Unfortinately, we aren't able to verify your account. 
  Most likely this verification link isn't valid anymore`}
        </span>
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
});

export default AccountVerification;
