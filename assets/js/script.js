function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    //    const message = document.getElementById("message").value;

    // Basic form validation
    if (!name || !email || !subject //|| !message
    ) {
        alert("Please fill in all fields");
        return;
    }

    // Assuming you have a Node.js server running on localhost:3000
    fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, email, subject //, message 
        }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // You can redirect or perform other actions after successful submission
        })
        .catch(error => console.error("Error:", error));
}
