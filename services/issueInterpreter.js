function interpretIssue(issue){

    const text = (issue.title + " " + issue.body).toLowerCase()

    let targetFile = "unknown"

    if(text.includes("login")){
        targetFile = "login.js"
    }

    if(text.includes("signup")){
        targetFile = "signup.js"
    }

    return {
        issue: issue.title,
        suggestedFile: targetFile
    }
}

module.exports = { interpretIssue }