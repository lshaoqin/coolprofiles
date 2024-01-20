function generateDropdown(title: string, content: string) {
    return `
        <details>
            <summary>${title}</summary>
            <p>${content}</p>
        </details>
    `;
}

function generateDropdowns(entries: { [key: string]: string[] }) {
    let dropdowns = "";
    for (const [key, value] of Object.entries(entries)) {
        dropdowns += generateDropdown(key, value.join("\n"));
    }
    return dropdowns;
}

function generateMarkdown(contributions: string) {
    return `
    <div align="center">
        <h1>Contributions in the past 3 months</h1>
            ${contributions}
        This page was automatically generated using <a href="https://github.com/lshaoqin/coolprofiles>coolprofiles</a>.
    </div>
    `;
}
