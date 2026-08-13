import express from 'express';
const PORT = process.env.PORT ?? 8000;
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ status: "server is running fine" })
})
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);

})