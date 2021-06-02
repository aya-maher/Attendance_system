

let form='',
    fname='',
    lname='',
    address='',
    email='',
    age='';
    


window.addEventListener('load', function() {
            
    form = document.getElementsByTagName('form')[0];
    fname = document.getElementById('fname'),
    lname = document.getElementById('lname'),
    address = document.getElementById('address'),
    email = document.getElementById('email'),
    age = document.getElementById('age');
    
      form.addEventListener('submit', function (event){
          
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
        }
        else{
        //alert("sucess");
        event.preventDefault();
        
        sendEmail(fname.value,lname.value, address.value, email.value, age.value);
         alert("Done");
        sendTempData(event);
      
       // sendData(event);

          //console.log(fname.value);

        
    }
      }, false);
  }, false);



  function sendEmail(fname,lname, address, email, age){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "ayamaherali9@gmail.com",
        Password : "onsxrhnhnefvgdga",
        To : "ayamaherali9@gmail.com",
        From : `${email}`,
        Subject : `${fname} sent you a message`,
        Body : `First Name: ${fname} <br>
                Last Name: ${lname} <br>
                Address: ${address} <br>
                Email: ${email} <br>
                Age: ${age}`
    }).then(message => alert(message)
    );
  }





  let currentDate = new Date().toGMTString();

// test send tempEmp
const sendTempData =  async (e) =>{
  const tempEmp = {
    fname: form.fname.value,
    lname: form.lname.value,
    address: form.address.value,
    email: form.email.value,
    age: form.age.value ,
    dateofemp: currentDate,

  }
  await fetch('http://localhost:3000/tempEmp', {
          method: 'POST',
          body: JSON.stringify(tempEmp),     
          headers: { 'Content-Type': 'application/json' }
        })


      }




































// let currentDate = new Date().toGMTString();

// const sendData =  async (e) =>{
//   const emp = {
//     admin: "",
//     fname: form.fname.value,
//     lname: form.lname.value,
//     address: form.address.value,
//     email: form.email.value,
//     age: form.age.value ,
//     dateofemp: currentDate,
//     attendance: [
//       {
//         "month": 1,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 2,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 3,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 4,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 5,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 6,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 7,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 8,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 9,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 10,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 11,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       },
//       {
//         "month": 12,
//         "attend": 0,
//         "late": 0,
//         "absent": 0,
//         "days": []
//       }
//     ]
//   }
//   await fetch('http://localhost:3000/emp', {
//           method: 'POST',
//           body: JSON.stringify(emp),     
//           headers: { 'Content-Type': 'application/json' }
//         })

//         window.location.href = "./home.html";
// }



// $(document).ready(function() {
//     $("fname").click(
//     function(event) {
//         $("fname").delay(300).fadeIn(300);
//     })	
//     $("lname").click(
//     function(event) {
//         $("lname").delay(300).fadeIn(300);
//     })	
//     $("address").click(
//     function(event) {
//         $("address").delay(300).fadeIn(300);
//     })	
//     $("email").click(
//     function(event) {
//         $("email").delay(300).fadeIn(300);
//     })	
//     $("age").click(
//     function(event) {
//         $("age").delay(300).fadeIn(300);
//     })	
    
//     });


   


    // $(function () {
    //   // smtp configuration
    //   const smtpConfig = {
    //       Host: "smtp.gmail.com",
    //       Username: "devshennawy@gmail.com",
    //       Password: "hqrcnqpkdfxvtqik",
    //       To: 'devshennawy@gmail.com',
    //       From: "devshennawy@gmail.com",
    //       Subject: "New employee registeration data",
    //   }
  
    //   // events
    //   $('#regForm').submit(submitRegForm);
  
    //   // submit registeration form
    //   function submitRegForm() {
    //       // form data
    //       let fname = $('#fname').val(),
    //           lname = $('#lname').val(),
    //           email = $('#email').val(),
    //           address = $('#address').val();
    //       age = $('#age').val();
  
    //       // sending mail
    //       Email.send({
    //           Host: smtpConfig.Host,
    //           Username: smtpConfig.Username,
    //           Password: smtpConfig.Password,
    //           To: smtpConfig.To,
    //           From: smtpConfig.From,
    //           Subject: smtpConfig.Subject,
    //           Body: `New Employee registeration: to approve click this link: ${window.location.origin}/admin/addemployee.html?fname=${fname}&lname=${lname}&email=${email}&address=${address}&age=${age}`
    //       })
    //           .then(function (message) {
    //               alert("mail sent successfully");
    //               window.location.replace(`${window.location.origin}/employee/home.html`);
    //           });
  
    //  }
  //})