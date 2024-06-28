/**
 * Get a nested value in object
 * path written in "pathA.pathB.pathC" format
 * No index for array because we need to iterate through each array elem to later check if one is correct
 * If an array is found while getting the nested value then should return an array of results (with the final value corresponding to the rest of path for each array element)
 *
 * @param cart
 * @param path
 * @return {any}
 */
const getPathValue = (cart, path) => {
    const splittedPath = path.split(".");
    return splittedPath.reduce((actualValue, key) => {
        return Array.isArray(actualValue)
            ? actualValue.map((arraySubValue) => arraySubValue[key])
            : actualValue[key];
    }, cart);
};
