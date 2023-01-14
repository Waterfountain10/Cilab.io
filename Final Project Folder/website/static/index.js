counter = 1
function add_course() {
  if (counter == 8) {
    alert('8 courses? Man, get a life or something');
  }
  else {
    alert('Course was added!');
        
    // Get the element
    var box = document.querySelector('#course'+ counter);
    // Create a copy of it
    var clone = box.cloneNode(true);
    // set IDS
    clone.id = 'course'+ (counter + 1);
    clone.getElementsByTagName('input')[0].id = "check" + (counter + 1);
    clone.getElementsByTagName('input')[1].id = "course_name" + (counter + 1);
    clone.getElementsByTagName('input')[2].id = "course_number" + (counter + 1);
    box.after(clone);
    counter++;
    alert('counter is ' + counter);
  }
}


function remove_course() {
  if (counter == 1) {
    alert('You cannot remove all courses!');
  }
  else {
    alert('Course was removed!')
    document.getElementById('course' + counter).remove();
    counter--;
    alert('counter is now ' + counter);
  }
}


function check() {
  // opacity change
}


function confirm_courses() {
  var coursenames = [];
  var coursenums = [];
  
  for (let i = 1; i < (counter + 1); i++) {
    let checkbox = document.getElementById('check'+i);
    let coursename = document.getElementById('course_name'+i).value;
    let coursenum = document.getElementById('course_number'+i).value;
    // append the checked courses
    if (checkbox.checked == true) {
      coursenames.push(coursename);
      coursenums.push(coursenum);
    }
  }
  
  sessionStorage.setItem('course names', JSON.stringify(coursenames));
  sessionStorage.setItem('course numbers', JSON.stringify(coursenums));
  window.location.href = 'http://127.0.0.1:5000/details?';
}


function create_table () {
  const coursenames = JSON.parse(sessionStorage.getItem('course names'));
  const coursenums = JSON.parse(sessionStorage.getItem('course numbers'));

  const courses = coursenames.map((name, i) => ({ name, number: coursenums[i] }));
  console.log(courses);
  // make a table now bcz all this is good
  for (let i = 1; i < courses.length + 1; i++) {
    // make a row with the info from courses[]
    var name = courses[i-1]['name'];
    var code = courses[i-1]['number'];

    if (i != 1) {
      // Get the element
      var box = document.getElementById('course_row1');
      // Create a copy of it
      var clone = box.cloneNode(true);
      // set IDS
      clone.id = 'course_row'+ i;
  
      clone.getElementsByTagName('th')[0].innerHTML = i;
      clone.getElementsByTagName('td')[0].id = "name" + i;
      clone.getElementsByTagName('td')[1].id = "code" + i;
      clone.getElementsByTagName('td')[2].id = "credits" + i;
      box.after(clone);
    }
    
    document.getElementById("name"+i).innerHTML = name;
    document.getElementById("code"+i).innerHTML = code;
  }
  
}
  

function toggleCollapsibleTable(event) {
  const clickedRow = event.currentTarget;//<tr>course_row1
  
  console.log(clickedRow)
  var str = clickedRow.id;
  var number = str.match(/(\d+)/);

  const collapsibleTableId = "collapsibleTable"+number[0]; //this is just an id string

  let collapsibleTable = clickedRow.nextElementSibling;
  console.log(collapsibleTable)
  
  if (collapsibleTable.id !== collapsibleTableId) {
    // create the collapsible table
    collapsibleTable = document.createElement("table");
    console.log(collapsibleTable)
    collapsibleTable.id = collapsibleTableId;
    collapsibleTable.className = "table table-success table-striped table-hover table-bordered"

    for (let i = 0; i < 2; i++) {
      if (i == 0) {headertitle = "Section #"}
      if (i == 1) {headertitle = "Professor"}
            
      let tr= document.createElement("tr");
      let th = document.createElement("th");
      th.setAttribute("scope", "row")
      th.textContent = headertitle
      let td = document.createElement("td")
      let input = document.createElement("input")
      let lowertitle = headertitle.toLowerCase();
      input.value = "Write your " + lowertitle
      input.className = lowertitle
      
      td.appendChild(input)
      tr.appendChild(th)
      tr.appendChild(td)
  
      collapsibleTable.appendChild(tr);
    }
    // Hours row in collapsible table

    // DAYS
    let tr= document.createElement("tr");
    let th = document.createElement("th");
    th.setAttribute("scope", "row")
    th.textContent = "Hours"
    let td1 = document.createElement("td")
    let daylabel = document.createElement("label")
    daylabel.innerHTML = "Select a day:"
    var days = document.createElement("select")
    const week = ["M","T","W","H","F","Sa","Su"]
    for (let i = 0; i < week.length; i++) {
      let day = document.createElement("option")
      day.value = week[i]
      day.innerHTML = week[i]
      days.appendChild(day)
    }
    td1.appendChild(daylabel)
    td1.appendChild(days)

    //START
    let td2 = document.createElement("td")
    let startlabel = document.createElement("label")
    startlabel.innerHTML = "Start:"
    let start = document.createElement("input")
    start.type = "time"
    td2.appendChild(startlabel)
    td2.appendChild(start)

    //END
    let td3 = document.createElement("td")
    let endlabel = document.createElement("label")
    endlabel.innerHTML = "End:"
    let end = document.createElement("input")
    end.type = "time"
    td3.appendChild(endlabel)
    td3.appendChild(end)
    
    //ADD everything to hours row
    tr.appendChild(th)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    //add hours row to Collapsible
    collapsibleTable.appendChild(tr)

    let addhours = document.createElement("button")
    addhours.type = "button"
    addhours.value= "Add a day"
    addhours.addEventListener("click", alert("hello"))

    tr.appendChild(addhours)
    // add the collapsible table after the clicked row
    clickedRow.after(collapsibleTable)
    //clickedRow.parentNode.insertBefore(collapsibleTable, clickedRow.nextSibling);
  } else {
    // toggle the visibility of the collapsible table
    collapsibleTable.style.display = (collapsibleTable.style.display === "none") ? "block" : "none";
    
  }
}


if (document.getElementById('courses_table')) {
    document.getElementById("courses_table").style.cursor = "pointer";
    //for a hover effect
  }
