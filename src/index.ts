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

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
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
			const result = await expensesCollection.insertOne(expenseData);

			res.status(201).json({
				success: true,
				message: "Expense created successfully.",
				data: result,
			});
		});

		// Update single expense data
		app.patch("/api/expense/:id", async (req: Request, res: Response) => {
			const id = req.params.id as string;

			const filter = {
				_id: new ObjectId(id),
			};

			const updatedData: Partial<Expense> = req.body;

			const result = await expensesCollection.updateOne(filter, {
				$set: updatedData,
			});

			res.status(200).json({
				success: true,
				message: "Expense edited successfully.",
				data: result,
			});
		});

		// Get all expenses with pagination, category filter, total expense amount, and pie chart summary
		app.get("/api/expense", async (req: Request, res: Response) => {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 6;
			const category = req.query.category as string | undefined;

			const skip = (page - 1) * limit;

			const filter: Partial<Expense> = {};

			if (category) {
				filter.category = category;
			}

			// Get expenses
			const expenses = await expensesCollection
				.find(filter)
				.sort({ _id: -1 })
				.skip(skip)
				.limit(limit)
				.toArray();

			// Count total expenses
			const totalExpenses =
				await expensesCollection.countDocuments(filter);

			// Calculate total expense amount
			const totalExpenseResult = await expensesCollection
				.aggregate([
					{
						$match: filter,
					},
					{
						$group: {
							_id: null,
							totalAmount: {
								$sum: "$amount",
							},
						},
					},
				])
				.toArray();

			const totalExpenseAmount = totalExpenseResult[0]?.totalAmount || 0;

			// Pie chart summary
			const categorySummary = await expensesCollection
				.aggregate([
					{
						$match: filter,
					},
					{
						$group: {
							_id: "$category",
							totalAmount: {
								$sum: "$amount",
							},
						},
					},
					{
						$project: {
							_id: 0,
							category: "$_id",
							totalAmount: 1,
						},
					},
				])
				.toArray();

			res.status(200).json({
				success: true,
				message: "Expenses fetched successfully.",
				data: {
					expenses,

					pagination: {
						currentPage: page,
						totalPages: Math.ceil(totalExpenses / limit),
						totalExpenses,
						limit,
					},

					summary: {
						totalExpenseAmount,
						categorySummary,
					},
				},
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
