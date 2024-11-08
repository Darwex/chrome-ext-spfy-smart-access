const chokidar = require("chokidar");
const { exec } = require("child_process");

// Watch for changes in the src directory
chokidar
  .watch(["src", "public"], {
    ignored: /node_modules|\.git/,
    persistent: true,
  })
  .on("change", (path) => {
    console.log(`File ${path} has been changed. Rebuilding...`);
    buildProject();
  });

function buildProject() {
  exec("npm run build", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error during build: ${stderr}`);
      return;
    }
    console.log(`Build output: ${stdout}`);
  });
}
