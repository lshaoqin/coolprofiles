# coolprofiles

## What we do
Coolprofiles creates a *cool* README for your GitHub profile, so you can easily showcase to everyone what you've been up to recently. Our mission is simple: inject some fun into the often mundane world of managing GitHub profiles. Why settle for a standard profile when you can have one that reflects more than just your code contributions? 

### How Does it Work?
1. GitHub Repository Transformation: CoolProfiles dives into your GitHub repository and forks it to create a unique and whimsical summary of your most recent commits from the past three months.

2. README.md Magic: But we don't stop there! We magically transform your repository's README.md file into an engaging summary that captures the essence of your project. Most importantly, this personal README will be automatically updated every month. 

3. Emoji Auto-Generation: The cherry on top is our emoji feature! Our system smartly auto-generates an emoji that perfectly matches the title of your GitHub repo. Imagine a repository named "SolarSystem" getting paired with a planet emoji, or "MusicBox" finding its rhythm with a musical note emoji. It's the perfect blend of functionality and frivolity.

4. Word Cloud Wonderland: And for the grand finale, we create a word cloud, a visual feast crafted from your repository titles, descriptions, commits, and pull requests.

### Why CoolProfiles?
This project isn't just about enhancing profiles; it's about bringing a smile, a chuckle, and maybe even a bewildered shake of the head. In a world obsessed with utility, we're here to celebrate the joy of the beautifully useless. Join us in this playful rebellion against the mundane – your GitHub profile will never be the same!




## Setting up
1. Fork this repo and give it the same name as your GitHub username.
* NOTE: If the repository does not share your username, the README will not display on your profile.

3. To allow GitHub Actions to write to your repository: Go to *Settings* -> *Actions* -> *General* -> *Workflow Permissions* -> Select *Read and write permissions*.

4. To add your environment variables: Go to *Settings* -> *Secrets and Variables* -> Under *Repository Secrets*, Click/Add a *New Repository Secret*

* Name your *New Secret* "ENV_FILE"

* Fill in the *Secrets* section with the following template and replace the respective fields with your [GitHub personal access token](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens), [OpenAI key](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt), and GitHub username. 
```
GH_TOKEN=(Change this to your GitHub personal access token)
OPENAI_API_KEY=(Change this to your OpenAI key)
GH_USER=(Change this to your GitHub username)
```
Example:
```
GH_TOKEN=WJd3rnf8snvSDdNs93rnv5ny9cdJHKndgNjgdk
OPENAI_API_KEY=sk-S7nVFDJIYdnhNFjmndDShmsjfuBF933nDUFhjkda
GH_USER=username
```
<img width="560" alt="image" src="https://github.com/lshaoqin/coolprofiles/assets/103313573/bc4543c1-88fa-4400-ac85-18b50b4b2cb9">

4. Go to *Actions* -> Click *I understand my workflows, go ahead and enable them*
<img width="560" alt="image" src="https://github.com/lshaoqin/coolprofiles/assets/103313573/6eba231f-ef94-4efb-a96f-38d1d376c938">

5. Go to *Profile README* -> click *Enable Workflow*
<img width="560" alt="image" src="https://github.com/lshaoqin/coolprofiles/assets/103313573/df414e1b-cd6a-4887-9c0c-a4ba5b50e306">

6. Once enabled, click *Run workflow*
<img width="560" alt="image" src="https://github.com/lshaoqin/coolprofiles/assets/103313573/a8cbd18d-95c9-414f-a0a1-301fcca8fe58">

7. (Optional) Setup the credentials you will be pushing the commit with. Go to `build.yml` and change the lines
```
git config --global user.email "(Change this to your email)"
git config --global user.name "(Change this to your username)"
```
