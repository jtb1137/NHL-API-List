// Constants
const teamsPerPage = 10;

// State object
let state = {
  currentPage: 1,
  error: '',
  teams: [],
};

// Main Render Method
const render = () => {
  const listElement = document.querySelector('#list');

  updateActionButtons();
  updatePaginationButtons();

  if (!listElement) return null;

  listElement.innerHTML = renderList();
};

// Render individual list items
const renderListItem = (team) => {
  const { conference, division, name, venue } = team;

  if (!name) return null;

  return `<li>
        <h3>${team.name}</h3>
        <ul>
          <li>Conference: ${conference.name}</li>
          <li>Division: ${division.name}</li>
          <li>Venue: ${venue.name}</li>
        </ul>
    </li>`;
};

// Render the list items
const renderList = () => {
  const { teams } = state;

  if (teams.length) {
    const renderTeams = paginateList();

    const listItems = renderTeams.map((team) => renderListItem(team));

    return `<ul>${listItems.join('')}</ul>`;
  }
  return '<p>This list is empty! Click the "Get Teams!" button!</p>';
};

// Get teams using fetch
const getTeams = () => {
  // TODO: retrieve subsection of teams per API call
  fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then((response) => response.json())
    .then((data) => {
      state.teams = data.teams;
      render();
    })
    // TODO: Render Error
    .catch((error) => (state.error = error));
};

// Sorting
const sortNames = () => {
  const { teams } = state;

  teams.sort((a, b) => a.name.localeCompare(b.name));

  render();
};

const updateActionButtons = () => {
  const { teams } = state;

  const sortBtn = document.querySelector('#sortNames');

  sortBtn.disabled = false;

  if (!teams.length) {
    sortBtn.disabled = true;
  }
};

// Pagination Methods
const pageCount = () => {
  const { teams } = state;
  return Math.ceil(teams.length / teamsPerPage);
};

// Determine items to render from teams array
const paginateList = () => {
  const { currentPage, teams } = state;

  const start = (currentPage - 1) * teamsPerPage;
  const end = start + teamsPerPage;

  return teams.slice(start, end);
};

// When to disable pagination buttons
updatePaginationButtons = () => {
  const { currentPage, teams } = state;

  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');

  previous.disabled = false;
  next.disabled = false;

  if (currentPage === 1) {
    previous.disabled = true;
  }

  if (currentPage === pageCount()) {
    next.disabled = true;
  }

  if (!teams.length) {
    previous.disabled = true;
    next.disabled = true;
  }
};

const nextPage = () => {
  let { currentPage } = state;

  if (currentPage < pageCount()) {
    state.currentPage += 1;
    render();
  }
};

const prevPage = () => {
  const { currentPage } = state;

  if (currentPage - 1 > 0) {
    state.currentPage -= 1;
    render();
  }
};

// Event Listeners
document.querySelector('#getTeams').addEventListener('click', getTeams);
document.querySelector('#sortNames').addEventListener('click', sortNames);
document.querySelector('#previous').addEventListener('click', prevPage);
document.querySelector('#next').addEventListener('click', nextPage);

// Render Methods
render();
