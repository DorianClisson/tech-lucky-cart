import { CRITERIA_COMPARATORS } from "./utils";

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

    return Array.isArray(cartValue)
        ? cartValue.some((cartValueElem) =>
              CRITERIA_COMPARATORS[criteriaOperator](
                  cartValueElem,
                  criteriaValue
              )
          )
        : CRITERIA_COMPARATORS[criteriaOperator](cartValue, criteriaValue);
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
