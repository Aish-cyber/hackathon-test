function generateCodeFix(issueAnalysis){

    if(issueAnalysis.suggestedFile === "login.js"){
        return `// Added email validation
if(!email){
   return "Email is required"
}`
    }

    return "// No fix generated"

}

module.exports = { generateCodeFix }