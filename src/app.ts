import { Octokit, App } from "octokit"

require('dotenv').config()

const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

async function getRepos() {
    const repos = await octokit.rest.repos.listForUser({
        username: "lshaoqin"
    });

    return repos.data.map(repo => repo.name);
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
    
    for (const repo of repos) {
        try {
            const commits = await getCommits(repo, "2023-12-01", "2023-12-31");
            const messages = commits.map(commit => commit.commit.message);
            console.log(messages);
        } catch (error) {
            console.log(error);
        }
    }
}
  
main();