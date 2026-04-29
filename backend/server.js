const app = require("./app");

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
  console.log(`mongodb link: mongodb://127.0.0.1:27017/expense-tracker`);
});
