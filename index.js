/* 
Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
A Bootstrap styled table representing your choice of data.
A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.

Dnd Party Generator:
Table to include: name, race, class, alignment; example listed in first row
Functions to include
-add member and party (use class)
-buttons to create and delete
*/

class Member {
  constructor(name, race, classOfMember, alignment) {
    this.name = name;
    this.race = race;
    this.class = classOfMember;
    this.alignment = alignment;
  }
}

class Party {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.members = [];
  }

  addMember(member) {
    this.members.push(member);
  }

  deleteMember() {
    let index = this.members.indexOf(member);
    this.members.splice(index, 1);
  }
}

let parties = [];
let partyId = 0;

onClick("new-party", () => {
  parties.push(new Party(partyId++, getValue("new-party-name")));
  drawDOM();
});

function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener("click", action);
  return element;
}

function getValue(id) {
  return document.getElementById(id).value;
}

function drawDOM() {
  let partyDiv = document.getElementById("parties");
  clearElement(partyDiv);
  for (party of parties) {
    let table = createPartyTable(party);
    let title = document.createElement("h2");
    title.innerHTML = party.name;
    title.appendChild(createPartyDeleteButton(party));
    partyDiv.appendChild(title);
    partyDiv.appendChild(table);
    for (member of party.members) {
      createMemberRow(party, table, member);
    }
  }
}

function createMemberRow(party, table, member) {
  let row = table.insertRow(2);
  row.insertCell(0).innerHTML = member.name;
  row.insertCell(1).innerHTML = member.race;
  row.insertCell(2).innerHTML = member.classOfMember;
  row.insertCell(3).innerHTML = member.alignment;
  let actions = row.insertCell(4);
  actions.appendChild(createDeleteRowButton(party, member));
}

function createDeleteRowButton(party, member) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Delete";
  btn.onclick = () => {
    let index = party.members.indexOf(member);
    party.members.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createPartyDeleteButton(party) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Delete Party";
  btn.style.marginLeft = "1em";
  btn.onclick = () => {
    let index = parties.indexOf(party);
    parties.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createNewMemberButton(party) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.innerHTML = "Create";
  btn.onclick = () => {
    party.members.push(
      new Member(
        getValue(`name-input-${party.id}`),
        getValue(`race-input-${party.id}`),
        getValue(`classOfMember-input-${party.id}`),
        getValue(`alignment-input-${party.id}`)
      )
    );
    drawDOM();
  };
  return btn;
}

function createPartyTable(party) {
  let table = document.createElement("table");
  table.setAttribute("class", " table table-dark table-striped");
  let row = table.insertRow(0);
  let nameColumn = document.createElement("th");
  let raceColumn = document.createElement("th");
  let classOfMemberColumn = document.createElement("th");
  let alignmentColumn = document.createElement("th");
  nameColumn.innerHTML = "Name";
  raceColumn.innerHTML = "Race";
  classOfMemberColumn.innerHTML = "Class";
  alignmentColumn.innerHTML = "Alignment";
  row.appendChild(nameColumn);
  row.appendChild(raceColumn);
  row.appendChild(classOfMemberColumn);
  row.appendChild(alignmentColumn);
  let formRow = table.insertRow(1);
  let nameTh = document.createElement("th");
  let raceTh = document.createElement("th");
  let classOfMemberTh = document.createElement("th");
  let alignmentTh = document.createElement("th");
  let createTh = document.createElement("th");
  let nameInput = document.createElement("input");
  nameInput.setAttribute("id", `name-input-${party.id}`);
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("class", "form-control");
  let raceInput = document.createElement("input");
  raceInput.setAttribute("id", `race-input-${party.id}`);
  raceInput.setAttribute("type", "text");
  raceInput.setAttribute("class", "form-control");
  let classOfMemberInput = document.createElement("input");
  classOfMemberInput.setAttribute("id", `classOfMember-input-${party.id}`);
  classOfMemberInput.setAttribute("type", "text");
  classOfMemberInput.setAttribute("class", "form-control");
  let alignmentInput = document.createElement("input");
  alignmentInput.setAttribute("id", `alignment-input-${party.id}`);
  alignmentInput.setAttribute("type", "text");
  alignmentInput.setAttribute("class", "form-control");
  let newMemberButton = createNewMemberButton(party);
  nameTh.appendChild(nameInput);
  raceTh.appendChild(raceInput);
  classOfMemberTh.appendChild(classOfMemberInput);
  alignmentTh.appendChild(alignmentInput);
  createTh.appendChild(newMemberButton);
  formRow.appendChild(nameTh);
  formRow.appendChild(raceTh);
  formRow.appendChild(classOfMemberTh);
  formRow.appendChild(alignmentTh);
  formRow.appendChild(createTh);
  return table;
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
