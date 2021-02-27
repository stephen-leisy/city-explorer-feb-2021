
function myLocationFunction(someStuff) {
    return {
        'formatted_query': someStuff[0].display_name,
        'latitude': someStuff[0].lat,
        'longitude': someStuff[0].lon
    };
}
function myWeatherFunction(someWeatherDeets) {
    const formattedWeather = someWeatherDeets.data.map(weatherReport => {
        return {
            'forecast': weatherReport.weather.description,
            'time': new Date(weatherReport.ts * 1000).toDateString()
        };

    });
    const slicedWeather = formattedWeather.slice(0, 7);
    return slicedWeather;

}
function myReviewsFunction(someReviews) {
    const formattedReviews = someReviews.businesses.map(review => {
        return {
            'name': review.name,
            'image_url': review.image_url,
            'price': review.price,
            'rating': review.rating,
            'url': review.url

        };
    });
    const slicedReviews = formattedReviews.slice(0, 8);
    return slicedReviews;
}
module.exports = {
    myLocationFunction,
    myWeatherFunction,
    myReviewsFunction
}