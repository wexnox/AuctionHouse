import {placeBidOnItem} from "../../api/listings/placeBid.js";
import {Modal} from "bootstrap";

export async function placeBidListener() {
    const form = document.querySelector("#bidForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const bidAmountInput = document.querySelector("#bidAmount"); // Get the bid amount input
            const bidAmount = bidAmountInput.value; // Get the value of the input

            const params = new URLSearchParams(window.location.search); // Get URL parameters
            const itemId = params.get("id"); // Get the item ID from the URL parameters

            if (itemId && bidAmount) {
                try {
                    await placeBidOnItem(itemId, Number(bidAmount)) // Call the function to place a bid

                    // hide the modal after updating the avatar
                    const modalElement = document.getElementById('placeBidModal');
                    if (modalElement) {
                        const updateAvatarModal = new Modal(modalElement);
                        updateAvatarModal.hide();
                    }
                    console.log("Bid placed successfully");
                } catch (error) {
                    console.error("Error placing bid:", error)
                }

            }
        })
    }
}