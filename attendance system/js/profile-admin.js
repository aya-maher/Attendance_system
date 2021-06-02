  
  window.addEventListener('load', async function(){
    renderEmp();
    showTempEmp();

  });


  //data from json 

let 
    month = new Date().getMonth(),
    currentYear = new Date().getFullYear(),       
    day = new Date().getDate();
    


const renderEmp = async () => {
    let uri = 'http://localhost:3000/emp';

    const res = await fetch(uri);
    const emps = await res.json();
    
  //  emp.attendance[month].attend

  Alltable = $(`
                <table class="table table-responsive">
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </table>`
            );
  Fullreporttable = $(`
                        <table class="table table-responsive">
                            <tr>
                                <th>Name</th>
                                <th>Attendance times</th>
                                <th>Late times</th>
                                <th>Absence times</th>
                                <th>Excuse times</th>
                                </tr>
                        </table>
                    `);
  Latereporttable = $(`
                        <table class="table table-responsive">
                            <tr>
                                <th>Name</th>
                                <th>Late times</th>
                                </tr>
                        </table>
                    `);
  Excusereporttable = $(`
                    <table class="table table-responsive">
                        <tr>
                            <th>Name</th>
                            <th>Excuse times</th>
                            </tr>
                    </table>
                `);                    
  Employeesdatatable = $(`
                        <table class="table table-responsive">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </table>`
                        );
         

    for (var i = 1; i < emps.length; i++) {
    //     console.log(day);
    //   console.log(month);

        const absenceDays  =  daysInMonth(month + 1, currentYear) - 8 - emps[i].attendance[month].days.length;
       All = $(`<tr>
                    <td>${emps[i].fname +" "+ emps[i].lname}</td>
                    <td>${emps[i].id}</td>
                    <td>${emps[i].username}</td>
                    <td>${emps[i].address}</td>
                    <td>${emps[i].email}</td>
                    <td>${emps[i].age}</td>
                </tr>`
                );
       Alltable.append(All);

       Fullreport = $(` <tr>
                            <td>${emps[i].fname +" "+ emps[i].lname}</td>
                            <td>${emps[i].attendance[month].days.length}</td>
                            <td>${emps[i].attendance[month].late}</td>
                            <td>${emps[i].attendance[month].excuse}</td>
                            <td>${absenceDays}</td>
                        </tr>`
                    );
       Fullreporttable.append(Fullreport);

       Latereport = $(`<tr>
                         <td>${emps[i].fname +" "+ emps[i].lname}</td>
                         <td>${emps[i].attendance[month].late}</td>
                      </tr>`
                      );
       Latereporttable.append(Latereport);

       Excusereport = $(`<tr>
                         <td>${emps[i].fname +" "+ emps[i].lname}</td>
                         <td>${emps[i].attendance[month].excuse}</td>
                      </tr>`
                       );
       Excusereporttable.append(Excusereport);

       EmployessData = $(`<tr>
                            <td>${emps[i].fname +" "+ emps[i].lname}</td>
                            <td>${emps[i].email}</td>
                        </tr>`
                        );
       Employeesdatatable.append(EmployessData);
    }             

    $("#reports").append(Alltable);
 

   // $("#allEmp").append(allEmployees);
   //$("#allEmp").append(fullReports);

    //empData.innerHTML = allEmployees;
} 

//window.addEventListener('DOMContentLoaded', () => renderEmp());

        function getAll(){
            reports.removeChild(reports.lastChild);
            $("#reports").append(Alltable);
        }
        function getFullReport(){
            reports.removeChild(reports.lastChild);
            $("#reports").append(Fullreporttable);
        }
        function getLateReport(){
            reports.removeChild(reports.lastChild);
            $("#reports").append(Latereporttable);
        }
        function getExcuseReport(){
           reports.removeChild(reports.lastChild);
           $("#reports").append(Excusereporttable);
        }
        function getEmployessData(){
            reports.removeChild(reports.lastChild);
            $("#reports").append(Employeesdatatable);
        }


        function daysInMonth(month, year) {
          return new Date(year, month, 0).getDate();
        }


