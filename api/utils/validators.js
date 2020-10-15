// TODO move to NPM package

exports.mbcTs = (req) => {
    console.log(req.body.stocks)
    const error = {name: 'stocks'};
    // TODO: add more validation
    if (req.body.stocks.split(' ')[1]) {
        error.message = 'Stocks cannot have whitespace';
        return [error];
    }
}