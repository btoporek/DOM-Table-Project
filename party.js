/* 
Using HTML, Bootstrap, and JavaScript create a single page website that contains the following:
A Bootstrap styled table representing your choice of data.
A Bootstrap styled form that allows a user to add a new row to the table when clicking on submit.

Dnd Party Generator:
Table to include: name, race, class, alignment; example listed in first row?
Functions to include
-add member and party (use class)
-buttons to create and delete
*/

// class for each member of party to specify their details for the table
class Member {
  constructor(name, race, classOfMember, alignment) {
    this.name = name;
    this.race = race;
    this.classOfMember = classOfMember;
    this.alignment = alignment;
  }
}

// class for the party to include the id number, the name of the party, and an empty array to insert members added to it
class Party {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.members = [];
  }

  addMember(member) {
    this.members.push(member);
  } // function to add members into member array

  deleteMember() {
    let index = this.members.indexOf(member);
    this.members.splice(index, 1);
  } //function to remove members from member array
}

let parties = []; //empty party array
let partyId = 0; // party id to start at 0

//call onClick function
onClick("new-party", () => {
  //uses button id and function to push new Party class into empty parties array
  parties.push(new Party(partyId++, getValue("new-party-name"))); //increments their ID number and retrieves the value inputted for the party name
  drawDOM(); //calls drawDOM function
});

//created function to say what happens on button click
function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener("click", action);
  return element;
}

//function to return the values inputted
function getValue(id) {
  return document.getElementById(id).value;
}

function drawDOM() {
  let partyDiv = document.getElementById("parties"); // assigns variable to select div
  clearElement(partyDiv); //clears the div
  for (party of parties) {
    //loops through div
    let table = createPartyTable(party); //assigns variable to createPartyTable function
    let title = document.createElement("h2"); //assigns variable to creating header 2 element
    title.innerHTML = party.name; //uses dot notation to state title name of party inputted
    title.appendChild(createPartyDeleteButton(party)); //uses dot notation to attach party delete button function
    partyDiv.appendChild(title); //dot notation to use title variable/element created
    partyDiv.appendChild(table); //dot notation to use table variable/createPartyTable function
    for (member of party.members) {
      //loops through members inserted into party members array
      createMemberRow(party, table, member); //calls createMemberRow function with parameters (party from loop, table from variable, member from  loop)
    }
  }
}

//function to add row to table with member information pulled from drawDOM function
function createMemberRow(party, table, member) {
  let row = table.insertRow(2); //inserts tow in position 2
  row.insertCell(0).innerHTML = member.name; //inserts value to first cell using member's inputted name value
  row.insertCell(1).innerHTML = member.race; //inserts value to second cell using member's inputted race value
  row.insertCell(2).innerHTML = member.classOfMember; //inserts value to third cell using member's inputted DnD class value
  row.insertCell(3).innerHTML = member.alignment; //inserts value to fourth cell using member's inputted alignment value
  let actions = row.insertCell(4); //assigns variable for future action to the fifth cell in the row
  actions.appendChild(createDeleteRowButton(party, member)); //designates action to be adding the delete row button using function
}

//function to delete a row of member information values
function createDeleteRowButton(party, member) {
  let btn = document.createElement("button"); //assigned variable to create a button
  btn.className = "btn btn-primary"; //assigns class styling to be primary
  btn.innerHTML = "Delete"; //assigns name of button to be Delete
  btn.onclick = () => {
    //function to tell button what to do on click
    let index = party.members.indexOf(member); // loops through to find index of party member
    party.members.splice(index, 1); //removes 1 member index
    drawDOM(); //calls drawDOM function
  };
  return btn; //returns the created button
}

//function to create the party delete button
function createPartyDeleteButton(party) {
  let btn = document.createElement("button"); //assigns variable to create button
  btn.className = "btn btn-primary"; //assigns class styling to be primary
  btn.innerHTML = "Delete Party"; //assigns name of button to be Delete Party
  btn.style.marginLeft = "1em"; //adds styling to button margin
  btn.onclick = () => {
    //function to tell button what to do on click
    let index = parties.indexOf(party); //loops through to find index of party
    parties.splice(index, 1); //removes 1 party index
    drawDOM(); //calls drawDOM function
  };
  return btn; //returns the created button
}

