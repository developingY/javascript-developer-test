const { httpGet } = require("./mock-http-interface");
const SUCCEED_KEY = "Arnie Quote";
const FAILURE_KEY = "FAILURE";

const getArnieQuote = async (url) => {
  const res = await httpGet(url);
  const responseKey = res.status === 200 ? SUCCEED_KEY : FAILURE_KEY;
  const responseBody = JSON.parse(res?.body);
  return {
    [responseKey]: responseBody?.message,
  };
};

const getArnieQuotes = async (urls) => {
  try {
    return await Promise.all(urls.map(getArnieQuote));
  } catch (e) {
    console.error("Failed to getArnieQuotes: ", { error: e, inputUrls: urls });
    // In the real world we'll need a better fall back value depending on product requirement.
    // Or rethrow the exception.
    return [];
  }
};

module.exports = {
  getArnieQuotes,
};
