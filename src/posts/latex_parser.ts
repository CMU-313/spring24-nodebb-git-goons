/**
 * Objective: parse a string to see if it is latex compatible
 */

export default function (content: string) {
    var revisedContent: string = content;
    var indices: Array<[number, number]> = [];

    const regexp1 = /\$\$.+\$\$/;
    const regexp2 = /\$\$/;

    var start: number = revisedContent.search(regexp1);

    while (start >= 0) {
        var end = (revisedContent.substring(start + 2).search(regexp2)) + start;

        var prefix = revisedContent.substring(0, start);
        var suffix = revisedContent.substring(end + 2);
        var newIdx: [number, number] = [start, end];

        indices.push(newIdx);

        revisedContent = prefix.concat(suffix.substring(2));

        start = revisedContent.search(regexp1);
    }
    return [indices, revisedContent];
}