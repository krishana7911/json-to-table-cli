// lib/flatten.js
/**
 * Recursively flattens a nested object into a single-level object with dot notation keys.
 *
 * @param {Object} obj - The object to flatten.
 * @param {string} parentKey - Parent key for recursion (used internally).
 * @param {Object} result - Accumulator object (used internally).
 * @returns {Object} Flattened object.
 */
function flattenObject(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
}

module.exports = flattenObject;