// select temp data requests


const showTempEmp = async () => {
    let uri = 'http://localhost:3000/tempEmp';

    const response = await fetch(uri);
    const tempEmps = await response.json();

    // console.log(tempEmps);

      const acceptRequests = async(i) => {
          id = tempEmps[i].id;
          console.log(id);
      }
    
    AllDataRequests = $(`
                <table class="table table-responsive">
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th colspan="2" class="action">Action</th>
                    </tr>
                </table>`
            );

         
    for (let i = 1; i < tempEmps.length; i++) {
        
       AllRequests = $(`<tr>
                    <td>${tempEmps[i].fname +" "+ tempEmps[i].lname}</td>
                    <td>${tempEmps[i].address}</td>
                    <td>${tempEmps[i].email}</td>
                    <td>${tempEmps[i].age}</td>
                    <td class="action">
                        <button class="btn button btn-primary mb-2" id="accept" onclick="acceptRequests(${tempEmps[i].id});" type="submit">Accept</button>
                    </td>
                    <td class="action">
                        <button class="btn btn2 button btn-primary mb-2" id="rejected" onclick="deleteTempEmp(${tempEmps[i].id});" type="submit">Rejected</button>
                    </td>
                </tr>`
                );

       AllDataRequests.append(AllRequests);

    }             

//  $("#requests").append(AllDataRequests);

} 

function getAllDataRequests(){
    //  requests.removeChild(requests.lastChild);
     $("#requests").append(AllDataRequests);
 }



function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function sendEmailToNewEmp(username,password,email){
    Email.send({
      Host : "smtp.gmail.com",
      Username : "ayamaherali9@gmail.com",
      Password : "onsxrhnhnefvgdga",
      To : `${email}`,
      From : "ayamaherali9@gmail.com" ,
      Subject : `admin sent you a message`,
      Body : `User Name : ${username} <br>
              Password : ${password} <br>`
    }).then(message => alert(message));
  }


const acceptRequests = async (id) => {
    let uri = `http://localhost:3000/TempEmp/${id}`;

    const response = await fetch(uri);
    const tempEmps = await response.json();

    // console.log(tempEmps);
    // console.log(tempEmps.id);
     
    //       id = tempEmps[i].id;
    //        console.log(id);
    // return;
     
    fname = tempEmps.fname;
    lname = tempEmps.lname;
    email = tempEmps.email;
    address = tempEmps.address;
    age = tempEmps.age;

    nameSub = fname.substr(0,3);
    codeRandom = Math.floor(Math.random() * 1001);    
    username = nameSub.concat(codeRandom);
    password = generatePassword();

     sendEmailToNewEmp(username,password,email);

     let currentDate = new Date().toGMTString();

     const AcceptedEmp = {
        admin: "",
        fname: fname,
        lname: lname,
        username: username,
        password: password,
        address: address,
        email: email,
        age: age ,
        dateofemp: currentDate,
        "attendance": {
            "0": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "1": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "2": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "3": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "4": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "5": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "6": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "7": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "8": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "9": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "10": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            },
            "11": {
              "days": [
              ],
              "late": 0,
              "excuse":0
            }
          }
        
      }
          
     sendData(AcceptedEmp);
     deleteTempEmp(id);
            //   alert("mail done");
         
} 




const sendData =  async (emp) =>{
 
  await fetch('http://localhost:3000/emp', {
          method: 'POST',
          body: JSON.stringify(emp),     
          headers: { 'Content-Type': 'application/json' }
        })

        // alert("Data Added...");
}


const deleteTempEmp =  async (id) =>{
    //  console.log(id);
    await fetch(`http://localhost:3000/TempEmp/${id}`, {
            method: 'DELETE',  
            headers: { 'Content-Type': 'application/json' }
          }).then(data => {
            $("#accept").parents("tr").remove();
        })
  }
  
  const origin =window.location.origin;
  function logOut(){
    //   e.preventDefault();
      localStorage.removeItem("loggedUser");
      window.location.replace(`${origin}/pages/login.html`);
  }






