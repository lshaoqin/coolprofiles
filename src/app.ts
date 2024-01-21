import { Octokit, App } from "octokit"
import fs from 'fs';
import callGPT from "./openai";
import { generateDropdowns, generateMarkdown } from "./markdown";

require('dotenv').config()

const octokit = new Octokit({auth: process.env.GH_TOKEN})

async function getRepos() {
    if (!process.env.GH_USER) throw new Error("GH_USER not set");
    const username = process.env.GH_USER
    const repos = await octokit.rest.repos.listForUser({
        username: username
    });
    return repos.data.map(repo => ({ name: repo.name, description: repo.description }));
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
    return `Repository name: ${key.split(",", 2)[0]}
Repository description: ${key.split(",", 2)[1]}
    
Commits:\n${value.join("\n")}\n`;
}

async function main() {
    const repos = await getRepos();
    const entries: { [key: string]: string[] } = {};

    for (const repo of repos) {
        try {
            const commits = await getCommits(repo.name, "2023-10-01", "2023-12-01");
            const messages = commits.map(commit => commit.commit.message);
            const msgList: string[] = [];
            for (const msg of messages) {
                msgList.push(msg);
            }
            if (msgList.length > 0) {
                const entryStr = `${repo.name}, ${repo.description}`;
                entries[entryStr] = msgList;
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
        const reply = await callGPT(entryString); // Await the callGPT function to resolve the promise
        replies[key.split(",")[0]] = reply ?? "No recent commits in this repository.";
    }
    console.log(generateMarkdown(generateDropdowns(replies)));
    fs.writeFileSync("README.md", generateMarkdown(generateDropdowns(replies)));
}
  
main();