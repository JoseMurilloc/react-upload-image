// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useMemo } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Card } from '../components/Card';

type fetchImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  const getCardsFaunaDB = useCallback(
    async ({ pageParam = null }): Promise<fetchImagesResponse> => {
      if (pageParam) {
        const response = await api.get(`/images`, {
          params: {
            after: pageParam,
          },
        });

        return response.data;
      }

      const response = await api.get(`/images`);

      return response.data;
    },
    []
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getCardsFaunaDB, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    let formattedDataTotal = [] as Card[];
    const dataPages = data?.pages;

    dataPages?.map(page => {
      formattedDataTotal = [...formattedDataTotal, ...page.data];
      // eslint-disable-next-line no-useless-return
      return;
    });

    return formattedDataTotal;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="1rem"
            onClick={() => fetchNextPage()}
            role="button"
            w={['100%', 'auto']}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
