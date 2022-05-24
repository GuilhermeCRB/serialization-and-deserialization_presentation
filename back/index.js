import express, { json } from "express";
import convert from "xml-js";
import cors from "cors";
import chalk from "chalk";
import YAML from "yaml";

const app = express();

app.use(json());
app.use(cors());

app.post("/xml-stringify", async (req, res) => {
    const obj = req.body;
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const objXML = convert.js2xml(obj, options);
    res.send(objXML);
});

app.post("/xml-parser", async (req, res) => {
    console.log(req.body)
    const { obj } = req.body;
    const options = {ignoreComment: true, alwaysChildren: true};
    const objJS = convert.xml2js(obj, options);
    res.send(objJS);
});

app.post("/json-stringify", async (req, res) => {
    const obj = req.body;
    const objJSON = JSON.stringify(obj);
    res.send({ obj: objJSON });
});

app.post("/json-parser", async (req, res) => {
    const { obj } = req.body;
    const objJS = JSON.parse(obj);
    res.send(objJS);
});

app.post("/yaml-stringify", async (req, res) => {
    const obj = req.body;
    const objYAML = YAML.stringify(obj);
    res.send(objYAML);
});

app.post("/yaml-parser", async (req, res) => {
    const { obj } = req.body;
    const objJS = YAML.parse(obj);
    res.send(objJS);
});

const port = 5000;
app.listen(port, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`)));