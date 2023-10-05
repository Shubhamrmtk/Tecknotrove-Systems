const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
app.use(cors())

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
