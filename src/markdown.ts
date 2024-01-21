export function generateDropdown(title: string, readmeSummary: string, commitsSummary: string, url: string) {
    return `
<details>
<summary><strong>${title}</strong></summary>
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
## 🔨 I've been working on:
${contributions}

![Image Alt Text](../wordcloud/out.jpg)

This README was automatically generated using [coolprofiles](https://github.com/lshaoqin/coolprofiles)! Because of this, some of the information here may not be accurate - check out the repositories for yourself to find out more!
`;
}
