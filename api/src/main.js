import express from "express"
import cors from "cors"
import data from "../payment.json" assert { type: 'json' };

const app = express()
app.use(cors())
app.use(express.json())

function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

app.get("/payments", async (req, res) => {
    let payments = data.items
    const searchText = req.query.search?.toLocaleLowerCase()
    const resultPaymentSearch = payments.filter(payment => searchText ? payment?.id?.toLowerCase().includes(searchText) : payment)
    if (req.query?.pageSize || req.query?.pageNumber) {
        payments = paginate(resultPaymentSearch, req.query?.pageSize, req.query?.pageNumber)
    }
    setTimeout(() => res.json(payments), payments.length * 25)
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})