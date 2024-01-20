function generateDropdown(title: string, content: string) {
    return `
<details>
<summary>${title}</summary>
${content}
</details>
`;
}

export function generateDropdowns(entries: { [key: string]: string }) {
    let dropdowns = "";
    for (const [key, value] of Object.entries(entries)) {
        dropdowns += generateDropdown(key, value);
    }
    return dropdowns;
}

export function generateMarkdown(contributions: string) {
    return `
## Contributions in the past 3 months
${contributions}
This README was automatically generated using <a href="https://github.com/lshaoqin/coolprofiles>coolprofiles</a>!
`;
}
