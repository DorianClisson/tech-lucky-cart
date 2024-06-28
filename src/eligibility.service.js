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

// map of each comparison and its maths logic for easy access
const CRITERIA_COMPARATORS = {
    eq: (cartValue, criteriaValue) => cartValue == criteriaValue,
    // TODO all others
    //gt
    //gte
    //lt
    //lte
    //in
    //and
    //or
};

/**
 * Check if a single criteria is fulfilled (= true)
 *
 * @param cartValue
 * @param criteriaData
 * @return {boolean}
 */
const checkCriteria = (cartValue, criteriaData) => {
    const isCriteriaDataObject = typeof criteriaData === "object";

    const criteriaOperator = isCriteriaDataObject
        ? Object.keys(criteriaData)[0]
        : "eq"; // when eq comparison => value is explicitly given without "eq" written in an object format
    const criteriaValue = isCriteriaDataObject
        ? criteriaData[criteriaOperator]
        : criteriaData; // if criteriaData is not an object then it is "eq" comparison therefore the value is directly given so criteriaValue = criteriaData

    return CRITERIA_COMPARATORS[criteriaOperator](cartValue, criteriaValue);
};

class EligibilityService {
    /**
     * Compare cart data with criteria to compute eligibility.
     * If all criteria are fulfilled then the cart is eligible (return true).
     *
     * @param cart
     * @param criteria
     * @return {boolean}
     */
    isEligible(cart, criteria) {
        const criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every((criteriaKey) => {
            const correspondingValueInCart = getPathValue(cart, criteriaKey);
            const criteriaData = criteria[criteriaKey];
            return checkCriteria(correspondingValueInCart, criteriaData);
        });
    }
}

module.exports = {
    EligibilityService,
};
