module.exports.handler = (event, context, callback) => {
  console.log(event);
  const response = {
    statusCode: 200,
  };

  callback(null, response);
};
