const axios = require('axios');

const config = {
  headers: {
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
};

const getPagination = response =>
  response && response.headers &&
  response.headers.link && response.headers.link
    .split(',')
    .map(str => {
      const [rawUrl, rawRel] = str.split(';');
      const [, rel] = rawRel
        .trim()
        .match(/\"(.+)\"/);
      const [, url] = str
        .trim()
        .match(/\<(.+)\>/);

      return { [rel]: url };
    })
    .reduce((memo, item) => ({
      ...memo,
      ...item,
    }), {});

module.exports = async function retrieveCommits({ url }) {
  let { data, ...res } = await axios.get(url, config);
  let pagination = getPagination(res);
  let commits = data;

  while (pagination && pagination.next) {
    let { data, ...res } = await axios.get(pagination.next, config);
    pagination = getPagination(res);
    commits = [...commits, ...data]
  }

  return commits;
};
