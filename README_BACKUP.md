### coolprofiles

## What we do
Coolprofiles creates a *cool* README for your GitHub profile, so you can easily showcase to everyone what you've been up to recently.

## Setting up
1. Fork this repo and give it the same name as your GitHub username. 
❗ If the repository does not share your username, the README will not display on your profile.

2. Setup environment variables. Copy the environment variables from .env.sample and fill in your [GitHub personal access token](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [OpenAI key](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt), and GitHub username.
```
GH_TOKEN=(Change this to your GitHub personal access token)
OPENAI_API_KEY=(Change this to your OpenAI key)
GH_USER=(Change this to your GitHub username)
```

3. Allow GitHub Actions to write to your repository. Go to *Settings* -> *Actions* -> *General* -> *Workflow Permissions* -> Select *Read and write permissions*.

4. (Optional) Setup the credentials you will be pushing the commit with. Go to `build.yml` and change the lines
```
git config --global user.email "(Change this to your email)"
git config --global user.name "(Change this to your username)"
```
