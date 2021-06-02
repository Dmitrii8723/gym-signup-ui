 /** @jsx jsx */
 import { jsx, css } from '@emotion/react';
 import backgroundImage from '../assets/images/background.jpg';
 import { useEffect, useState } from 'react';
 import { withRouter } from 'react-router-dom';

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
        text-align: center;` 

 const AccountVerification = withRouter(({ match }) => {
     const [authenticated, setAuthenticated] = useState(false);
     useEffect(() => {
        const { token } = match.params;
        fetch(`http://localhost:5000/account-verification/${token}`, {
            method: 'POST',
            headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
           }
            }).then((res) => {
                if(res.status === 201) {
                    setAuthenticated(true);
                    return;
                }
                return;
            })
     }, []);
     return(<div>
         {authenticated && (
<span css={spanStyle} >
  {`Congratulations, your account has been verified!`}
</span>)}
{!authenticated && (
<span
  css={spanStyle}>
  {`Unfortinately, we aren't able to verify your account. 
  Most likely this verification link isn't valid anymore`}
</span>)}
<img css={css`
  position: fixed; 
  width: 100%; 
  height: 100%;`
} src={backgroundImage}/>
     </div>);
 });

 export default AccountVerification;