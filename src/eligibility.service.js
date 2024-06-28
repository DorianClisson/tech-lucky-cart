const getPathValue = (cart, path) => {
    const splittedPath = path.split(".");
    return splittedPath.reduce((actualValue, key) => {
        return Array.isArray(actualValue)
            ? actualValue.map((arraySubValue) => arraySubValue[key])
            : actualValue[key];
    }, cart);
};

const checkCriteria = (cartValue, criteriaData) => {
    return false; // TODO
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
