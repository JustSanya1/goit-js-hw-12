import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { showLoader } from "./js/render-functions";
import { hideLoader } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";

const formEl = document.querySelector(".form");
const onSubmit = (e) => {
    e.preventDefault();
    clearGallery()
    let inputValue = formEl.elements["search-text"].value.trim();
    if (!inputValue){iziToast.error({
    title: 'Error',
    message: 'Input must not be empty',
    });
    } else {
        showLoader();
        getImagesByQuery(inputValue)
            .then(images => { hideLoader(); createGallery(images) })
            .catch(error => { hideLoader(); iziToast.error({ title: 'Error', message: error.message, }); })
}

}
formEl.addEventListener('submit', onSubmit)