function validate() {
    var email = documentGetElementById("email").value;
    var password = documentGetElementById("password").value;
    if (email == null || email == "") {
        alert('Please enter the email')
        return false;
    }
    if (password == null || password == "") {
        alert('Please enter the username')
        return false;
    }
    alert("login successful")
}