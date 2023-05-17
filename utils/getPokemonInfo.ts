import pokeApi from '../api/pokeApi';
import { Pokemon } from '../interfaces';

/**
 * This is a TypeScript function that retrieves information about a Pokemon by its name or ID using an
 * API and returns its ID, name, and sprites.
 * @param {string} nameOrId - nameOrId is a string parameter that represents the name or ID of a
 * Pokemon. It is used to make an API call to retrieve information about the Pokemon from the PokeAPI.
 * @returns The function `getPokemonInfo` is returning an object with the properties `id`, `name`, and
 * `sprites`. The values of these properties are obtained from the `data` object returned by a GET
 * request to the PokeAPI with the specified `nameOrId` parameter.
 */
export const getPokemonInfo = async (nameOrId: string) => {


    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

}

