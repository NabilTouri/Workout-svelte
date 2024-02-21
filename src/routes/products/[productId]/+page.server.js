import { redirect } from '@sveltejs/kit'

export const load =async (serverLoadEvent) => {
    const { fetch, params } = serverLoadEvent
    const { productId } = params
    if (productId > 3) {
        // throw error(404, {
        //     message: 'Oh no! Looks like this product is currently not available.',
        //     hint: 'Try a different product.'
        // }) // This will show the error page
        throw redirect(307, '/products') // This will redirect to the products page
    }
    const title = 'Product details'
    const notification = "End of season sale! 50% off"
    const response = await fetch(`http://localhost:4000/products/${productId}`)
    const product = await response.json()
    return {
        title,
        product,
        notification,
    }
}