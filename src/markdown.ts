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

![Image Alt Text](../out.jpg)

<br>

<p align="center">
📢 <strong>This README was automatically generated using <a href="https://github.com/lshaoqin/coolprofiles">coolprofiles</a>!</strong>
</p>
`;
}
