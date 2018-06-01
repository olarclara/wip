module.exports = function getGithubApiPagination(response) {
  return (
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
      }), {})
  );
};
