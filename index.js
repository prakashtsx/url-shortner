import express from 'express';
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ status: "server is running fine" })
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);

})