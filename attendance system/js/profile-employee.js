
const empData = document.querySelector('.empData');

                
                let 
                month = new Date().getMonth(),
                currentYear = new Date().getFullYear(),       
                day = new Date().getDate();
                
            
//line for one emp
const id = new URLSearchParams(window.location.search).get('id');


const renderEmp = async () => {
  
    const res = await fetch('http://localhost:3000/emp/' + id);

    const emps = await res.json();

    
     console.log(emps);
    // console.log(emps.attendance[1].month);
    const attendanceTime = new Date().toLocaleString();
    const currentMonth = new Date().getMonth();
    
    let empinfo = '' ;


    //monthly Report
    monthlyReport =$(`
         <tbody>
            <tr>
                <td>Attendance times</td>
                <td>Late times</td>
                <td>Absence times </td>
                <td>Excuse times </td>
            </tr>
            <tr>
                <td>${emps.attendance[currentMonth].days.length}</td>
                <td>${emps.attendance[currentMonth].late}</td>
                <td>${getAbsence(emps)}</td>
                <td>${emps.attendance[currentMonth].excuse}</td>
            </tr>
        </tbody>
            ` );

    //daily Report
     dailyReport =$( `
            <tbody>
               <tr>
                   <td>${emps.fname +" "+ emps.lname}</td>
                   <td>${getTodayAttendance(emps.attendance[currentMonth].days)}</td>
               </tr>
           </tbody>
               ` );
   


    //one emp
    empinfo =`
        <div class="empName mb-3">
            ${emps.fname +" "+ emps.lname}
        </div>
        <div>
            <label>User Name:</label>
            <p class="p" id="empUsername">${emps.username}</p>
        </div>
        <div>
            <label>Address:</label>
            <p class="p" id="empAddress">${emps.address}</p>
        </div>
        <div>
            <label>Email:</label>
            <p class="p" id="empEmail">${emps.email}</p>
        </div>
        <div>
            <label>Age:</label>
            <p class="p" id="empAge">${emps.age}</p>
        </div>
        <div>
            <label>Date of Employment:</label>
            <p class="p" id="empDate"><br/>${emps.dateofemp}</p>
        </div>
            `;
    
                    

    empData.innerHTML = empinfo;
   // monthly.innerHTML = monthlyReport;
   // daily.innerHTML = dailyReport;
    $("#reports").append(monthlyReport);
    $("#confirmBtn").append(`<a class="btn btn-primary  button  btn-md  mb-2" id="confirmAttendance" href="../pages/confirm-attendance.html?id=${id}" role="button">Confirm Attendance</a>`);
    // $("#confirmBtn").append(`<button class="btn btn2 button btn-primary mb-2" onclick="logOut()" type="submit">Log Out</button>`);
    $("#home").append(` <a class="nav-link" href="../pages/profile-employee.html?id=${id}">Home <span class="sr-only">(current)</span></a>`);
    $("#confirmNav").append(`<a class="nav-link" href="../pages/confirm-attendance.html?id=${id}">Confirm Attendance</a>`);
    
    
} 


window.addEventListener('DOMContentLoaded', () => renderEmp());

function getMonthlyReport(){
    reports.removeChild(reports.lastChild);
    $("#reports").append(monthlyReport);
}
function getDailyReport(){
    reports.removeChild(reports.lastChild);
    $("#reports").append(dailyReport);
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

function getAbsence(emp) {
    let monthDays  = daysInMonth(month + 1, currentYear),
        attendanceDays = emp.attendance[month].days.length;

      return monthDays - 8 - attendanceDays;
    
  }

  function getTodayAttendance (days) {
      let time = '';
      days.forEach(day => {
            if (new Date(day).toLocaleDateString() == new Date().toLocaleDateString()) {
              time = new Date(day).toLocaleTimeString();
            }
      })

      return time;
  }
const origin =window.location.origin;
  function logOut(){
      localStorage.removeItem("loggedUser");
      window.location.replace(`${origin}/pages/login.html`);
  }