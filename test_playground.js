
const CSVtoJSON = require('csvtojson')
const fs = require('fs')
const reviewData = require('./reviewData.json')


getReview = async(query) => {
    if (isNaN(query)){
        for(var i=0 ; i<reviewData.length; i++){
            var reviewText = JSON.stringify(reviewData[i]) 
            if(reviewText.search(query) != -1){
                var reviewStr = reviewData[i]['reviewID;review']
            }
        }
    }
    else{
        var ID = parseInt(query) - 1
        var reviewStr = reviewData[ID]
        // for(var i=0 ; i<reviewData.length; i++){
        //     var reviewText = reviewData[i]['reviewID;review']
        //     reviewID = reviewText.substring(0, reviewText.indexOf(';'));
        //     if(reviewID == query){
        //         var reviewStr = reviewData[i]['reviewID;review']
        //     }
        // }
    }

    if(reviewStr == null){
        reviewStr = 'REVIEW NOT FOUND'
        return reviewStr
    }
    return reviewStr
}

//console.log(getReview('9000'))

// getReview = async (query) =>{
//     return CSVtoJSON().fromFile('./wongnai-corpus-master/review/review_dataset/test_file.csv')
//     .then(reviewData => {
//         if (isNaN(query)){
//             for(var i=0 ; i<reviewData.length; i++){
//                 var reviewText = reviewData[i]['reviewID;review']
//                 if(reviewText.search(query) != -1){
//                     var reviewStr = reviewData[i]['reviewID;review']
//                     reviewStr = reviewText.split(";").pop();
//                 }
//             }
//         }
//         else{
//             for(var i=0 ; i<reviewData.length; i++){
//                 var reviewText = reviewData[i]['reviewID;review']
//                 reviewID = reviewText.substring(0, reviewText.indexOf(';'));
//                 if(reviewID == query){
//                     var reviewStr = reviewData[i]['reviewID;review']
//                     reviewStr = reviewText.split(";").pop();
//                 }
//             }
//         }

//         if(reviewStr == null){
//             reviewStr = 'REVIEW NOT FOUND'
//             return reviewStr
//         }
//         return reviewStr
//     })
// }

// CSVtoJSON().fromFile('./wongnai-corpus-master/review/review_dataset/test_file.csv')
//     .then(reviewData => {
//        var data = JSON.stringify(reviewData)
//        fs.writeFile('data.json', data, function(err, result) {
//         if(err) console.log('error', err);
//       });
//     })


var str ="Brown cafe มาออกบู๊ตที่เซ็นทรัลเฟสติวัล ของ Fin market เลยมาลองทานไอติมมันม่วงตามกระแสค่ะ ต้องบอกว่าร้านนี้ถือเป็นร้านยอดฮิตเลย เพราะคนเยอะมาก ต้องเอาคิวด้วย ได้ทานแล้วก็อร่อยดี ราคาถ้วยละ 89 บาท ???? เมนูเครื่องดื่มก็มีคนสั่งเยอะ"
var query = "ไอติมมันม่วง"
indexOfQuery = str.indexOf('ไอติมมันม่วง')
var openKeyword = "<keyword>"
var closeKeyword = "</keyword>"

var queryLength = query.length
queryLength = parseInt(queryLength)

var AddOpenKeyword = [str.slice(0,indexOfQuery),openKeyword,str.slice(indexOfQuery)].join('')
indexOfQueryClose = AddOpenKeyword.indexOf('ไอติมมันม่วง')+queryLength

var AddCloseKeyword = [AddOpenKeyword.slice(0,indexOfQueryClose),closeKeyword,AddOpenKeyword.slice(indexOfQueryClose)].join('')
var reviewText = AddCloseKeyword

console.log(queryLength)
console.log(AddOpenKeyword.indexOf('ไอติมมันม่วง'))
console.log(reviewText)