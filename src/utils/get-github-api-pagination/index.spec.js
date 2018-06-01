const getGithubApiPagination = require('./');

test('returns undefined if nothing is passed', () => {
  const pagination = getGithubApiPagination();
  expect(pagination).toBe(undefined);
});

test('return undefined if no headers in response', () => {
  const pagination = getGithubApiPagination({});
  expect(pagination).toBe(undefined);
});

test('return undefined if no link in headers', () => {
  const pagination = getGithubApiPagination({ headers: {} });
  expect(pagination).toBe(undefined);
});

test('return object with next and last', () => {
  const response = {
    headers: {
      link: '<https://api.github.com/repositories/111133411/commits?page=2>; rel="next", <https://api.github.com/repositories/111133411/commits?page=3>; rel="last"',
    },
  };
  const pagination = getGithubApiPagination(response);
  expect(pagination).toEqual({
    next: 'https://api.github.com/repositories/111133411/commits?page=2',
    last: 'https://api.github.com/repositories/111133411/commits?page=3',
  });
});
