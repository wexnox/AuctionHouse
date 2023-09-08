export default function displayMessage(type, message, target) {
    const container = document.querySelector(target);
    // TODO: fix error type. tailwind
    container.innerHTML = `
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 ${type}" role='alert'>${message}</div>`;
}
