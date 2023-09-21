export function renderListings(items) {
    const listingContainer = document.querySelector("#listingContainer");

    listingContainer.innerHTML = "";
    items.forEach((item) => {

        listingContainer.innerHTML += `

<div class="col">                   
    <div class="card p-2 m-2">
    <img class="" src="${item.media}" alt="${item.media}" />
        <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
            <p class="card-text">${item.description}</p>
            <p class="card-text">${item.tags}</p>
            <p class="card-text">${item._count.bids}</p>
        </div>
    </div>
</div>
    `;

    });

}


