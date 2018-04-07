
var studentArray = [];

function init(){
    emptyElements();
    document.getElementById('myTableRows').innerHTML = "";
    document.getElementById('btn').innerHTML = "Submit";
    if(localStorage.studentsRecord){
      studentArray = JSON.parse(localStorage.studentsRecord);
      for(var i=0; i<studentArray.length; i++){
          prepareTable(i,studentArray[i].firstname,studentArray[i].lastname,studentArray[i].mobile);
      }
    }
}

function onSubmitClicked() {

    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var mob = document.getElementById('mob').value;

    var isValiddata = validateFormData(fname,lname,mob);

    if(isValiddata){
      var studentObj = {
          firstname : fname,
          lastname : lname,
          mobile : mob
      };
      if(selectedIndex == -1){
          studentArray.push(studentObj);
      }else{
          studentArray.splice(selectedIndex,1,studentObj);
      }
      localStorage.studentsRecord = JSON.stringify(studentArray);
      init();
      emptyElements();
    }
}

var selectedIndex = -1;

function onEditPressed(index) {
    selectedIndex = index;
    studentArray = JSON.parse(localStorage.studentsRecord);
    var stdObj = studentArray[index];
    document.getElementById('fname').value = stdObj.firstname;
    document.getElementById('lname').value = stdObj.lastname;
    document.getElementById('mob').value = stdObj.mobile;
    document.getElementById('btn').innerHTML = "Update";
}

function deleteTableRow(index){
    var table = document.getElementById('myTable');
    table.deleteRow(index+1);
    studentArray.splice(index,1);
    localStorage.studentsRecord = JSON.stringify(studentArray);
    init();
}

function prepareTable(index,Firstname,Lastname,Mobile){

      var tableRows = document.getElementById('myTableRows');
      var row = tableRows.insertRow();

      var indexCell = row.insertCell(0);
      var firstNameRow = row.insertCell(1);
      var lastNameRow = row.insertCell(2);
      var mobileRow = row.insertCell(3);
      var actionRow = row.insertCell(4);


      firstNameRow.innerHTML = Firstname;
      lastNameRow.innerHTML = Lastname;
      mobileRow.innerHTML = Mobile;
      actionRow.innerHTML = '<button type="button" class="btn btn-primary" onclick="onEditPressed('+index+')">Edit</button> <button type="button" class="btn btn-danger" onclick="deleteTableRow('+index+')" >Delete</button>';
      indexCell.innerHTML = index+1;
}

function emptyElements(){
    selectedIndex = -1;
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('mob').value = "";
}

function validateFormData(fn,ln,mb){
    if(fn=="" || fn==null){
      alert('Please enter first name');
      return false;
    }if(ln=="" || ln==null){
      alert('Please enter last name');
      return false;
    }if(mb=="" || mb==null){
      alert('Please enter mobile number');
      return false;
    }
    return true;
}
