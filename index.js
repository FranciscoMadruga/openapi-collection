const fs = require("fs");
const path = require("path");
const postmanToOpenApi = require("postman-to-openapi");

const postmanDir = "./postman";
const openApiDir = "./openapi";

async function convertPostmanCollectionToOpenApiSpec(inputFile, outputFile) {
  try {
    await postmanToOpenApi(inputFile, outputFile, {
      defaultTag: "General",
    });
  } catch (err) {
    console.error(`Error converting ${inputFile}, to the OpenApi`, err);
  }
}

function convertManyPostmanCollectionsToOpenApiSpec(postmanDir, openApiDir) {
  fs.readdirSync(postmanDir).forEach(async (file) => {
    const inputFile = path.join(postmanDir, file);
    const outputFile = path
      .join(openApiDir, file)
      .replace(".postman_collection.json", ".yml");
    await convertPostmanCollectionToOpenApiSpec(inputFile, outputFile);
  });
}

if (fs.existsSync(openApiDir)) {
  convertManyPostmanCollectionsToOpenApiSpec(postmanDir, openApiDir);
} else {
  fs.mkdirSync(openApiDir);
  convertManyPostmanCollectionsToOpenApiSpec(postmanDir, openApiDir);
}
