/**
 * @typedef {('text' | 'image' | 'list' | 'page' | 'heading1' | 'heading2' | 'heading3')} NodeType
 */

/**
 * @typedef {Object} NodeData
 * @property {string} id - Unique node identifier
 * @property {NodeType} type - Block type
 * @property {string} value - Content value
 */

/**
 * @typedef {Object} Page
 * @property {string} id - Page ID from database
 * @property {string} slug - URL-friendly page identifier
 * @property {string} title - Page title
 * @property {NodeData[]} nodes - Array of content blocks
 * @property {string} cover - Cover image file path
 */

export default {}; // Export empty object to make this a module
