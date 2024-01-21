import { Octokit } from "octokit"
import fs from 'fs';
import { callGPTForCommits, callGPTForEmoji, callGPTForReadme } from "./openai";
import { generateDropdown, generateDropdowns, generateMarkdown } from "./markdown";

require('dotenv').config()

const octokit = new Octokit({auth: process.env.GH_TOKEN})

async function getRepos() {
    if (!process.env.GH_USER) throw new Error("GH_USER not set");
    const username = process.env.GH_USER
    const repos = await octokit.rest.repos.listForUser({
        username: username
    });
    return repos.data;
}

async function getCommits(repo: string, start: string, end: string) {
    if (!process.env.GH_USER) throw new Error("GH_USER not set");
    const username = process.env.GH_USER
    const commits = await octokit.rest.repos.listCommits({
        owner: username,
        repo: repo,
        since: start, // start of the time range
        until: end // end of the time range
        });
    return commits.data
}

function entryIntoString(key: string, value: string[]) {
    return `Repository name: ${key.split(",|", 3)[0]}
Repository description: ${key.split(",|", 3)[1]}
    
Commits:\n${value.join("\n")}\n`;
}


async function main() {
    const repos = await getRepos();
    const entries: { [key: string]: string[] } = {};

    for (const repo of repos) {
        try {
            const url = repo.html_url;
            const currTime = new Date();
            const prevTime = new Date(currTime.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days ago
            const commits = await getCommits(repo.name, prevTime.toISOString(), currTime.toISOString());
            const messages = commits.map(commit => commit.commit.message);
            const msgList: string[] = [];
            for (const msg of messages) {
                msgList.push(msg);
            }
            if (msgList.length > 0) {
                const repoString = `${repo.name},|${repo.description ?? ""},|${url}`;
                entries[repoString] = msgList;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sortedEntries = Object.entries(entries)
        .filter(([, value]) => value.length > 0)
        .sort(([, a], [, b]) => b.length - a.length)
        .slice(0, 5);

    const replies: { [name: string]: string } = {}

    for (const [key, value] of sortedEntries) {
        const entryString = entryIntoString(key, value);
        const reply = await callGPTForCommits(entryString) ?? "No recent commits in this repository"; // Await the callGPT function to resolve the promise
        const emoji = await callGPTForEmoji(key.split(",|", 3)[0]) ?? "";
        const readmeSummary = await callGPTForReadme(key.split(",|", 3)[1]) ?? "No readme file in this repository.";
        replies[key.split(",|")[0]] = generateDropdown(emoji + key.split(",|", 3)[0], readmeSummary, reply, key.split(",|", 3)[2]) ?? "No recent commits in this repository.";
    }
    fs.writeFileSync("README.md", generateMarkdown(generateDropdowns(replies)));
}
  
main();