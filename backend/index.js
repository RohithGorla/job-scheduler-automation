const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const jobRoutes = require("./routes/jobRoutes");

app.use("/api", jobRoutes);

app.use(cors());
app.use(express.json());
app.listen(5000, ()=>console.log('Server running on 5000'));