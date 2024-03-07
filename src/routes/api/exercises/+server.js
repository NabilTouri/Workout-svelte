import { API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'

export const GET = async (loadEvent) => {
    const muscle = [
        'abdominals',
        'abductors',
        'adductors',
        'biceps',
        'calves',
        'chest',
        'forearms',
        'glutes',
        'hamstrings',
        'lats',
        'lower_back',
        'middle_back',
        'neck',
        'quadriceps',
        'traps',
        'triceps'
    ];
    const { fetch } = loadEvent;

    const allExercises = [];

    for (const muscleName of muscle) {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscleName}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data for muscle: ${muscleName}`);
        }

        const exercises = await response.json();
        allExercises.push(...exercises);
    }

    return json(allExercises);
}
