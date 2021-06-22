const form = document.querySelector('#contactEmail');

form.addEventListener('submit', s=> {
    s.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const data = {
        name: name,
        email: email
    }
    document.getElementById('name').innerHTML ="";
    document.getElementById('email').innerHTML ="";

    fetch('contact.js', {
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(data)
    }).then(res =>{
        console.log(res);
    });
    document.getElementById('result').innerHTML = "Emmail Sent";
})