import { execSync } from "child_process";
import chromeWebstoreUpload from "chrome-webstore-upload";
import fs from "fs";
import path from "path";

const webstore = chromeWebstoreUpload({
  extensionId: "akmcoplifijllnddnbfdeiilgikchmld",
  clientId:
    "210779765394-drsb7ip1nf73tuf1sr92cibi0hp03a09.apps.googleusercontent.com",
  clientSecret: "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",
  refreshToken:
    "1//09O09_JvWar9MCgYIARAAGAkSNwF-L9IrDDRPtbrLXE7Lfg_ExXufc47ZSuTDhnxWd726AWo7yYzId7DtyzLtYmVqyfd0706hGwg",
});

const zipFilePath = path.resolve(process.cwd(), "dist/package.zip");

async function publishExtension() {
  try {
    execSync("npm run build");

    execSync("zip -r dist/package.zip dist");

    const uploadResponse = await webstore.uploadExisting(
      fs.createReadStream(zipFilePath)
    );
    console.log("Upload Response:", uploadResponse);

    const publishResponse = await webstore.publish("default");
    console.log("Publish Response:", publishResponse);

    console.log("Extension published successfully!");
  } catch (error) {
    console.error("Error publishing extension:", error);
  }
}

publishExtension();
