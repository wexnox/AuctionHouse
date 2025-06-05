/**
 * Displays the application version in the designated element
 */


export function displayVersion() {
  const versionElement = document.getElementById('app-version');
  if (versionElement) {
    versionElement.textContent = `v${__APP_VERSION__}`;
  }
}
