require("dotenv").config()

const express = require("express")
const { getIssues } = require("./services/issueReader")
const { interpretIssue } = require("./services/issueInterpreter")
const { generateCodeFix } = require("./services/codeGenerator")
const { createPR } = require("./services/prCreator")

const app = express()

app.get("/", (req,res)=>{
    res.send("Issue → PR system running")
})

app.get("/issues", async (req,res)=>{

    const issues = await getIssues()

    const simplified = issues.map(issue => ({
        number: issue.number,
        title: issue.title,
        body: issue.body
    }))

    res.json(simplified)

})

app.get("/analyze", async (req,res)=>{

    const issues = await getIssues()

    const result = interpretIssue(issues[0])

    res.json(result)

})

app.get("/generate-fix", async (req,res)=>{

    const issues = await getIssues()

    const analysis = interpretIssue(issues[0])

    const fix = generateCodeFix(analysis)

    res.json({
        issue: analysis.issue,
        file: analysis.suggestedFile,
        generatedFix: fix
    })

})

app.get("/create-pr", async (req,res)=>{

    try{

        const pr = await createPR()

        res.json({
            message: "Pull Request created",
            prUrl: pr.html_url
        })

    }catch(error){

        console.error(error)

        res.send("PR creation failed")

    }

})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})