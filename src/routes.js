
export const sendToken = (token) =>
    fetch(`http://localhost:5000/account-verification/${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });

export const createAccount = (params) => 
    fetch(`http://localhost:5000/users`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
     },
    })