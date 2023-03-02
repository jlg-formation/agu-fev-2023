const fs = require("fs").promises;

const main = async () => {
  console.log("xxx");
  try {
    const files = await fs.readdir(".");
    console.log("files: ", files);

    const content = await fs.readFile(files[0], { encoding: "utf-8" });
    console.log("content: ", content);
  } catch (err) {
    console.log("err: ", err);
  }
};

(async () => {
  await main();
  console.log("fin");
})();
