// src/routes/example.svelte

export async function load() {
        const muscle = 'biceps';
        const apiKey = 'mdSFB21Rg1wlfhJmUeT+aQ==Sq8gwUUGDxp8NOYB';

        // Make a GET request to your API endpoint
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error('Failed to fetch data from the API');
        }
        else
        {
            console.log("Response is ok")
        }

        // Extract the data from the response
        const exercises = await response.json();
        console.log(exercises)
        // Return the data to be used in the component
        return {
                exercises
        };
}
