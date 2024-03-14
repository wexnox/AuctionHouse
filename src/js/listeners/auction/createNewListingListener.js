import {createNewListing} from "../../api/listings/createNewListing.js";

function getFormData(form) {
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const endsAt = new Date(formData.get("endsAt"));
    const media = formData.get("media").split(", ").filter(x => x);
    const tags = formData.get("tags").split(", ").filter(x => x);
    return {title, description, media, endsAt, tags};
}

function handleEmptyArrays(listing) {
    if (!listing.tags.length) {
        delete listing.tags;
    }
    if (!listing.media.length) {
        delete listing.media;
    }
    return listing;
}

async function handleCreateListing(listing) {
    try {
        const response = await createNewListing(listing);
        console.log('Server Response:', response); // Log the server response for debugging
        alert('Listing created successfully! Redirecting to profile...');
        setTimeout(() => {
            location.href = "../../profile/index.html"; // Redirect after showing the alert
        }, 3000); // Delay of 3 seconds for the user to read the message
    } catch (e) {
        console.error(e);
        // Added an alert to inform the user about the error
        alert(`Failed to create listing: ${e.message}`);
    }
}

export function createNewListingListener() {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("createListingForm");


        if (form) {
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = getFormData(event.target);
                const listing = handleEmptyArrays(formData);
                await handleCreateListing(listing);
            });
        }
    });
}