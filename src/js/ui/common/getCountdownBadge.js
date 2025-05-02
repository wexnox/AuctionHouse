export function getCountdownBadge(endTime) {
  const now = new Date();
  const end = new Date(endTime);
  const timeLeft = end - now; // Time left in milliseconds

  // Classes for different time ranges
  let badgeClass = 'bg-success'; // Green by default
  let label = 'Ends in a long time';

  if (timeLeft <= 0) {
    badgeClass = 'bg-danger'; // Auction has ended
    label = 'Auction ended';
  } else if (timeLeft < 3600000) {
    // Time left < 1 hour
    badgeClass = 'bg-danger'; // Red
    label = 'Ending soon!';
  } else if (timeLeft < 86400000) {
    // Time left < 24 hours
    badgeClass = 'bg-warning text-dark'; // Yellow
    label = `Ends in ${Math.ceil(timeLeft / 3600000)} hours`;
  } else {
    // Time left > 24 hours
    badgeClass = 'bg-success'; // Green
    label = `Ends in ${Math.ceil(timeLeft / 86400000)} days`;
  }

  return `<span class="badge ${badgeClass}">${label}</span>`;
}
