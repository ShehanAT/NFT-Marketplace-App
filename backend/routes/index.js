const tokenRoutes = require('./tokenRoutes');


const appRouter = (app) => {
    tokenRoutes(app);
};

module.exports = appRouter;

