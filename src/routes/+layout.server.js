import { json } from "@sveltejs/kit"

export const load = async ({ cookies }) => {
    const cookie = cookies.get('session_token')
    return { cookie }
}