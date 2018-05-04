const axios = require('axios');
const getGithubApiPagination = require('../../utils/get-github-api-pagination');

const config = {
  headers: {
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
};

module.exports = async function retrieveCommits({ url }) {
  let { data, ...res } = await axios.get(url, config);
  let pagination = getGithubApiPagination(res);
  let commits = data;

  while (pagination && pagination.next) {
    let { data, ...res } = await axios.get(pagination.next, config);
    pagination = getGithubApiPagination(res);
    commits = [...commits, ...data]
  }

  return commits;
};
