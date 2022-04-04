const websiteController = {
    /**
     * Home controller which display documentation link.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    home(_, response) {
        response.render('home', { title: 'Majordome API' });
    },
};

module.exports = { websiteController };
