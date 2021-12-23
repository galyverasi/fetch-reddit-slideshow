const requestURL = 'https://www.reddit.com/search.json?q='
let resultIndex = 0
document.addEventListener('DOMContentLoaded', () => {
    // hide slideshow
    slideshow.style.display = 'none'
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // fetch data from reddit
        // fetchRedditData()
        const searchTerm = userInput.value.replaceAll(' ', '+')
        fetch(`http://www.reddit.com/search.json?q=${searchTerm}&limit=100&raw_json=1`)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                // do whatever we need to do with the data
                // console.log(jsonData)
                // the array of search results
                const resultsArray = jsonData.data.children
                // console.log(resultsArray[0].data.url)
                const imgURLs = resultsArray.map((resultObj) => {
                    if (resultObj.data.preview) {
                        return resultObj.data.preview.images[0].source.url
                    } else {
                        return 'no preview image'
                    }
                })
                const filteredURLs = imgURLs.filter((url) => {
                    if (url === 'no preview image') {
                        return false
                    } else {
                        return true
                    }
                })
                for (let i = 0; i < filteredURLs.length; i++) {
                    // create a new img element
                    let redditPhoto = document.createElement("img")
                    // add the src from array
                    redditPhoto.setAttribute('src', imgURLs[i])
                    // append img to dom
                    testImagesList.appendChild(redditPhoto)

                        // const changeSrc = () => {
                        //     if (resultIndex<filteredURLs.length){
                        //         slideshow.setAttribute('src', filteredURLs[resultIndex])
                        //         resultIndex++
                        //     } else {
                        //         resultIndex=0
                        //     }
                        // }
                        // changeSrc()
                        // slideshow.style.display = "block"
                        // const changeSlide = setInterval(changeSrc, 3000)
                }
            })
                        .catch((error) => {
                            console.log('Error retrieving data from reddit:')
                            console.log(error)
                        })
                })
})