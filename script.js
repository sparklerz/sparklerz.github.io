
        //const submitButton = document.getElementById('submit');
        const nameInput = document.getElementById('name');

        const favouritesInput = document.getElementById('favourites');

        const statusInput = document.getElementById('status');

        let initialMedicine;

        let intensifiedMedicine;

        function addField() {
            const inputFields = document.getElementById("inputFields");
      
            // Create a new set of input fields
            const newFields = document.createElement("div");
            newFields.innerHTML = `
              <input type="text" name="field1" placeholder="Field 1">
              <input type="text" name="field2" placeholder="Field 2">
              <input type="text" name="field3" placeholder="Field 3">
              <button type="button" onclick="removeField(this)">Remove</button>
            `;
      
            inputFields.appendChild(newFields);
        }

        function removeField(button) {
            const inputFields = document.getElementById("inputFields");
            inputFields.removeChild(button.parentNode);
        }

        function storeValues() {
            const inputFields = document.querySelectorAll("#inputFields div");
            const tempArray = [];
      
            inputFields.forEach((fieldSet) => {
              const inputs = fieldSet.querySelectorAll("input");
              const fieldValues = [];
      
              inputs.forEach((input) => {
                fieldValues.push(input.value);
              });
      
              tempArray.push(fieldValues);
            });
      
            
            // Log the values in the 2D array for demonstration
            //console.log(tempArray);

            for(let i = 0; i < tempArray.length; i++)
            {
                if(tempArray[i][0] === "initial"){
                    initialMedicine.push([tempArray[i][1], tempArray[i][2]])
                } else if(tempArray[i][0] === "intensified"){
                    intensifiedMedicine.push([tempArray[i][1], tempArray[i][2]])
                }
            }
      
            // You can send the valuesArray to the server or further process it as needed
          }
      
          // Attach the storeValues function to the form's submit event
          document.getElementById("myForm").addEventListener("submit", function (event) {
            storeValues();

            const name = nameInput.value;
            const favourites = favouritesInput.value;
            const status = statusInput.value;

            // Define the data to send
            const data = {
                "nickName" : name,
                "personalLike" : favourites, 
                "criticality" : status, 
                "initialMedicine" : initialMedicine, 
                "intensifiedMedicine" : intensifiedMedicine
            };

            fetch('https://us-central1-adherer-3.cloudfunctions.net/app/updatePerson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept' : '*/*',
                    // 'Accept-Encoding' : 'gzip, deflate, br',
                    // 'Connection' : 'keep-alive'
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

            //event.preventDefault(); // Prevent actual form submission
          });

        // submitButton.addEventListener('click', () => {
        
        // });
