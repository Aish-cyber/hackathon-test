const axios = require("axios")

async function getIssues() {

    const response = await axios.get(
        `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/issues`,
        {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        }
    )

    return response.data
}

module.exports = { getIssues }