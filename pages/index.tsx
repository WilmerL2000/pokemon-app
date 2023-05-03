import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Layout } from '../components/layouts';
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon;
}

const Home: NextPage<Props> = ({ pokemons }) => {
  console.log({ pokemons });
  return (
    <Layout title="Listado de Pokemons">
      <ul>
        {pokemons.map(({ id, name }) => (
          <li key={id}>
            #{id} - {name}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((pokemon, idx) => ({
    ...pokemon,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      idx + 1
    }.svg`,
  }));

  return {
    props: { pokemons },
  };
};

export default Home;
