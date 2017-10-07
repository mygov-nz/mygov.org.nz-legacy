export.form = (event, context, callback) => {
    const hash = btoa([
        req.body.year,
        req.body.threshold / 100,
        undefined === req.body.allowOverhang ? 0 : 1,
        undefined === req.body.tagAlong ? 0 : 1,
        req.body.tagAlongSeats
    ].join(','));

    callback(null, {
        statusCode: 302,
        headers: [
            'Link: <https://mygov.org.nz/tools/mmp-review>; rel="canonical"',
            `Location: https://mygov.org.nz/tools/mmp-review/${hash}`
        ]
    });
};
