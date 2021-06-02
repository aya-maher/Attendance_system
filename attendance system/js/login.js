
let form='';
let username ='';
let password ='';

window.addEventListener('load', function(){
            
    form = document.getElementsByTagName('form')[0]; 
    username = document.getElementById('username');
    password = document.getElementById('password');

      form.addEventListener('submit', function (event){
          
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
        }
        else{
        event.preventDefault();  
        renderEmp();

    }
      }, false);
  }, false); 


    const renderEmp = async () => {
    let uri = 'http://localhost:3000/emp';

    const res = await fetch(uri);
    const emps = await res.json();
    
    for(var i=1;i<emps.length;i++){

             if(username.value == emps[i].username && password.value == emps[i].password){

                localStorage.setItem('loggedUser', JSON.stringify({
                  'fname': emps[i].fname,
                  'lname': emps[i].lname,
                  'email': emps[i].email,
                  'username': emps[i].username,
                  'id': emps[i].id,
                  'admin': false
                }));      

                location.href = `../pages/profile-employee.html?id=${emps[i].id}`;
                break;
            }else if(username.value == emps[0].username && password.value == emps[0].password){
                    localStorage.setItem('loggedUser', JSON.stringify({
                      'fname': emps[i].fname,
                      'lname': emps[i].lname,
                      'email': emps[i].email,
                      'username': emps[i].username,
                      'id': emps[i].id,
                      'admin': true
                    })); 

                    location.href = `../pages/profile-admin.html?id=${emps[0].id}`;
                    break;
            }else{
            
            }
    }
} 