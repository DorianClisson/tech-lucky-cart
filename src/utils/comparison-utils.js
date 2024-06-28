/**
 * Map of each comparison and its maths logic for easy access
 * For each comparator function return the logic result
 *
 * @param cartValue
 * @param criteriaValue
 * @return {boolean}
 */
export const CRITERIA_COMPARATORS = {
    eq: (cartValue, criteriaValue) => cartValue == criteriaValue,
    gt: (cartValue, criteriaValue) => cartValue > criteriaValue,
    gte: (cartValue, criteriaValue) => cartValue >= criteriaValue,
    lt: (cartValue, criteriaValue) => cartValue < criteriaValue,
    lte: (cartValue, criteriaValue) => cartValue <= criteriaValue,
    in: (cartValue, criteriaValue) =>
        criteriaValue.some((criteriaValueElem) =>
            CRITERIA_COMPARATORS["eq"](cartValue, criteriaValueElem)
        ),
    and: (cartValue, criteriaValue) =>
        Object.keys(criteriaValue).every((criteriaValueSubKey) =>
            CRITERIA_COMPARATORS[criteriaValueSubKey](
                cartValue,
                criteriaValue[criteriaValueSubKey]
            )
        ),
    or: (cartValue, criteriaValue) =>
        Object.keys(criteriaValue).some((criteriaValueSubKey) =>
            CRITERIA_COMPARATORS[criteriaValueSubKey](
                cartValue,
                criteriaValue[criteriaValueSubKey]
            )
        ),
};
