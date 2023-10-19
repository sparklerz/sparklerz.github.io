
        const submitButton = document.getElementById('submit');
        const nameInput = document.getElementById('name');

        submitButton.addEventListener('click', () => {
            const name = nameInput.value;

            // Define the data to send
            const data = {
                "nickName" : name,
                "personalLike" : "football", 
                "criticality" : "intensified", 
                "initialMedicine" : [["g", "1"]], 
                "intensifiedMedicine" : [["h", "3"]]
            };

            fetch('https://us-central1-adherer-3.cloudfunctions.net/app/updatePerson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : '*/*',
                    'Accept-Encoding' : 'gzip, deflate, br',
                    'Connection' : 'keep-alive'
                    // You may need to include additional headers as required by the API
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                // Handle the response from the API here
                console.log(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
