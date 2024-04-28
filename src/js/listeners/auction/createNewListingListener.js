import {createNewListing} from "../../api/listings/createNewListing.js";
import {displayMessage} from "@/js/ui/common/displayMessage.js";

let mediaItems = []; // Array to hold all media items

function resetForm() {
    document.getElementById("createListingForm").reset();
    mediaItems = [];
    document.getElementById('mediaUrl').value = '';
    document.getElementById('mediaFile').value = '';
    updatePreview();
}

function clearMedia() {
    mediaItems = [];
    document.getElementById('mediaFile').value = '';
    updatePreview();
}

function removeMediaItem(index) {
    if (index > -1) {
        mediaItems.splice(index, 1);
        updatePreview();
    }
}

function getFormData(form) {
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const endsAt = new Date(formData.get("endsAt"));
    const tags = formData.get("tags").split(", ").filter(x => x);
    return {title, description, endsAt, media: mediaItems, tags};
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
        console.log('Server Response:', response);
        displayMessage('success', 'Listing created successfully! Redirecting to profile...');
        setTimeout(() => {
            location.href = "../../pages/profile/index.html";
        }, 3000);
    } catch (e) {
        console.error(e);
        displayMessage('danger', `Failed to create listing: ${e.message}`);
    }
}

function updatePreview() {
    const preview = document.getElementById('preview');
    preview.innerHTML = '';

    mediaItems.forEach((item, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-thumbnail', 'col-3', 'position-relative', 'm-2');

        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'X';
        removeBtn.classList.add('btn', 'btn-danger', 'position-absolute', 'top-0', 'right-0');
        removeBtn.onclick = () => removeMediaItem(index);

        const img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = 'auto';
        if (typeof item === 'string') {
            img.src = item;
            img.onerror = function () {
                img.src = "https://via.placeholder.com/150?text=Invalid+URL";
            };
        } else {
            img.src = URL.createObjectURL(item);
            img.onload = function () {
                URL.revokeObjectURL(img.src);
            };
        }

        imgContainer.appendChild(img);
        imgContainer.appendChild(removeBtn);
        preview.appendChild(imgContainer);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const mediaUrlInput = document.getElementById('mediaUrl');
    const mediaFileInput = document.getElementById('mediaFile');
    const form = document.getElementById('createListingForm');
    const resetButton = document.getElementById('resetButton');
    const clearMediaButton = document.getElementById('clearMediaButton');

    if (mediaUrlInput && mediaFileInput && form && resetButton && clearMediaButton) {
        mediaUrlInput.addEventListener('input', function (event) {
            const url = event.target.value.trim();
            if (url && !mediaItems.includes(url)) {
                mediaItems.push(url);
                updatePreview();
            }
        });

        mediaFileInput.addEventListener('change', function (event) {
            if (event.target.files.length) {
                mediaItems.push(...event.target.files);
                updatePreview();
            }
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = getFormData(event.target);
            const listing = handleEmptyArrays(formData);
            await handleCreateListing(listing);
        });

        resetButton.addEventListener('click', resetForm);
        clearMediaButton.addEventListener('click', clearMedia);
    }
});
