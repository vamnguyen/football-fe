import axiosInstance from "@/lib/axiosInstance";
import { Competition, Area } from "@/lib/interface";

export const getArea = async (id: number): Promise<Area> => {
  const response = await axiosInstance.get(`/football-data/areas/${id}`);
  return response.data;
};

export const getAreaList = async (): Promise<Area[]> => {
  const response = await axiosInstance.get("/football-data/areas");
  return response.data;
};

export const getCompetitionList = async (): Promise<Competition[]> => {
  const response = await axiosInstance.get("/football-data/competitions");
  return response.data.competitions;
};

export const getCompetition = async (code: string): Promise<Competition> => {
  const response = await axiosInstance.get(
    `/football-data/competitions/${code}`
  );
  return response.data;
};

export const getCompetitionStandings = async ({
  code,
  matchday,
  season,
}: {
  code: string;
  matchday?: number;
  season?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/competitions/${code}/standings`,
    {
      params: {
        matchday,
        season,
      },
    }
  );
  return response.data;
};

export const getCompetitionMatches = async ({
  code,
  dateFrom,
  dateTo,
  stage,
  status,
  matchday,
  group,
  season,
}: {
  code: string;
  dateFrom?: string;
  dateTo?: string;
  stage?: string;
  status?: string;
  matchday?: string;
  group?: string;
  season?: string;
}): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/football-data/competitions/${code}/matches`,
      {
        params: {
          dateFrom,
          dateTo,
          stage,
          status,
          matchday,
          group,
          season,
        },
      }
    );
    return response.data.matches;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};

export const getCompetitionTeams = async ({
  code,
  season,
}: {
  code: string;
  season?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/competitions/${code}/teams`,
    {
      params: {
        season,
      },
    }
  );
  return response.data;
};

export const getCompetitionScorers = async ({
  code,
  season,
  limit,
}: {
  code: string;
  season?: string;
  limit?: number;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/competitions/${code}/scorers`,
    {
      params: {
        season,
        limit,
      },
    }
  );
  return response.data;
};

export const getTeamList = async ({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}): Promise<any> => {
  const response = await axiosInstance.get("/football-data/teams", {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};

export const getTeamMatches = async ({
  id,
  dateFrom,
  dateTo,
  season,
  competitions,
  status,
  venue,
  limit,
}: {
  id: number;
  dateFrom?: string;
  dateTo?: string;
  season?: string;
  competitions?: string;
  status?: string;
  venue?: string;
  limit?: number;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/teams/${id}/matches`,
    {
      params: {
        dateFrom,
        dateTo,
        season,
        competitions,
        status,
        venue,
        limit,
      },
    }
  );
  return response.data;
};

export const getPerson = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`/football-data/persons/${id}`);
  return response.data;
};

export const getPersonMatches = async ({
  id,
  dateFrom,
  dateTo,
  status,
  competitions,
  limit,
  offset,
}: {
  id: number;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  competitions?: string;
  limit?: number;
  offset?: number;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/persons/${id}/matches`,
    {
      params: {
        dateFrom,
        dateTo,
        status,
        competitions,
        limit,
        offset,
      },
    }
  );
  return response.data;
};

export const getMatch = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`/football-data/matches/${id}`);
  return response.data;
};

export const getMatchList = async ({
  competitions,
  ids,
  dateFrom,
  dateTo,
  status,
}: {
  competitions?: string;
  ids?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(`/football-data/matches`, {
    params: {
      competitions,
      ids,
      dateFrom,
      dateTo,
      status,
    },
  });
  return response.data;
};

export const getMatchHead2Head = async ({
  id,
  limit,
  dateFrom,
  dateTo,
  status,
}: {
  id: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/football-data/matches/${id}/head2head`,
    {
      params: {
        limit,
        dateFrom,
        dateTo,
        status,
      },
    }
  );
  return response.data;
};
