import { StaticImageData } from "next/image";
import { FOOTBALL_TEAMS } from "./enum";
import {
  manCity,
  manUnited,
  liverpool,
  chelsea,
  arsenal,
  tottenham,
  westHam,
  everton,
  astonVilla,
  wolves,
  realMadrid,
  barcelona,
  atleticoMadrid,
  bayernMunich,
  borussiaDortmund,
  juventus,
  acMilan,
  interMilan,
  napoli,
  vietnam,
  thailand,
  cambodia,
  laos,
  philippines,
  malaysia,
  indonesia,
  singapore,
  myanmar,
  brunei,
} from "@/assets/logo-club/index";

export interface FootballTeam {
  name: FOOTBALL_TEAMS;
  logo: string | StaticImageData;
}

export type FootballTeamsMap = Record<FOOTBALL_TEAMS, FootballTeam>;

export const footballTeams: FootballTeamsMap = {
  // Premier League
  [FOOTBALL_TEAMS.MAN_UNITED]: {
    name: FOOTBALL_TEAMS.MAN_UNITED,
    logo: manUnited,
  },
  [FOOTBALL_TEAMS.MAN_CITY]: {
    name: FOOTBALL_TEAMS.MAN_CITY,
    logo: manCity,
  },
  [FOOTBALL_TEAMS.LIVERPOOL]: {
    name: FOOTBALL_TEAMS.LIVERPOOL,
    logo: liverpool,
  },
  [FOOTBALL_TEAMS.CHELSEA]: {
    name: FOOTBALL_TEAMS.CHELSEA,
    logo: chelsea,
  },
  [FOOTBALL_TEAMS.ARSENAL]: {
    name: FOOTBALL_TEAMS.ARSENAL,
    logo: arsenal,
  },
  [FOOTBALL_TEAMS.TOTTENHAM]: {
    name: FOOTBALL_TEAMS.TOTTENHAM,
    logo: tottenham,
  },
  [FOOTBALL_TEAMS.WEST_HAM]: {
    name: FOOTBALL_TEAMS.WEST_HAM,
    logo: westHam,
  },
  [FOOTBALL_TEAMS.EVERTON]: {
    name: FOOTBALL_TEAMS.EVERTON,
    logo: everton,
  },
  [FOOTBALL_TEAMS.ASTON_VILLA]: {
    name: FOOTBALL_TEAMS.ASTON_VILLA,
    logo: astonVilla,
  },
  [FOOTBALL_TEAMS.WOLVERHAMPTON]: {
    name: FOOTBALL_TEAMS.WOLVERHAMPTON,
    logo: wolves,
  },

  // La Liga
  [FOOTBALL_TEAMS.REAL_MADRID]: {
    name: FOOTBALL_TEAMS.REAL_MADRID,
    logo: realMadrid,
  },
  [FOOTBALL_TEAMS.BARCELONA]: {
    name: FOOTBALL_TEAMS.BARCELONA,
    logo: barcelona,
  },
  [FOOTBALL_TEAMS.ATLETICO_MADRID]: {
    name: FOOTBALL_TEAMS.ATLETICO_MADRID,
    logo: atleticoMadrid,
  },

  // Bundesliga
  [FOOTBALL_TEAMS.BAYERN_MUNICH]: {
    name: FOOTBALL_TEAMS.BAYERN_MUNICH,
    logo: bayernMunich,
  },
  [FOOTBALL_TEAMS.BORUSSIA_DORTMUND]: {
    name: FOOTBALL_TEAMS.BORUSSIA_DORTMUND,
    logo: borussiaDortmund,
  },

  // Serie A
  [FOOTBALL_TEAMS.JUVENTUS]: {
    name: FOOTBALL_TEAMS.JUVENTUS,
    logo: juventus,
  },
  [FOOTBALL_TEAMS.AC_MILAN]: {
    name: FOOTBALL_TEAMS.AC_MILAN,
    logo: acMilan,
  },
  [FOOTBALL_TEAMS.INTER_MILAN]: {
    name: FOOTBALL_TEAMS.INTER_MILAN,
    logo: interMilan,
  },
  [FOOTBALL_TEAMS.NAPOLI]: {
    name: FOOTBALL_TEAMS.NAPOLI,
    logo: napoli,
  },

  // National
  [FOOTBALL_TEAMS.VIETNAM]: {
    name: FOOTBALL_TEAMS.VIETNAM,
    logo: vietnam,
  },
  [FOOTBALL_TEAMS.THAILAND]: {
    name: FOOTBALL_TEAMS.THAILAND,
    logo: thailand,
  },
  [FOOTBALL_TEAMS.CAMBODIA]: {
    name: FOOTBALL_TEAMS.CAMBODIA,
    logo: cambodia,
  },
  [FOOTBALL_TEAMS.LAOS]: {
    name: FOOTBALL_TEAMS.LAOS,
    logo: laos,
  },
  [FOOTBALL_TEAMS.PHILIPPINES]: {
    name: FOOTBALL_TEAMS.PHILIPPINES,
    logo: philippines,
  },
  [FOOTBALL_TEAMS.MALAYSIA]: {
    name: FOOTBALL_TEAMS.MALAYSIA,
    logo: malaysia,
  },
  [FOOTBALL_TEAMS.INDONESIA]: {
    name: FOOTBALL_TEAMS.INDONESIA,
    logo: indonesia,
  },
  [FOOTBALL_TEAMS.SINGAPORE]: {
    name: FOOTBALL_TEAMS.SINGAPORE,
    logo: singapore,
  },
  [FOOTBALL_TEAMS.MYANMAR]: {
    name: FOOTBALL_TEAMS.MYANMAR,
    logo: myanmar,
  },
  [FOOTBALL_TEAMS.BRUNEI]: {
    name: FOOTBALL_TEAMS.BRUNEI,
    logo: brunei,
  },
};

export const footballTeamsArray = Object.values(footballTeams);
