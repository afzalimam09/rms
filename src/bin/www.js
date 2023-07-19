import app from "../app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
