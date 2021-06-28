const form = document.querySelector('#contactEmail');

form.addEventListener('submit', s=> {
    s.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(name);
    const data = {
        name: name,
        email: email,
        message: message
    }
   // document.getElementById('name').innerHTML ="";
    //document.getElementById('email').innerHTML ="";

    fetch('/contact', {
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(data)
    }).then(res =>{
        console.log(res);
    });
    document.getElementById('result').innerHTML = "Email Sent";
})