
const funcUtils = {}


funcUtils.renderHome = () => {
  return /*html*/`
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Asset Management System Backend</title>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #eee;
      }
      main {
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 4em;
        box-shadow: 2px 5px 5px #ccc;
      }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>This site is just a template</h1>
        <p>To view the actual website visit <a href="https://wilsoft-gt.github.io/asset-management-front-byu/">Asset Management System</a></p>
      </section>
    </main>
  </body>
  </html>
  `
}


module.exports = funcUtils