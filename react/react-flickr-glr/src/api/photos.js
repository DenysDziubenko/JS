/*global fetch*/
// eslint-disable-next-line
var Fetch = require('whatwg-fetch'); // window.fetch polyfill

const rootUrl = 'https://api.flickr.com/services/rest/?text=';
const perPageUrl = "&per_page=48";
const pageUrl = "&page=1";
const methodUrl = "&method=flickr.photos.search";
const apiKeyUrl ='&api_key=API_KEY';
const formaCallBacktUrl = '&format=json&nojsoncallback=?';

function getPhotosFromApi(query) {

    return fetch(rootUrl + query + perPageUrl + pageUrl + methodUrl + apiKeyUrl + formaCallBacktUrl, {
            headers: {
            }
        })
        .then(function(response) {
            return response.json();
        });
}

function buildThumbnailUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_q.jpg';
}

function buildPhotoUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '.jpg';
}

function buildPhotoLargeUrl(photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_b.jpg';
}

export { getPhotosFromApi, buildThumbnailUrl, buildPhotoUrl, buildPhotoLargeUrl };
