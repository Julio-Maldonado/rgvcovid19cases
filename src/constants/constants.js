import CAMERON_ACTIVE_CASES from './CAMERON_ACTIVE_CASES';
import CAMERON_DEFAULT_CASES from './CAMERON_DEFAULT_CASES';
import CAMERON_DEFAULT_DEATHS from './CAMERON_DEFAULT_DEATHS';
import CAMERON_DEFAULT_RECOVERIES from './CAMERON_DEFAULT_RECOVERIES';

import HIDALGO_ACTIVE_CASES from './HIDALGO_ACTIVE_CASES';
import HIDALGO_DEFAULT_CASES from './HIDALGO_DEFAULT_CASES';
import HIDALGO_DEFAULT_DEATHS from './HIDALGO_DEFAULT_DEATHS';
import HIDALGO_DEFAULT_RECOVERIES from './HIDALGO_DEFAULT_RECOVERIES';

import STARR_ACTIVE_CASES from './STARR_ACTIVE_CASES';
import STARR_DEFAULT_CASES from './STARR_DEFAULT_CASES';
import STARR_DEFAULT_DEATHS from './STARR_DEFAULT_DEATHS';
import STARR_DEFAULT_RECOVERIES from './STARR_DEFAULT_RECOVERIES';

import WILLACY_ACTIVE_CASES from './WILLACY_ACTIVE_CASES';
import WILLACY_DEFAULT_CASES from './WILLACY_DEFAULT_CASES';
import WILLACY_DEFAULT_DEATHS from './WILLACY_DEFAULT_DEATHS';
import WILLACY_DEFAULT_RECOVERIES from './WILLACY_DEFAULT_RECOVERIES';

import PRESS_RELEASES from './PRESS_RELEASES';

import RESOURCES from './RESOURCES';

const CORE_ENDPOINT_ARRAY = [
  "cases",
  "deaths",
  "recoveries"
]

const ENDPOINT_MAP = {
  "cases": "Cases",
  "deaths": "Deaths",
  "recoveries": "Recoveries",
  "active": "Active Cases",
  "home": "home",
}

const ENDPOINT_SINGULAR_MAP = {
    "cases": "case",
    "deaths": "death",
    "recoveries": "recovery",
}

const CATEGORY_MAP = {
  "Cities": "City",
  "Ages": "Age Range",
  "Transmission": "Transmission",
  "Gender": "Gender",
}

const LINE_COLOR_MAP = {
  "active": "#2B8AC5",
  "recoveries": "#2E8B57",
  "deaths": "#000",
  "cases": "#2B8AC5",
  "hidalgo": "#2B8AC5",
  "cameron": "#2E8B57",
  "starr": "#DDA0DD",
  "willacy": "#FFFF99"
}

const GRAPH_COLOR_MAP = {
  "active": "grey",
  "recoveries": "#ebffeb",
  "deaths": "black",
  "cases": "#700D00",
  "home": "grey"
}

