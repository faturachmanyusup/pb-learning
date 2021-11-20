const fs = require('fs')
const { join } = require('path')
const summary = require('../coverage/coverage-summary.json')

const tempHTML = `
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Statements</th>
      <th>Branches</th>
      <th>Functions</th>
      <th>Lines</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span>All File</span></td>
      <td>${summary.total.statements.pct}%</td>
      <td>${summary.total.branches.pct}%</td>
      <td>${summary.total.functions.pct}%</td>
      <td>${summary.total.lines.pct}%</td>
    </tr>
  </tbody>
</table>
<br/>
`

const updateCoverage = () => {
  try {
    const coverageDir = join(__dirname, "../coverage/lcov-report/index.html")
    const target = join(__dirname, "../README.md")
    let coverage = fs.readFileSync(coverageDir, 'utf8').split("\n")
    const readme = fs.readFileSync(target, 'utf8').split("\n")

    const startCov = coverage.findIndex(text => text === `<table class="coverage-summary">`)
    const endCov = coverage.findIndex(text => text === `</table>`)

    const timeGenStart = coverage.findIndex(text => text.includes(`<div class='footer quiet pad2 space-top1 center small'>`))
    const timeGenEnd = timeGenStart + 5
    let timeGenerated = coverage.slice(timeGenStart, timeGenEnd).map(text => text.trim()).join('\n')

    coverage = coverage.slice(startCov, endCov + 1)

    let coverageText = ""

    coverage.map(text => {
      if (!text) return
      if (text.includes("td") && !text.includes("%") && !text.includes("href")) return
      if (text.includes("><") && !text.includes("href")) return

      coverageText = coverageText + text + "\n"
    })

    let a = coverageText.replace(/<a/g, "<span")
    let coverageTextClean = a.replace(/<\/a>/g, "</span>")

    const startEdit = readme.findIndex(text => text.includes("### Test Coverage"))

    let readmeText = ""

    readme.slice(0, startEdit + 1).map(text => {
      readmeText = readmeText + text + "\n"
    })

    const updatedReadme = readmeText + "\n" + tempHTML + "\n" + coverageTextClean + "\n" + timeGenerated

    fs.writeFileSync(target, updatedReadme)

    console.log(">>>  Success. README updated.")
  } catch (err) {
    console.log(err, "^^^^ ERROR WHILE UPDATE COVERAGE")
  }
}

updateCoverage()
