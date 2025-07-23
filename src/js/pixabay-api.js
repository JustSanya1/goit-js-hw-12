import axios from 'axios';

export async function getImagesByQuery(query, page) {

    const searchParams = new URLSearchParams({
        key: "51438211-e30b649eb0e533720cd6e7900",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: page,
    });


    try {
        let imgRequest = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        if (imgRequest.data.hits.length === 0) {
            throw new Error('Sorry, there are no images matching your search query. Please try again!')
        }
        return imgRequest.data;
    } catch (error) {
        throw error;
    }
    };