const LAST_DAY_STATS_ORIGINAL = {
    "cameron": {
        "total": 0,
        "gender": {
            "male": 0,
            "female": 0,
            "unknown": 0
        },
        "transmission": {
            "travel": 0,
            "community": 0,
            "linkedToPreviousCase": 0,
            "unknown": 0
        },
        "ages": {
            "0 - 19": 0,
            "20 - 29": 0,
            "30 - 39": 0,
            "40 - 49": 0,
            "50 - 59": 0,
            "60 - 69": 0,
            "70+": 0,
            "unknown": 0
        },
        "cities": {
            "Harlingen": 0,
            "Bayview": 0,
            "Brownsville": 0,
            "Rancho Viejo": 0,
            "Rio Hondo": 0,
            "Los Fresnos": 0,
            "La Feria": 0,
            "San Benito": 0,
            "Laguna Vista": 0,
            "Santa Rosa": 0,
            "Port Isabel": 0,
            "Palm Valley": 0,
            "Olmito": 0,
            "Los Indios": 0,
            "Combes": 0,
            "Primera": 0,
            "Indian Lake": 0,
            "Santa Maria": 0,
            "South Padre Island": 0,
            "unknown": 0
        }
    },
    "hidalgo": {
        "total": 0,
        "gender": {
            "male": 0,
            "female": 0,
            "unknown": 0
        },
        "transmission": {
            "travel": 0,
            "community": 0,
            "linkedToPreviousCase": 0,
            "unknown": 0
        },
        "ages": {
            "0 - 19": 0,
            "20 - 29": 0,
            "30 - 39": 0,
            "40 - 49": 0,
            "50 - 59": 0,
            "60 - 69": 0,
            "70+": 0,
            "unknown": 0
        },
        "cities": {
            "McAllen": 0,
            "Alamo": 0,
            "Edinburg": 0,
            "Mission": 0,
            "San Juan": 0,
            "Pharr": 0,
            "Mercedes": 0,
            "Weslaco": 0,
            "Donna": 0,
            "Hidalgo": 0,
            "La Joya": 0,
            "Edcouch": 0,
            "Palmview": 0,
            "Elsa": 0,
            "Alton": 0,
            "unknown": 0
        }
    },
    "starr": {
        "total": 0,
        "gender": {
            "male": 0,
            "female": 0,
            "unknown": 0
        },
        "transmission": {
            "travel": 0,
            "community": 0,
            "linkedToPreviousCase": 0,
            "unknown": 0
        },
        "ages": {
            "0 - 19": 0,
            "20 - 29": 0,
            "30 - 39": 0,
            "40 - 49": 0,
            "50 - 59": 0,
            "60 - 69": 0,
            "70+": 0,
            "unknown": 0
        },
        "cities": {
            "Rio Grande City": 0,
            "Escobares": 0,
            "La Grulla": 0,
            "Roma": 0,
            "unknown": 0
        }
    },
    "willacy": {
        "total": 0,
        "gender": {
            "male": 0,
            "female": 0,
            "unknown": 0
        },
        "transmission": {
            "travel": 0,
            "community": 0,
            "linkedToPreviousCase": 0,
            "unknown": 0
        },
        "ages": {
            "0 - 19": 0,
            "20 - 29": 0,
            "30 - 39": 0,
            "40 - 49": 0,
            "50 - 59": 0,
            "60 - 69": 0,
            "70+": 0,
            "unknown": 0
        },
        "cities": {
            "unknown": 0
        }
    }
}

const CITIES_MAP = {
  "cameron": [
    "Harlingen",
    "Bayview",
    "Brownsville",
    "Rancho Viejo",
    "Rio Hondo",
    "Los Fresnos",
    "La Feria",
    "San Benito",
    "Laguna Vista",
    "Santa Rosa",
    "Port Isabel",
    "Palm Valley",
    "Olmito",
    "Los Indios",
    "Combes",
    "Primera",
    "Indian Lake",
    "Santa Maria",
    "South Padre Island",
  ],
  "hidalgo": [
    "McAllen",
    "Alamo",
    "Edinburg",
    "Mission",
    "San Juan",
    "Pharr",
    "Mercedes",
    "Weslaco",
    "Donna",
    "Hidalgo",
    "La Joya",
    "Edcouch",
    "Palmview",
    "Elsa",
    "Alton"
  ],
  "starr": [
    "Rio Grande City",
    "Escobares",
    "La Grulla",
    "Roma"
  ],
  "willacy": []
}

export {
  PRESS_RELEASES,
  RESOURCES,
  ENDPOINT_MAP,
  ENDPOINT_SINGULAR_MAP,
  CATEGORY_MAP,
  CORE_ENDPOINT_ARRAY,
  CAMERON_ACTIVE_CASES,
  CAMERON_DEFAULT_CASES,
  CAMERON_DEFAULT_DEATHS,
  CAMERON_DEFAULT_RECOVERIES,
  HIDALGO_ACTIVE_CASES,
  HIDALGO_DEFAULT_CASES,
  HIDALGO_DEFAULT_DEATHS,
  HIDALGO_DEFAULT_RECOVERIES,
  STARR_ACTIVE_CASES,
  STARR_DEFAULT_CASES,
  STARR_DEFAULT_DEATHS,
  STARR_DEFAULT_RECOVERIES,
  WILLACY_ACTIVE_CASES,
  WILLACY_DEFAULT_CASES,
  WILLACY_DEFAULT_DEATHS,
  WILLACY_DEFAULT_RECOVERIES,
  LINE_COLOR_MAP,
  GRAPH_COLOR_MAP,
  LAST_DAY_STATS_ORIGINAL,
  CITIES_MAP,
};
