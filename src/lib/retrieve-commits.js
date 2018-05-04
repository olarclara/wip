const axios = require('axios');

module.exports = async function retrieveCommits({ url }) {
  const { data, ...res } = await axios.get(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    },
  });

  return data;
};
