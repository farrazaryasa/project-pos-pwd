const express = require('express')
const app = express()
const PORT = 3456
const cors = require('cors')

app.use(express.json())
app.use(cors())

//test application connection
app.get("/", (req, res) => {
    res.send({
        success : true,
        message : "pos system connection success",
        data : {}
    })
})

// app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log("server run on port : ", PORT);
})
