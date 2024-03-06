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
    const apiKey = 'mdSFB21Rg1wlfhJmUeT+aQ==Sq8gwUUGDxp8NOYB';
    const { fetch } = loadEvent;

    const allExercises = [];

    for (const muscleName of muscle) {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscleName}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data for muscle: ${muscleName}`);
        }

        const exercises = await response.json();
        allExercises.push(...exercises);
    }

    return new Response(JSON.stringify(allExercises), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
