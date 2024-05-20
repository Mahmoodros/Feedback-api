import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
import app from './app.js'
const port =process.env.port||3000; 
dotenv.config();

// Connect to MongoDB
connect(process.env.mongo||"mongodb://127.0.0.1:27017/feedback_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
 
//Server Connection
app.listen(port, async() => {
  console.log();
  console.log(`Server is running on http://localhost:${port}`);
});
