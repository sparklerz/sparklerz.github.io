
        //const submitButton = document.getElementById('submit');
        const nameInput = document.getElementById('name');

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
            const valuesArray = [];
      
            inputFields.forEach((fieldSet) => {
              const inputs = fieldSet.querySelectorAll("input");
              const fieldValues = [];
      
              inputs.forEach((input) => {
                fieldValues.push(input.value);
              });
      
              tempArray.push(fieldValues);
            });
      
            valuesArray.push(tempArray);
      
            // Log the values in the 2D array for demonstration
            console.log(valuesArray);
      
            // You can send the valuesArray to the server or further process it as needed
          }
      
          // Attach the storeValues function to the form's submit event
          document.getElementById("myForm").addEventListener("submit", function (event) {
            storeValues();
            event.preventDefault(); // Prevent actual form submission
          });

        // submitButton.addEventListener('click', () => {
        //     const name = nameInput.value;

        //     // Define the data to send
        //     const data = {
        //         "nickName" : name,
        //         "personalLike" : "football", 
        //         "criticality" : "intensified", 
        //         "initialMedicine" : [["g", "1"]], 
        //         "intensifiedMedicine" : [["h", "3"]]
        //     };

        //     fetch('https://us-central1-adherer-3.cloudfunctions.net/app/updatePerson', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // 'Accept' : '*/*',
        //             // 'Accept-Encoding' : 'gzip, deflate, br',
        //             // 'Connection' : 'keep-alive'
        //             // You may need to include additional headers as required by the API
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then(response => response.json())
        //     .then(result => {
        //         // Handle the response from the API here
        //         console.log(result);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        // });
