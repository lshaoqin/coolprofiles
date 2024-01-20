import { Octokit, App } from "octokit"
import fs from 'fs';

require('dotenv').config()

const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

async function getRepos() {
    const repos = await octokit.rest.repos.listForUser({
        username: "lshaoqin"
    });
    return repos.data.map(repo => ({ name: repo.name, description: repo.description }));
}

async function getCommits(repo: string, start: string, end: string) {
    const commits = await octokit.rest.repos.listCommits({
        owner: "lshaoqin",
        repo: repo,
        since: start, // start of the time range
        until: end // end of the time range
        });
    return commits.data
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

    fs.writeFile('output.txt', JSON.stringify(entries), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File written successfully');
        }
    });
}
  
main();