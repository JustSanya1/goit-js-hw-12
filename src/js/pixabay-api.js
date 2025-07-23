import axios from 'axios';
export function getImagesByQuery(query) {
    const searchParams = new URLSearchParams({
        key: "51438211-e30b649eb0e533720cd6e7900",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    return axios.get(`https://pixabay.com/api/?${searchParams}`).then(response => { 
        if (response.data.hits.length === 0) {
            throw new Error('Sorry, there are no images matching your search query. Please try again!')
        }
        return response.data.hits;
    })
};