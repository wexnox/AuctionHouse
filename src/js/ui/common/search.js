import {renderItems} from "./renderListings.js";

const isPostMatch = (post, searchValues) =>
    post.title.toLowerCase().includes(searchValues)
    || post.seller.name.toLowerCase().includes(searchValues);

export function searchPosts(posts) {
    const searchBar = document.querySelector("#searchBar");

    searchBar.onkeyup = function (event) {
        const searchValues = event.target.value.trim().toLowerCase();
        const filteredPosts = posts.filter(post => isPostMatch(post, searchValues));
        renderItems(filteredPosts);
    };
}