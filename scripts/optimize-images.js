const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");

const INPUT_DIR = "./public/images";

const formats = [
  { ext: "avif", options: { quality: 55 } },
  { ext: "webp", options: { quality: 75 } },
];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  for (const format of formats) {
    const outputPath = `${dir}/${name}.${format.ext}`;

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭ Skipping existing ${outputPath}`);
      continue;
    }

    try {
      await sharp(filePath)
        .toFormat(format.ext, format.options)
        .toFile(outputPath);

      console.log(`✔ Generated ${outputPath}`);
    } catch (err) {
      console.error(`Error converting ${filePath}`, err);
    }
  }
}

async function run() {
  const files = glob.sync(`${INPUT_DIR}/**/*.{jpg,jpeg,png}`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log("Image optimization complete.");
}

run();
