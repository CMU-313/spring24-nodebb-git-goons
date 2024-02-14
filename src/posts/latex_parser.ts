/**
 * function : string -> (int * int) list * string            [SML]
 *          : string -> [Array<[number, number]>, string]    [TS]
 *          : string -> Tuple[List[Tuple[int, int]], string] [Python]
 */

export default function (content: string) {
    // Sanity Check
    console.assert(typeof content === 'string', 'Parse Error: Input must be of type string\n');

    // content with LaTeX wrappers removed
    let revisedContent: string = content;
    // Indices in revisedContent that require LaTeX formatting
    const indices: Array<[number, number]> = [];

    // Regexp for identifying beginning of LaTeX wrapper
    const regexp1 = /\$\$.+\$\$/;
    // Regexp for identifying end of LaTeX wrapper
    const regexp2 = /\$\$/;

    // Index of beginning of LaTeX wrapper
    let start: number = revisedContent.search(regexp1);

    while (start >= 0) {
        // Index of end of LaTeX wrapper
        const end: number = (revisedContent.substring(start + 2).search(regexp2)) + (start + 2);

        const prefix: string = revisedContent.substring(0, start);
        const suffix: string = revisedContent.substring(end + 2);
        const intermediate: string = revisedContent.substring(start + 2, end);

        const newIdx: [number, number] = [start, start + intermediate.length];

        indices.push(newIdx);

        revisedContent = prefix + intermediate + suffix;

        start = revisedContent.search(regexp1);
    }
    // Sanity Check
    console.assert(typeof indices === 'object',
        `Expected variable of type 'object' but got ${typeof indices} instead \n`);
    console.assert(typeof revisedContent === 'string',
        `Expected variable of type 'string' but got ${typeof revisedContent} instead \n`);

    return [indices, revisedContent];
}
