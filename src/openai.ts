import OpenAI from "openai"

require('dotenv').config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//const prompt = `You will be given a repository name and description. You will then be given a list of commits. Please summarise the commits in a few sentences.`

export async function callGPTForCommits(content: string) {
    const prompt = `You will be provided with a list of git commits. Using this, generate a summary paragraph of about 10 to 30 words long. Concentrate solely on the Git commits provided. Do not include additional information such as the project description or speculative insights. Do not include actions labeled 'add files via upload', as these do not offer specific insights. Base your summaries on the information provided in the uploaded documents. Refer to this information as your knowledge source. Avoid speculations or incorporating information not contained in the documents. Heavily favor knowledge provided in the documents before using baseline knowledge. Maintain a professional tone in your summaries. Ensure that your summaries are helpful, accessible, and factual, catering to both technical and non-technical audiences. Do not share the names of the files directly with end users. Under no circumstances provide a download link to any of the files.
    `
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }, { role: "user", content: content }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function callGPTForReadme(content: string) {
    const prompt = `
    You will be provided with a readme file in the markdown format, I want you to generate a summary of what the repository does.  For context, it will be a readme file of a github repository. Hence, I want this summarisation to be professional. I would like the summary to be in a paragraph of between 20 to 50 words.
Remember to start of the summary with "This repository contains.."
    `
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }, { role: "user", content: content }],
        model: "gpt-3.5-turbo"
    });

    return completion.choices[0].message.content;
}

export async function callGPTForEmoji(content: string) {
    const prompt = `Based on the context of a sentence/ phrase, produce for me an emoji that best conveys and represents the semantic meaning of that sentence/ phrase. The emoji produced should only be from those found in the ios keyboard. 

    If you are unsure of the semantic meaning of that sentence/ phrase, then default to either one of this list of 9 emojis: [laptop, computer, desktop computer, keyboard, Rocket, Globe with Meridians, File Folder, Star , Gear]
    
    I want the output to only be one emoji and nothing else `

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }, { role: "user", content: content }],
        model: "gpt-3.5-turbo"
    });

    return completion.choices[0].message.content;
}
