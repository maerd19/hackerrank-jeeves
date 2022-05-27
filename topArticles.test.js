const topArticles = require('./index.js');

it('receive top article from page 1', async () => {
    const data = await topArticles(1);
    expect(data).toEqual('F.C.C. Repeals Net Neutrality Rules');
});

it('receive top article from page 2', async () => {
    const data = await topArticles(2);
    expect(data).toEqual('UK votes to leave EU,F.C.C. Repeals Net Neutrality Rules');
});