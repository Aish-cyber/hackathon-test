function interpretIssue(issue) {
    const text = (issue.title + " " + issue.body).toLowerCase()

    let targetFileMap = {
        'login': 'login.js',
        'signup': 'signup.js'
    }

    let targetFile;

    Object.keys(targetFileMap).forEach(fileType => {
        if(text.includes(fileType)) {
            targetFile = targetFileMap[fileType];
        }
    });

    if (!targetFile) {
        targetFile = "unknown";
    }

    return {
        issue: issue.title,
        suggestedFile: targetFile
    }
}

module.exports = { interpretIssue }