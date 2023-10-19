const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const userList = document.querySelector('#users');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit',onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(nameInput.value === ''||emailInput.value === ''||phoneInput.value === '')
    {
        msg.classList.add('error');
        msg.innerHTML = 'Please fill all the fields';

        setTimeout(() => msg.remove,3000);
    }
    else
    {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${phoneInput.value} `));
        userList.appendChild(li);

        //Delete Button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.appendChild(document.createTextNode('Delete User'));
        deleteBtn.onclick = () => {
            localStorage.removeItem(userdetails.email);
            userList.removeChild(li);
        }
        
        li.appendChild(deleteBtn);

        //Edit Button
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm float-right btn-warning delete';
        editBtn.appendChild(document.createTextNode('Edit User'));
        editBtn.onclick = () => {
            localStorage.removeItem(userdetails.email);

            nameInput.value = `${userdetails.name}`;
            emailInput.value = `${userdetails.email}`;
            phoneInput.value = `${userdetails.phone}`;

            userList.removeChild(li);
        }

        li.appendChild(editBtn);

        const userdetails = {
            name : nameInput.value,
            email : emailInput.value,
            phone : phoneInput.value
        }

    
        let userdetails_serialized = JSON.stringify(userdetails);

        localStorage.setItem(emailInput.value,userdetails_serialized);


        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';

        axios.post('https://crudcrud.com/api/68ccc4d76c634b3f8d52375a9bc5605f/appointmentData', userdetails)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

function saveToLocalStorage(event){

}
window.addEventListener('DOMContentLoaded', () => {

    const data = axios.get("https://crudcrud.com/api/68ccc4d76c634b3f8d52375a9bc5605f/appointmentData")
        .then((response) => {
            console.log(response)

            for(var i = 0;i<response.data.length;i++){
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
        console.log(data);

    // const localStorageObj = localStorage;
    // const localStoragekeys = Object.keys(localStorageObj);

    // for(var i = 0;i<localStoragekeys.length;i++){
    //     const key = localStoragekeys[i];
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userdetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    //}
})

// function showNewUserOnScreen(user){
//     document.getElementById('email').value = '';
//     document.getElementById('username').value = '';
//     document.getElementById('phonenumber').value = '';
//     // console.log(localStorage.getItem(user.emailId))
//     if(localStorage.getItem(user.email) !== null){
//         removeUserFromScreen(user.email)
//     }

// }
