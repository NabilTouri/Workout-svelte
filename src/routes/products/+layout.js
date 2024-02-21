export const load = async (loadEvent) => {
    const { fetch, parent } = loadEvent
    const paramData = await parent()
    const { username } = paramData
    const title = 'Featured products'
    const response = await fetch("http://localhost:4000/featured-products")
    const featuredProducts = await response.json()
    return {
        username,
        title,
        featuredProducts,
    }
}