//function to create the new member button
function createNewMemberButton(party) {
  let btn = document.createElement("button"); //assigns variable to create button
  btn.className = "btn btn-primary"; //assigns class styling to be primary
  btn.innerHTML = "Create"; //assigns name of button to be Create
  btn.onclick = () => {
    //function to tell button what to do on click
    party.members.push(
      //pushes contents into array using push method
      new Member( //contents being pushed is new class created by values inputted into form
        getValue(`name-input-${party.id}`), //retrieves value of name
        getValue(`race-input-${party.id}`), //retrieves value of race
        getValue(`classOfMember-input-${party.id}`), //retrieves value of DnD class
        getValue(`alignment-input-${party.id}`) //retrieves value of alignment
      )
    );
    drawDOM(); //calls drawDOM function
  };
  return btn; //returns button
}

//function to create entire party table
function createPartyTable(party) {
  let table = document.createElement("table"); //assigns variable to create a table
  table.setAttribute("class", " table table-dark table-striped"); //adds style for the table
  let row = table.insertRow(0); //assigns variable to insert first row
  let nameColumn = document.createElement("th"); //assigns variable to create table header
  let raceColumn = document.createElement("th"); //assigns variable to create table header
  let classOfMemberColumn = document.createElement("th"); //assigns variable to create table header
  let alignmentColumn = document.createElement("th"); //assigns variable to create table header
  nameColumn.innerHTML = "Name"; //inserts name of table header
  raceColumn.innerHTML = "Race"; //inserts name of table header
  classOfMemberColumn.innerHTML = "Class"; //inserts name of table header
  alignmentColumn.innerHTML = "Alignment"; //inserts name of table header
  row.appendChild(nameColumn); //uses appendChild method to add item to the row
  row.appendChild(raceColumn); //uses appendChild method to add item to the row
  row.appendChild(classOfMemberColumn); //uses appendChild method to add item to the row
  row.appendChild(alignmentColumn); //uses appendChild method to add item to the row
  let formRow = table.insertRow(1); //assigns variable to insert row at position 1
  let nameTh = document.createElement("th"); //assigns variable to create table header
  let raceTh = document.createElement("th"); //assigns variable to create table header
  let classOfMemberTh = document.createElement("th"); //assigns variable to create table header
  let alignmentTh = document.createElement("th"); //assigns variable to create table header
  let createTh = document.createElement("th"); //assigns variable to create table header
  let nameInput = document.createElement("input"); //assigns variable to create input field for name
  nameInput.setAttribute("id", `name-input-${party.id}`); //sets new value to nameInput
  nameInput.setAttribute("type", "text"); //sets new value to nameInput
  nameInput.setAttribute("class", "form-control"); //sets new value to nameInput
  let raceInput = document.createElement("input"); //assigns variable to create input field for race
  raceInput.setAttribute("id", `race-input-${party.id}`); //sets new value to nameInput
  raceInput.setAttribute("type", "text"); //sets new value to nameInput
  raceInput.setAttribute("class", "form-control"); //sets new value to nameInput
  let classOfMemberInput = document.createElement("input"); //assigns variable to create input field for DnD class
  classOfMemberInput.setAttribute("id", `classOfMember-input-${party.id}`); //sets new value to nameInput
  classOfMemberInput.setAttribute("type", "text"); //sets new value to nameInput
  classOfMemberInput.setAttribute("class", "form-control"); //sets new value to nameInput
  let alignmentInput = document.createElement("input"); //assigns variable to create input field for alignment
  alignmentInput.setAttribute("id", `alignment-input-${party.id}`); //sets new value to nameInput
  alignmentInput.setAttribute("type", "text"); //sets new value to nameInput
  alignmentInput.setAttribute("class", "form-control"); //sets new value to nameInput
  let newMemberButton = createNewMemberButton(party); //assigns variable for calling new member button function
  nameTh.appendChild(nameInput); //appends form value for name to name header/column
  raceTh.appendChild(raceInput); //appends form value for race to race header/column
  classOfMemberTh.appendChild(classOfMemberInput); //appends form value for DnD class to DnD class header/column
  alignmentTh.appendChild(alignmentInput); //appends form value for alignment to alignment header/column
  createTh.appendChild(newMemberButton); //appends new memeber button create header/column
  formRow.appendChild(nameTh); //appends formRow variable to instead row to name column
  formRow.appendChild(raceTh); //appends formRow variable to instead row to race column
  formRow.appendChild(classOfMemberTh); //appends formRow variable to instead row to DnD class column
  formRow.appendChild(alignmentTh); //appends formRow variable to instead row to alignment column
  formRow.appendChild(createTh); //appends formRow variable to instead row to create button column
  document.getElementById("new-party-name").value = ""; //resets empty value in input field
  return table; //returns the table created
}

//function to clear input on table
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
