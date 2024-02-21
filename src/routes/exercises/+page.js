import Exercise from "./exercise.svelte"

export const load =async (loadEvent) => {
    const { data } = loadEvent

    return {
        ...data,
        Component: Exercise,
    }
}