/**
 * The function toggles the favorite status of a Pokemon by adding or removing its ID from the
 * favorites list stored in local storage.
 * @param {number} id - a number representing the ID of a Pokemon that the user wants to add or remove
 * from their favorites list.
 */
const toggleFavorite = (id: number) => {

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (favorites.includes(id)) {
        favorites = favorites.filter(pokeId => pokeId !== id)
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

/**
 * This TypeScript function checks if a given ID exists in the user's favorites list stored in local
 * storage.
 * @param {number} id - The `id` parameter is a number representing the identifier of an item that we
 * want to check if it exists in the user's favorites list. The function checks if this `id` is present
 * in the array of favorite items stored in the browser's local storage.
 * @returns The function `existInFavorites` returns a boolean value indicating whether the provided
 * `id` exists in the `favorites` array stored in the browser's `localStorage`. If the `localStorage`
 * is not available (e.g. when running the code on the server-side), the function returns `false`.
 */
const existInFavorites = (id: number): boolean => {

    if (typeof window === 'undefined') return false

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    return favorites.includes(id)
}

/**
 * The function retrieves an array of favorite Pokemon IDs from local storage.
 * @returns An array of numbers is being returned. The numbers represent the IDs of the favorite
 * Pokemons stored in the browser's local storage. If there are no favorites stored, an empty array is
 * returned.
 */
const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')

}

export default { toggleFavorite, existInFavorites, pokemons }