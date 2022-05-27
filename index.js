const request = require("request");

/*
 * Complete the 'topArticles' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts INTEGER limit as parameter.
 * base url for copy/paste:
 * https://jsonmock.hackerrank.com/api/articles?page=<pageNumber>
 */
async function topArticles(limit) {
    const list = await articleList(limit)
    const sortedList = list.sort((a, b) => b.num_comments - a.num_comments)
    const headers = sortedList.map(article => {
        const{ title, story_title } = article
        if (title || story_title) return title ? title : story_title
    })
    return headers.slice(0, limit).join(',')
}

async function articleList(limit) {
    let articleList = []
    for(let i = 1; i <= limit; i++) {
        let result = await getArticle(i)
        result.data.forEach(x => articleList.push(x))
    }
    return articleList
}

async function getArticle(page) {
  let options = {
    method: "GET",
    url: `https://jsonmock.hackerrank.com/api/articles?page=${page}`,
  };
  return new Promise((resolve, reject) => {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
}

module.exports = topArticles;