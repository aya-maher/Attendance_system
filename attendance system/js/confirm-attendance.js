//let id=$('#confirm-attendance').val();
  let form ='';
  let username ='';
window.addEventListener('load', function(){
            
    form = document.getElementsByTagName('form')[0]; 
    username = document.getElementById('username');

      form.addEventListener('submit', function (event){
          
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
        }
        else{
        event.preventDefault();  

        attendanceEmp();

    }
      }, false);
  }, false); 


// converting time to minutes function
const timeInMinutes = (hour, minutes) => {
  return (hour * 60) + minutes;
}

const id = new URLSearchParams(window.location.search).get('id');
const attendanceEmp = async () => {
    let uri = `http://localhost:3000/emp/${id}`;

    const res = await fetch(uri);
    const emps = await res.json();
    
    let tempEmp = emps;
    

  
    now = new Date();
    const attendanceTime = now.toLocaleString();
    const currentMonth  = now.getMonth(); 

    // time after that employee will be late
    const beforeLate = timeInMinutes(9, 30);
    // attendance time in minutes
    const attendanceTimeInMin = timeInMinutes(now.getHours(), now.getMinutes());

                 if(username.value == emps.username){
       
                    $(".modal-body").append(`
                    <p><b>Employee Name: </b><i>${emps.fname + " " +emps.lname}</i></p>
                    <p><b>Attendance Time: </b><i>${attendanceTime}</i></p>  
                    `);

                    tempEmp.attendance[currentMonth].days.push(attendanceTime);
    

                   if (attendanceTimeInMin > beforeLate) {
                      lateCounter = parseInt(tempEmp.attendance[currentMonth].late);
                      lateCounter += 1;
                      tempEmp.attendance[currentMonth].late = lateCounter;
                  }
                
                    fetch(`http://localhost:3000/emp/${id}`,{
                      method: 'PUT',
                      body: JSON.stringify(tempEmp),
                      headers: { "Content-Type": "application/json" },
                    }).catch((error) => {
                      console.log(error);     
                    }).then((tempEmp) => {
                      console.log(tempEmp);

                      console.log("Request Done");
                    })

                 }else{
                     console.log("Not");
                 }
                 

        }

        $("#home").append(` <a class="nav-link" href="../pages/profile-employee.html?id=${id}">Home</a>`);


        function redirect(){
          location.href = `profile-employee.html?id=${id}`;
        }
        