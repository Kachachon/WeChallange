const express = require('express')
const bodyParser = require('body-parser')
const reviewData = require('./reviewData')
const CSVtoJSON = require('csvtojson')
const path = require('path')
const ejs = require('ejs')
const methodOverride = require('method-override')
const router = express.Router()

//Get Review Data
getReview = async(query) => {
    if (isNaN(query)){
        for(var i=0 ; i<reviewData.length; i++){
            var reviewText = reviewData[i]['reviewID;review']
            if(reviewText.search(query) != -1){
                var reviewStr = reviewData[i]['reviewID;review']
                //reviewStr = reviewText.split(";").pop();
            }
        }
    }
    else{
        var ID = parseInt(query) - 1
        var reviewStr = reviewData[ID]['reviewID;review']
    }

    if(reviewStr == null){
        reviewStr = 'REVIEW NOT FOUND'
        return reviewStr
    }
    return reviewStr
}

const app = express()

app.set("view engine","ejs")
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/',(req,res) => {
    res.render("index")
})

//Get review by a specific ID
app.get('/reviews/id',(req,res) => {
    console.log(`Search by -ID- -> ${req.query.id}`)
    let ID = req.query.id
    var reviewData = getReview(ID)
    reviewData.then(function(result) {
        reviewText = result.split(";").pop();
        reviewID = result.substring(0, result.indexOf(';'));
        console.log(reviewText)
        res.render("showResult", {
            reviewText : reviewText,
            reviewID : reviewID
        })
    })
})

//Search for reviews by a query(Food Text)
app.get('/reviews',(req,res) => {
    console.log(`Search by -QUERY- -> ${req.query.query}`)
    let query = req.query.query
    //ไอติมมันม่วง
    var reviewData = getReview(query)

    reviewData.then(function(result) {
        reviewText = result.split(";").pop();
        reviewID = result.substring(0, result.indexOf(';'));

        indexOfQuery = reviewText.indexOf(query)
        var openKeyword = "<keyword>"
        var closeKeyword = "</keyword>"

        var queryLength = query.length
        queryLength = parseInt(queryLength)

        var AddOpenKeyword = [reviewText.slice(0,indexOfQuery),openKeyword,reviewText.slice(indexOfQuery)].join('')
        indexOfQueryClose = AddOpenKeyword.indexOf(query)+queryLength

        var AddCloseKeyword = [AddOpenKeyword.slice(0,indexOfQueryClose),closeKeyword,AddOpenKeyword.slice(indexOfQueryClose)].join('')
        var reviewText = AddCloseKeyword

        res.render("showResult", {
            reviewText : reviewText,
            reviewID: reviewID
        })
    })  
})

//Editing a review
app.put('/reviews/edit/:id',(req,res) => {
    console.log("EDIT CALLED",req.params.id)
    var editText = req.body.editText
    var ID = req.params.id
    res.json(Object.assign(reviewData[ID], editText))
})

app.listen(5555,() => {
    console.log('Start SERVER at port 5555')
})
