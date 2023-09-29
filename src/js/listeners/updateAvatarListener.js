import {getTokenFromStorage} from "../helpers/storage/index.js";
import {updateProfile} from "../api/profile/updateProfile.js";

export async function updateAvatarListener() {
    const form = document.querySelector('#updateAvatarForm')

    // const url = new URL(location.href)
    // const name = url.searchParams.get("name")

    if (form) {
        const {name, email, credits, avatar} = getTokenFromStorage("profile")
        form.name.value = name;
        form.email.value = email;
        form.credits.value = credits;
        form.avatar.value = avatar;

        // const profile = await getProfile(name);

        // form.avatar.value = profile.avatar

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries());

            profile.name = name
            profile.email = email
            profile.credits = credits
            profile.avatar = avatar

            updateProfile(profile);
        });
    }


}
