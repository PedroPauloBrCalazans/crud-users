import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 7474;

app.listen(port, () => console.log(`Subiu na porta ${port}!`));
