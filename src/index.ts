import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { Expense } from "./types";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.DATABASE_URI!;

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

		// database collections
		const db = client.db("expense-tracker");
		const expensesCollection = db.collection<Expense>("expenses");

		// Create new Expensess & Send Success Message
		app.post("/api/expense", async (req: Request, res: Response) => {
			const expenseData: Expense = req.body;

			console.log(expenseData);

			const result = await expensesCollection.insertOne(expenseData);

			res.status(201).json({
				success: true,
				message: "Expense created successfully.",
				data: result,
			});
		});

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
	res.json({
		success: true,
		message: "Expense Tracking Server is Running!",
	});
});

app.listen(port, () => {
	console.log(`Expense Trackin app listening on port ${port}`);
});
