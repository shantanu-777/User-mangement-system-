const userList = [];

const countryList = [
  { name: 'USA', states: ['California', 'Texas', 'Florida'] },
  { name: 'Canada', states: ['Ontario', 'Quebec', 'Alberta'] },
  { name: 'Mexico', states: ['Jalisco', 'Nuevo León', 'Veracruz'] }
];

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const genderSelect = document.getElementById('gender');
const hobbyInput = document.getElementById('hobby');
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');
const addUserButton = document.getElementById('addUser');
const updateUserButton = document.getElementById('updateUser');
const userListDiv = document.getElementById('userList');

function populateStates(country) {
  const countryObject = countryList.find(c => c.name === country);
  const states = countryObject.states;
  while (stateSelect.firstChild) {
    stateSelect.removeChild(stateSelect.firstChild);
  }
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}

function populateCities(state) {
  const cities = ['City A', 'City B', 'City C']; // Replace with actual data
  while (citySelect.firstChild) {
    citySelect.removeChild(citySelect.firstChild);
  }
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function renderUserList() {
  userListDiv.innerHTML = '';
  if (userList.length === 0) {
    userListDiv.innerHTML = '<p>No users found</p>';
    return;
  }
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ['Full Name', 'Email', 'Date of Birth', 'Gender', 'Hobby', 'Country', 'State', 'City', 'Actions'];
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);
  userList.forEach((user, index) => {
    const row = document.createElement('tr');
    const fullName = document.createElement('td');
    fullName.textContent = user.fullName;
    row.appendChild(fullName);
    const email = document.createElement('td');
    email.textContent = user.email;
    row.appendChild(email);
    const dateOfBirth = document.createElement('td');
    dateOfBirth.textContent = user.dateOfBirth;
    row.appendChild(dateOfBirth);
    const gender = document.createElement('td');
    gender.textContent = user.gender;
    row.appendChild(gender);
    const hobby = document.createElement('td');
    hobby.textContent = user.hobby;
    row.appendChild(hobby);
    const country = document.createElement('td');
    country.textContent = user.country;
    row.appendChild(country);
    const state = document.createElement('td');
    state.textContent = user.state;
    row.appendChild(state);
    const city = document.createElement('td');
    city.textContent = user.city;
    row.appendChild(city);
    const actions = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editUser(index);
    });
    actions.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => {
        deleteUser(index);
      });
      actions.appendChild(deleteButton);
      row.appendChild(actions);
      table.appendChild(row);
    });
    userListDiv.appendChild(table);
  }

  function addUser() {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const dateOfBirth = dateOfBirthInput.value.trim();
    const gender = genderSelect.value;
    const hobby = hobbyInput.value.trim();
    const country = countrySelect.value;
    const state = stateSelect.value;
    const city = citySelect.value;
    const user = {
      fullName,
      email,
      dateOfBirth,
      gender,
      hobby,
      country,
      state,
      city
    };
    userList.push(user);
    resetForm();
    renderUserList();
  }

  function editUser(index) {
    const user = userList[index];
    fullNameInput.value = user.fullName;
    emailInput.value = user.email;
    dateOfBirthInput.value = user.dateOfBirth;
    genderSelect.value = user.gender;
    hobbyInput.value = user.hobby;
    countrySelect.value = user.country;
    populateStates(user.country);
    stateSelect.value = user.state;
    populateCities(user.state);
    citySelect.value = user.city;
    addUserButton.style.display = 'none';
    updateUserButton.style.display = 'inline-block';
    updateUserButton.setAttribute('data-index', index);
  }

  function updateUser() {
    const index = updateUserButton.getAttribute('data-index');
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const dateOfBirth = dateOfBirthInput.value.trim();
    const gender = genderSelect.value;
    const hobby = hobbyInput.value.trim();
    const country = countrySelect.value;
    const state = stateSelect.value;
    const city = citySelect.value;
    const user = {
      fullName,
      email,
      dateOfBirth,
      gender,
      hobby,
      country,
      state,
      city
    };
    userList[index] = user;
    resetForm();
    renderUserList();
    addUserButton.style.display = 'inline-block';
    updateUserButton.style.display = 'none';
  }

  function deleteUser(index) {
    userList.splice(index, 1);
    renderUserList();
  }

  function resetForm() {
    fullNameInput.value = '';
    emailInput.value = '';
    dateOfBirthInput.value = '';
    genderSelect.value = 'male';
    hobbyInput.value = '';
    countrySelect.value = '';
    stateSelect.innerHTML = '<option value="">Select state</option>';
    citySelect.innerHTML = '<option value="">Select city</option>';
  }

  countrySelect.addEventListener('change', () => {
    const country = countrySelect.value;
    populateStates(country);
  });

  stateSelect.addEventListener('change', () => {
    const state = stateSelect.value;
    populateCities(state);
  });

  addUserButton.addEventListener('click', () => {
    addUser();
  });

  updateUserButton.addEventListener('click', () => {
    updateUser();
  });
