/**
 * Controller wrapper to manage errors
 * @param {object} controller a controller to execute inside try… catch… block
 * @returns {object} a controller as middleware function
 */
module.exports = (controllerMethod) => async (request, response, next) => {
    try {
        await controllerMethod(request, response, next);
    } catch (error) {
        next(error);
    }
};
