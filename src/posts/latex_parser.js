"use strict";
/**
 * Objective: parse a string to see if it is latex compatible
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(content) {
    // content with LaTeX wrappers removed
    let revisedContent = content;
    // Indices in revisedContent that require LaTeX formatting
    const indices = [];
    // Regexp for identifying beginning of LaTeX wrapper
    const regexp1 = /\$\$.+\$\$/;
    // Regexp for identifying end of LaTeX wrapper
    const regexp2 = /\$\$/;
    // Index of beginning of LaTeX wrapper
    let start = revisedContent.search(regexp1);
    while (start >= 0) {
        // Index of end of LaTeX wrapper
        const end = (revisedContent.substring(start + 2).search(regexp2)) + (start + 2);
        const prefix = revisedContent.substring(0, start);
        const suffix = revisedContent.substring(end + 2);
        const intermediate = revisedContent.substring(start + 2, end);
        const newIdx = [start, start + intermediate.length];
        indices.push(newIdx);
        revisedContent = prefix + intermediate + suffix;
        start = revisedContent.search(regexp1);
    }
    return [indices, revisedContent];
}
exports.default = default_1;
