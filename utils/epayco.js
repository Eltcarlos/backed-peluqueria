const base64 = require("base-64");

const generateToken = async () => {
  const url = `${process.env.URL_EPAYCO}/login/mail`;
  const username = `${process.env.EPAYCO_PUBLIC_KEY}`;
  const password = `${process.env.EPAYCO_PRIVATE_KEY}`;
  resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + username + ":" + password,
    },
  });
  console.log(resp);
  return await resp.json();
};

const sendTransaction = async (data) => {
  const url = `${process.env.URL_EPAYCO}/payment/process`;
  resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer 123`,
    },
    body: JSON.stringify(data),
  });
  return await resp.json();
};

module.exports = {
  sendTransaction,
  generateToken,
};
