import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!",
		);
	} finally {
		// await client.close();1
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.json("Expense Trackin Server is Running!");
});

app.listen(port, () => {
	console.log(`Expense Trackin app listening on port ${port}`);
});
