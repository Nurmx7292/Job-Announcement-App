require("dotenv").config();
const express = require("express");
const connectToDB = require("./db/db");
const authRoute = require("./routes/auth-route");
const jobRoute = require("./routes/job-route");
const applicationRoute = require("./routes/application-route");

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
