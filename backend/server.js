import express from "express";
import cors from "cors";
import { google } from "googleapis";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

app.post("/write", async (req, res) => {
  try {
    const { spreadsheetId, range, values } = req.body;

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values }
    });

    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/read", async (req, res) => {
  try {
    const { spreadsheetId, range } = req.body;

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    res.send(response.data.values);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
