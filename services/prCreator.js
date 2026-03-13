const simpleGit = require("simple-git")
const axios = require("axios")

const git = simpleGit()

async function createPR(){

    const branchName = "auto-fix-" + Date.now()

    await git.checkoutLocalBranch(branchName)

    await git.add("./*")

    await git.commit("Auto fix: added email validation")

    await git.push("origin", branchName)

const pr = await axios.post(
 `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/pulls`,
 {
   title: "Auto Fix: Email validation",
   head: branchName,
   base: "main",
   body: "Automatically generated fix"
 },
 {
   headers:{
     Authorization:`token ${process.env.GITHUB_TOKEN}`
   }
 }
)

    return pr.data
}

module.exports = { createPR }