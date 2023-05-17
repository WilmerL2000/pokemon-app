import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorite } from '../../utils';

type PokemonProps = {
  pokemon: Pokemon;
};

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorite.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorite.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

/**
 * This function generates an array of paths for 151 Pokemon pages to be pre-rendered in a Next.js app.
 * @returns This code is returning an object with two properties: `paths` and `fallback`. The `paths`
 * property is an array of objects, where each object represents a path to a specific page. The
 * `fallback` property determines what happens when a user requests a page that is not pre-generated.
 * In this case, it is set to `false`, which means that if a user requests a page that
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = [...Array(151)].map((value, idx) => `${idx + 1}`);
  return {
    paths: pokemons.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  /* This code block is checking if the `pokemon` object is falsy (i.e., `null`, `undefined`, `false`,
`0`, `NaN`, or an empty string). If it is falsy, it means that the requested Pokemon does not exist,
so the function returns a redirect object that redirects the user to the homepage (`'/'`) with a
`permanent` property set to `false`, which means that the redirect is temporary and search engines
should not update their links. */
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { pokemon },
    revalidate: 40000,
  };
};

export default Pokemon;
