const getReviewByID = () => {
    // console.log("CALLED")
    // const xhttp = new XMLHttpRequest()
    // xhttp.open("GET", `http://localhost:5555/review/${ID}`,false)
    // xhttp.send()

    // const reviewData = JSON.parse(xhttp.responseText)
    
    // document.getElementById('getReviewByID').action = `http://localhost:5555/review/${ID}`
    var action_src = "http://localhost:5555/reviews/" + document.getElementById("id").value
    var form = document.getElementById('getReviewByID')
    form.action = action_src
}

const getReviewByQuery = (query) => {

}

const EditReview = (id,editText) => {

}
