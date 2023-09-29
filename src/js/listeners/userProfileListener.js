import {getTokenFromStorage} from "../helpers/storage/index.js";
import {authFetch} from "../api/authHeader.js";
import {API_PROFILE_URL} from "../constants/constants.js";
import {updateAvatarListener} from "./updateAvatarListener.js";

const user = getTokenFromStorage("profile")
const userContainer = document.querySelector("#userContainer")

export async function fetchProfile() {

    try {

        const userName = user.name;
        const profileUserName = `${API_PROFILE_URL}/${userName}`;
        const method = "GET";


        const response = await authFetch(profileUserName, method)
        const resultJSON = await response.json();

        // TODO:styling, send to own file
        userContainer.innerHTML = " ";
        userContainer.innerHTML += `
        <div class="card mt-10 px-4 py-5 text-center p-3 mb-5" id="profile">
        <h1 class="text-center card-title">Your Profile</h1>
            <img class="d-block mx-auto mb-4 " src="${resultJSON.avatar}" alt="avatar" width="100" height="100">
            <h1 class="">${resultJSON.name}</h1>
            <div class="col-lg-6 mx-auto">
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <ul class="list-group list-group-flush">
                <li class="mb-4 list-group-item">Credits: ${resultJSON.credits} </li>
                <li class="mb-4 list-group-item">Wining bids: ${resultJSON.wins.length} </li>
                <li class="mb-4 list-group-item">Listings: ${resultJSON._count.listings}</li>
            </ul>
            <button type="button" class="btn btn-sm btn-outline-info px-4"><a href="../../listings/create/index.html">Create Listing</a></button>
        </div>

                             
      </div>
    </div>
</div>`;

    } catch (e) {
        console.log(e)


    }

}

