export function generateDropdown(title: string, readmeSummary: string, commitsSummary: string, url: string) {
    return `
<details>
<summary>${title}</summary>
Link to repo: ${url}
<br/>
${readmeSummary}

---

${commitsSummary}
</details>
`;
}

export function generateDropdowns(entries: { [name: string]: string }) {
    let dropdowns = "";
    for (const [key, value] of Object.entries(entries)) {
        dropdowns += value;
    }
    return dropdowns;
}

export function generateMarkdown(contributions: string) {
    return `
## Contributions in the past 3 months
${contributions}

![Image Alt Text](../wordcloud/out.jpg)

This README was automatically generated using [coolprofiles](https://github.com/lshaoqin/coolprofiles)!
`;
}
