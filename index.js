import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://leads-tracker-26c05-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);;
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const data = snapshot.val();
    const myLeads = Object.values(data);
    render(myLeads);
  } else {
    console.log("No data available");
  }
});

inputBtn.addEventListener("click", () => {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", () => {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});