const express = require("express");


const app = express();
const port = 5000;

// Middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/search", require("./routes/search.routes"));
app.use("/course", require("./routes/course.routes"));
app.use("/department", require("./routes/department.routes"));
app.use("/professor", require("./routes/professor.routes"));
app.use("/program", require("./routes/program.routes"));

// Start server
app.listen(port, () => console.log("App : ok!"));

// Server crash
app.on('close', () => {

});
