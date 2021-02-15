document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = inputId => document.getElementById(inputId).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues.length);

    const showCount = document.getElementById("show-count")
    showCount.innerHTML = issues.length;
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';

  // currentIssue.description = `
  // <h3 style = "color:red"> ${currentIssue.description} </h3>
  // `;
  // console.log(issues)
  // console.log(id)

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);

  console.log(issues)
  console.log(id)

  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // const showCount = document.getElementById("show-count")
  // showCount.innerHTML = issues.length;
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    // console.log(issues[i]);

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class = "${status == 'Closed' ? 'lineThrough' : ''}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}


// const issue1 = { name: "Parvej", ID: 1201, color: "red" }
// const issue2 = { name: "Parvej2", ID: 1202, color: "Black" }
// const issue3 = { name: "Parvej3", ID: 1203, color: "Blue" }

// let issuesArray = [issue1, issue2, issue3]

// for (i = 0; i < issuesArray.length; i++) {
  
//   const { name, ID, color } = issuesArray[1];
//   console.log(name);
//   console.log(ID);
//   console.log(color);
//   console.log(issuesArray[i]);
// }



