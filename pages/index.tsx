import {
  Box,
  Text,
  Card,
  EmptyState,
  Loader,
  ListMenu,
  ItemMenu,
  Count,
  Search,
  Modal,
  InfiniteScrollList,
  Select,
} from '@components';
import React, { useState, ChangeEvent, useMemo, useCallback, useEffect } from 'react';
import { GeneralLayout } from '@layout';
import { usePlanetsQuery } from '@services/planets';
import Image from 'next/image';
import Theme from '@config/theme';
import styled from 'styled-components';
import { unescape } from 'querystring';
import { sortByMaxAndAlphabetical } from '@utils/helpers';

const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-gap: 7rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    grid-gap: 5rem;
    grid-template-rows: 0fr 1fr;
    grid-template-columns: 1fr;
  }

  .listContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-gap: 1rem;
    width: 100%;
  }
`;

export type stateType = {
  search: string; // search input
  climate: string | null; // climate selected from category
  selectedId: string | null; // id selected from card list to view detail (open modal)
  page: number;
  sort: string | null;
};

const Home = () => {
  const initialState = {
    search: '',
    climate: null,
    selectedId: null,
    page: 1,
    sort: null,
  };

  const [state, setState] = useState<stateType>(initialState);

  const { search, selectedId, climate, page, sort } = state;

  const {
    data: listData,
    isLoading: listLoading,
    isError: listError,
    refetch: listRefetch,
  } = usePlanetsQuery({ search, page: String(page) });

  useEffect(() => {
    if (listData?.previous === null) {
      setState((prevState) => ({
        ...prevState,
        page: 2,
      }));
    }
  }, [listData]);

  // Filter By Climate
  const filteredListData = useMemo(() => {
    return (
      listData?.results?.filter((item) => {
        let climateFilter = item?.climate === climate;
        if (climate) {
          return climateFilter;
        }
        return true;
      }) || []
    );
  }, [listData?.results, climate, sort]);

  const filteredSortedListData = useMemo(() => {
    if (sort) {
      return sortByMaxAndAlphabetical(filteredListData, sort);
    } else {
      return filteredListData;
    }
  }, [filteredListData, sort]);

  const handleClimateChange = useCallback(
    (id: string | null) => {
      if (id === climate) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setState((prevState) => ({
        ...prevState,
        climate: id,
      }));
    },
    [climate]
  );

  // Climate Types Options
  const planetsClimateTypes = useMemo(() => {
    return (
      listData?.results
        ?.sort((a, b) => (b.climate <= a.climate ? 1 : -1))
        .filter((e, i, self) => self[i]?.climate !== self[i + 1]?.climate && self[i]?.climate)
        .map((item) => ({
          id: item?.climate,
          text: item?.climate,
          onClick: () => handleClimateChange(item?.climate),
        })) || []
    );
  }, [listData?.results]);

  const ListMenuContent = useMemo(() => {
    return [
      {
        id: 'All',
        text: 'All',
        onClick: () => handleClimateChange(null),
      },
      ...planetsClimateTypes,
    ].map((item) => (
      <li key={`climate${item?.text?.toString()}`}>
        <ItemMenu
          fontSize="1.125rem"
          mb={1}
          buttonProps={{
            px: 0,
            py: 3,
          }}
          action={{ ...item }}
          active={climate === item?.id}
        />
      </li>
    ));
  }, [planetsClimateTypes, climate]);

  const selectedPlanet = useMemo(() => {
    return listData?.results?.find((item) => item?.name === selectedId);
  }, [listData?.results, selectedId]);

  const totalPages = listData?.count ? listData.count / 10 : 1;
  const currentPageLoaded = Number(listData?.currentPage ?? 0);

  return (
    <>
      <GridContainer>
        <Box>
          {listLoading || currentPageLoaded < 2 ? (
            <Box width="100%" display="flex" justifyContent="center" mt="3.625rem">
              <Loader />
            </Box>
          ) : (
            <ListMenu width="100%" pt={3} title="Climates" content={ListMenuContent} />
          )}
        </Box>

        <Box width="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb="1.25rem">
            <Box display="flex" alignItems="center">
              <Text
                as="h3"
                fontSize="1.125rem"
                color="black"
                fontWeight="bold"
                loading={listLoading}
                width={listLoading ? '1.462rem' : undefined}
              >
                {climate || 'All'}
              </Text>
              <Count
                ml={3}
                number={listData?.count ?? filteredSortedListData.length}
                loading={listLoading}
                width={listLoading ? '4.944rem' : undefined}
                height="2.625rem"
              />
              <Search
                id="search"
                name="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setState((prevState) => ({
                    ...prevState,
                    search: e.target.value,
                  }));
                }}
                value={search}
                placeholder="Search tags..."
                maxWidth="16rem"
                ml={3}
                loading={listLoading}
                width={listLoading ? '2.75rem' : undefined}
              />
            </Box>
            <Box>
              <Select
                id="sort"
                name="sort"
                options={[
                  { value: null, label: 'None' },
                  { value: 'name', label: 'Name' },
                  { value: 'diameter', label: 'Diameter' },
                  { value: 'population', label: 'Population' },
                ]}
                defaultValue={null}
                onChange={(newValue: { [key: string]: any }) => {
                  setState((prevState) => ({
                    ...prevState,
                    sort: newValue?.value,
                  }));
                }}
                value={sort}
                placeholder="Sort by"
                size="small"
                width="10rem"
                maxHeight="2.625rem"
                containerProps={{
                  width: 'auto',
                }}
                loading={listLoading}
              />
            </Box>
          </Box>

          {!listLoading && !filteredSortedListData.length && (
            <EmptyState
              mb={4}
              text={
                climate || search
                  ? 'No planets found for the selected filters'
                  : 'No planets found on our database'
              }
              icon="planets-empty"
            />
          )}

          {/* card list of planets */}
          {filteredSortedListData?.length > 0 && !listLoading && currentPageLoaded >= 2 && (
            <InfiniteScrollList
              hasMore={totalPages > page}
              loadMore={() => {
                if (currentPageLoaded === page && !listLoading) {
                  setState((prevState) => ({
                    ...prevState,
                    page: prevState.page + 1,
                  }));
                }
              }}
              threshold={50}
              className="listContainer"
              loader={
                <Box width="100%" display="flex" justifyContent="center">
                  <Loader />
                </Box>
              }
            >
              {filteredSortedListData?.map((item) => (
                <Card
                  key={`planet_${item?.name?.toString()}`}
                  title={item?.name}
                  description={`${item?.name} is a ${item?.climate} planet with ${item?.terrain} terrain. It has a population of ${item?.population} inhabitants, and its diameter is ${item?.diameter} km.`}
                  onClick={() =>
                    setState((prevState) => ({ ...prevState, selectedId: item?.name }))
                  }
                  size="medium"
                  cursor="pointer"
                />
              ))}
            </InfiniteScrollList>
          )}

          {listLoading || Number(currentPageLoaded ?? 0) < 2 ? (
            <Box width="100%" display="flex" justifyContent="center" mt="3.625rem">
              <Loader />
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </GridContainer>

      {/* show details of the selected planet */}
      {!!selectedId && (
        <Modal
          onClose={() => setState((prevState) => ({ ...prevState, selectedId: null }))}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            width="75%"
            height="80%"
            p={40}
            backgroundColor="white"
            borderRadius="16px"
            overflowY="auto"
          >
            <Text as="h2" fontSize="lg" color="black" fontWeight="bold" pb={24}>
              {selectedPlanet?.name}
            </Text>
            <Box>
              <Box display="flex" flexDirection="column">
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Rotation Period</b>: {selectedPlanet?.rotation_period || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Diameter</b>: {selectedPlanet?.diameter || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Climate</b>: {selectedPlanet?.climate || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Gravity</b>: {selectedPlanet?.gravity || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Terrain</b>: {selectedPlanet?.terrain || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal" pb={4}>
                  <b>Population</b>: {selectedPlanet?.population || 'N/A'}
                </Text>
                <Text fontSize="rg" color="black" fontWeight="normal">
                  <b>Orbital Period</b>: {selectedPlanet?.orbital_period || 'N/A'}
                </Text>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
