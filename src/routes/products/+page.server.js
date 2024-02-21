export const load = async (serverLoadEvent) => {
    console.log("Load function called in page.server.js")
    const { fetch } = serverLoadEvent
    // const paramData = await parent()
    // const { username } = paramData
    const title = "List of avariable products"
    const response = await fetch("http://localhost:4000/products")
    const products = await response.json()
    return {
        // username,
        title,
        products,
    }
}