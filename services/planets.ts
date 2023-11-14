import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API } from '@config/constants';
import { useRef } from 'react';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
  currentPage?: string;
}

// QUERIES
//-------------------------------------------------------------------------------

let controller = new AbortController();

const fetchPlanets = async (queryParamsString: string): Promise<PlanetsResponse | null> => {
  try {
    controller = new AbortController();
    const response = await fetch(`${API}/planets?${queryParamsString}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error('Planets response failed');
    }
    return response.json() as Promise<PlanetsResponse>;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const usePlanetsQuery = (queryParams: { search?: string; page: string }) => {
  const lastResults = useRef<Planet[]>([]);
  const QueryClient = useQueryClient();
  const { search } = queryParams;
  const searchParams = new URLSearchParams(queryParams);
  if (search) {
    controller.abort();
    searchParams.delete('page');
  }
  const queryParamsString = searchParams.toString();
  return useQuery(['planets', queryParams], () => fetchPlanets(queryParamsString), {
    onSuccess: (data) => {
      if (search) return;
      lastResults.current = [...lastResults.current, ...data.results];
      QueryClient.setQueryData(['planets', queryParams], {
        ...data,
        results: lastResults.current,
        currentPage: queryParams.page,
      });
    },
  });
};
