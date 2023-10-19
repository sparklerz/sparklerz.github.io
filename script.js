
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
                    "type": "service_account",
                    "project_id": "adherer-3",
                    "private_key_id": "1cefd285faea7a984a8b5766105de8ed06e4d021",
                    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKrxdSw6LmJFZH\ns8qEWo1DL7gCK7D7yjcukjnhbZ/aJFXsD3JIMGnHkhO98SqwNqI5pXG8ZclTWdQN\nh2+Ui7tqSPq3RPhdNvCyZm2tycYoAMBqkfl/A5EOH7B+t8/ydx/oxmzO4hklQ/zX\nAOueUWm7Ae+9kvtvGLqEau5inZ0VjsWoxxT7oD12Vb1OmX3HbW7giXvYYPGa5z2/\n2jDAF1VhiDg/n7VejfK5688+LZ5t5RDkHnujt2LKUOXSS32fTsV5eTczptLUuwwK\nE5y2IEWPKI0zdjcOK+INd064h63KGm31nmZUXhTqEb0aA9aO77owpLn4YP89cKKg\nuvSj2myVAgMBAAECggEACaI23pUz6fJyM2hFSPMw4a+j9F51RBKBevIyVBes0GaH\nuvek++9pJ7Y2wAF1gPinz0ug006XOiH75US5tfrKRqv/VrSthWi2GhSqQ+diRsZ6\nXtZfYH0f6ObysaM0/BZTavH7e/3dKhtIKkP97wF5oAzgg0c4MjifrOmUORW6wKp5\nzMoI5zP6FPmy31yjshkKieCdQ60M/fYcSBCCbNpJZDtqMRPaG6xe4LPM9E99P+jU\nMs6Qr4bPfv8+pdBhalHlJO2hqgp6LD87VaQfpe/7Df2m2JhhwdGwvOTY4kSnRspg\nNdBv1ApTmPayse4Cuga+OlJAmdxs9D0KfDgmvhT6AQKBgQD9y1hY3n9yIBxLKl8n\nQ9WIUbi61v0S9YgwxRmNZwpADLSA5GDyynuCQrJabDezzfSXm5s6O4v8csG9VoEQ\nyD9dEhefPTtktALNmZgyykWpcDS+EVWIjFDKqwoLHVIS3QNqUOn61FyFI7CsnInt\nF1bVn5CWKb6TNaGJd3HfYDFFgQKBgQDMcghxObzWG1E1kVMnCKtTX/VlWPil8FBR\n6qlsF1QRwT4GtGj8o3uroahEZ75lnrM9ErPJAFTmeypuVZLEt+MnvYcFNe97DZ64\nKa9UYmRubfRQzDpLNrQsSwnsUYd/Mai5f6tTtb21TwZx00yoSwP01WpbMG4WLUjq\nisjMblY5FQKBgA71qHx8iPiaKfDIS5mN5w1E++WPfJVcga2WQJ5UH4eM+CrMy2Yk\nR0lzUv3/eP0RO8Sf+HNjRSoZPZBChBMQKqP6yAer3U9fSPcDgbQkthx5r7IwZWFK\nHA0GLe5fyRGxk1z17gTJ9bYnV2elRoACKy0mXahsR35339CxiLXI/r6BAoGATJQa\nHW8nEHvC+3Gn1+MjaWN0I7YjzOQq8cQYGejTEKN1fEVvXdJOrIcs5BKH+sBrGuE6\nfnulUX+o8RMUmqLWbzhKruT5AvqjDRBwIAeK3uJItUsKOsoOytiAqwgO3NHZBUKR\nBhX5LUSggVpISHFw1fBqmiWV1rC3s0Kw3AIoQdECgYEAjKrAjYgMwpNJmASylGiV\ndgXWWZu97wH24UTo4c6W/7/cuQRPS5Fwnl0RH5D9nPV72h5BARImc15EGtZZSG5j\nVlZfxy2eGpUKfHSehb9nltLASm08Nbx1dOq8AOysrW8PI3lLpmdP/diVQLBnqTyC\nUSPW0IRjwQ3JteZUXM2tE8E=\n-----END PRIVATE KEY-----\n",
                    "client_email": "firebase-adminsdk-28dsf@adherer-3.iam.gserviceaccount.com",
                    "client_id": "110949534161363116896",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-28dsf%40adherer-3.iam.gserviceaccount.com",
                    "universe_domain": "googleapis.com"
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
