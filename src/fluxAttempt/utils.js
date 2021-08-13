/* eslint-disable import/prefer-default-export */

/**
 *  @name updateObject
 *  @desc Encapsulate the idea of passing a new object as the first parameter
 *  to Object.assign to ensure we correctly copy data instead of mutating
 *  @param {Object} oldObject
 *  @param {Object} newValues
 *  @return {Object} update
 */
export const updateObject = (oldObject, newValues) => {
    const update = Object.assign({}, oldObject, newValues);
    // const update = { ...oldObject, ...newValues};
    return update;
};

/**
 *  @name updateItem
 *  @desc Update an item in array and return new instance of the array
 *  @param {Array} collection
 *  @param {Number} index
 *  @param {Any} newItem
 *  @return {Array} newCollection
 */
export const updateItem = (collection, index, newItem) => {
    const newCollection = collection.slice();

    newCollection[index] = newItem;

    return newCollection;
};
