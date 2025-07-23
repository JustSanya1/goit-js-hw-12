import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { showLoader } from "./js/render-functions";
import { hideLoader } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";
import { showLoadMoreButton } from "./js/render-functions";
import { hideLoadMoreButton } from "./js/render-functions";

let page;
let inputValue;
const formEl = document.querySelector(".form");
const buttonLoadEl = document.querySelector(".load-more-button")

const onSubmit = async (e) => {
    e.preventDefault(); 
    clearGallery()
    hideLoadMoreButton();

    inputValue = formEl.elements["search-text"].value.trim();
    page = 1;

    if (!inputValue){iziToast.error({
        title: 'Error',
        message: 'Input must not be empty',
    });
    } else {
        showLoader();
        try {
            let images = await getImagesByQuery(inputValue,page);
            hideLoader();
            createGallery(images.hits);

            if (page * 15 < images.totalHits) {
                showLoadMoreButton();
            } else {
                iziToast.info({
                    title: 'Hello',
                    message: `We're sorry, but you've reached the end of search results!`,});
            };
            
        } catch (error) {
            hideLoader();
            iziToast.error({ title: 'Error', message: error.message, });
        }

}

}
formEl.addEventListener('submit', onSubmit)


const onClick = async (e) => {
    hideLoadMoreButton();
    showLoader();
    page += 1;

        try {
            let images = await getImagesByQuery(inputValue, page);
            hideLoader();
            createGallery(images.hits);


            const liEl = document.querySelector('.gallery-li');
            const liHeight = liEl.getBoundingClientRect().height;
            scrollBy({
            top: liHeight * 2 + 24,
                behavior: 'smooth'
            });

            if (page * 15 < images.totalHits) {
                showLoadMoreButton();
            } else {
                iziToast.info({
                    title: 'Hello',
                    message: `We're sorry, but you've reached the end of search results!`});
            };

        } catch (error) {
            hideLoader();
            iziToast.error({ title: 'Error', message: error.message, });
        }
};
buttonLoadEl.addEventListener('click', onClick);