const DEFAULT_CASES = [
  {
    "Date": "3/18",
    "Count": 0,
    "Gender": {
      "Male": 0,
      "Female": 0
    },
    "Transmission": {
      "Travel": 0,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 0,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/19",
    "Count": 1,
    "Gender": {
      "Male": 1,
      "Female": 0
    },
    "Transmission": {
      "Travel": 1,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 1,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 1,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/20",
    "Count": 1,
    "Gender": {
      "Male": 1,
      "Female": 0
    },
    "Transmission": {
      "Travel": 1,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 0,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 1
    },
    "Cities": {
      "Harlingen": 1,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/21",
    "Count": 4,
    "Gender": {
      "Male": 2,
      "Female": 2
    },
    "Transmission": {
      "Travel": 4,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 1,
      "41 - 60": 1,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 1,
      "Brownsville": 2,
      "Rancho Viejo": 1,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/24",
    "Count": 1,
    "Gender": {
      "Male": 1,
      "Female": 0
    },
    "Transmission": {
      "Travel": 0,
      "Community": 1,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 1,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 1,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/25",
    "Count": 3,
    "Gender": {
      "Male": 2,
      "Female": 1
    },
    "Transmission": {
      "Travel": 3,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 2,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 2,
      "Rancho Viejo": 1,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/26",
    "Count": 3,
    "Gender": {
      "Male": 3,
      "Female": 0
    },
    "Transmission": {
      "Travel": 3,
      "Community": 0,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 1,
      "41 - 60": 2,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 1,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 1,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/28",
    "Count": 7,
    "Gender": {
      "Male": 5,
      "Female": 2
    },
    "Transmission": {
      "Travel": 6,
      "Community": 1,
      "Linked To Previous Case": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 3,
      "41 - 60": 3,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 5,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/30",
    "Count": 6,
    "Gender": {
      "Male": 4,
      "Female": 2
    },
    "Transmission": {
      "Travel": 4,
      "Community": 1,
      "Linked To Previous Case": 1
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 2,
      "41 - 60": 1,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 5,
      "Brownsville": 1,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/01",
    "Count": 11,
    "Gender": {
      "Male": 6,
      "Female": 5
    },
    "Transmission": {
      "Travel": 3,
      "Community": 4,
      "Linked To Previous Case": 4
    },
    "Ages": {
      "0 - 20": 6,
      "21 - 40": 2,
      "41 - 60": 2,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 2,
      "Brownsville": 7,
      "Rancho Viejo": 0,
      "Rio Hondo": 1,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/02",
    "Count": 18,
    "Gender": {
      "Male": 3,
      "Female": 6
    },
    "Transmission": {
      "Travel": 0,
      "Community": 2,
      "Linked To Previous Case": 7
    },
    "Ages": {
      "0 - 20": 11,
      "21 - 40": 5,
      "41 - 60": 2,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 5,
      "Brownsville": 5,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 3,
      "La Feria": 1,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 2,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/03",
    "Count": 7,
    "Gender": {
      "Male": 2,
      "Female": 5
    },
    "Transmission": {
      "Travel": 1,
      "Community": 2,
      "Linked To Previous Case": 4
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 1,
      "41 - 60": 4,
      "61 - 80": 1,
      "81+": 1
    },
    "Cities": {
      "Harlingen": 1,
      "Brownsville": 4,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 1,
      "Port Isabel": 1
    }
  },
  {
    "Date": "4/04",
    "Count": 15,
    "Gender": {
      "Male": 8,
      "Female": 7
    },
    "Transmission": {
      "Travel": 2,
      "Community": 1,
      "Linked To Previous Case": 12
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 1,
      "41 - 60": 4,
      "61 - 80": 2,
      "81+": 7
    },
    "Cities": {
      "Harlingen": 11,
      "Brownsville": 3,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/05",
    "Count": 10,
    "Gender": {
      "Male": 6,
      "Female": 4
    },
    "Transmission": {
      "Travel": 2,
      "Community": 2,
      "Linked To Previous Case": 6
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 4,
      "41 - 60": 2,
      "61 - 80": 2,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 1,
      "Brownsville": 9,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/06",
    "Count": 14,
    "Gender": {
      "Male": 3,
      "Female": 11
    },
    "Transmission": {
      "Travel": 1,
      "Community": 3,
      "Linked To Previous Case": 10
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 3,
      "41 - 60": 6,
      "61 - 80": 2,
      "81+": 2
    },
    "Cities": {
      "Harlingen": 5,
      "Brownsville": 4,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 2,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 2,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/07",
    "Count": 7,
    "Gender": {
      "Male": 3,
      "Female": 4
    },
    "Transmission": {
      "Travel": 0,
      "Community": 0,
      "Linked To Previous Case": 7
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 0,
      "41 - 60": 3,
      "61 - 80": 2,
      "81+": 2
    },
    "Cities": {
      "Harlingen": 5,
      "Brownsville": 2,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/08",
    "Count": 10,
    "Gender": {
      "Male": 5,
      "Female": 5
    },
    "Transmission": {
      "Travel": 3,
      "Community": 3,
      "Linked To Previous Case": 4
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 3,
      "41 - 60": 3,
      "61 - 80": 4,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 3,
      "Brownsville": 5,
      "Rancho Viejo": 1,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 1
    }
  },
  {
    "Date": "4/09",
    "Count": 29,
    "Gender": {
      "Male": 12,
      "Female": 17
    },
    "Transmission": {
      "Travel": 1,
      "Community": 1,
      "Linked To Previous Case": 25
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 5,
      "41 - 60": 9,
      "61 - 80": 7,
      "81+": 7
    },
    "Cities": {
      "Harlingen": 21,
      "Brownsville": 2,
      "Rancho Viejo": 0,
      "Rio Hondo": 1,
      "Los Fresnos": 1,
      "La Feria": 2,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/10",
    "Count": 12,
    "Gender": {
      "Male": 6,
      "Female": 6
    },
    "Transmission": {
      "Travel": 0,
      "Community": 2,
      "Linked To Previous Case": 10
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 3,
      "41 - 60": 7,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 3,
      "Brownsville": 7,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 1,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/11",
    "Count": 36,
    "Gender": {
      "Male": 17,
      "Female": 19
    },
    "Transmission": {
      "Travel": 0,
      "Community": 4,
      "Linked To Previous Case": 32
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 10,
      "41 - 60": 9,
      "61 - 80": 5,
      "81+": 10
    },
    "Cities": {
      "Harlingen": 17,
      "Brownsville": 14,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 3,
      "La Feria": 0,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/13",
    "Count": 21,
    "Gender": {
      "Male": 12,
      "Female": 9
    },
    "Transmission": {
      "Travel": 0,
      "Community": 0,
      "Linked To Previous Case": 21
    },
    "Ages": {
      "0 - 20": 1,
      "21 - 40": 3,
      "41 - 60": 0,
      "61 - 80": 7,
      "81+": 10
    },
    "Cities": {
      "Harlingen": 17,
      "Brownsville": 4,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/14",
    "Count": 23,
    "Gender": {
      "Male": 12,
      "Female": 11
    },
    "Transmission": {
      "Travel": 2,
      "Community": 5,
      "Linked To Previous Case": 16
    },
    "Ages": {
      "0 - 20": 7,
      "21 - 40": 7,
      "41 - 60": 8,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 3,
      "Brownsville": 6,
      "Rancho Viejo": 0,
      "Rio Hondo": 9,
      "Los Fresnos": 0,
      "La Feria": 3,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/15",
    "Count": 15,
    "Gender": {
      "Male": 3,
      "Female": 12
    },
    "Transmission": {
      "Travel": 1,
      "Community": 1,
      "Linked To Previous Case": 13
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 3,
      "41 - 60": 8,
      "61 - 80": 1,
      "81+": 3
    },
    "Cities": {
      "Harlingen": 10,
      "Brownsville": 1,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 3,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/16",
    "Count": 16,
    "Gender": {
      "Male": 4,
      "Female": 12
    },
    "Transmission": {
      "Travel": 1,
      "Community": 8,
      "Linked To Previous Case": 7
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 9,
      "41 - 60": 2,
      "61 - 80": 3,
      "81+": 2
    },
    "Cities": {
      "Harlingen": 3,
      "Brownsville": 5,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 2,
      "La Feria": 0,
      "San Benito": 3,
      "Laguna Vista": 0,
      "Santa Rosa": 2,
      "Port Isabel": 1
    }
  },
  {
    "Date": "4/17",
    "Count": 9,
    "Gender": {
      "Male": 3,
      "Female": 6
    },
    "Transmission": {
      "Travel": 1,
      "Community": 1,
      "Linked To Previous Case": 7
    },
    "Ages": {
      "0 - 20": 3,
      "21 - 40": 1,
      "41 - 60": 2,
      "61 - 80": 2,
      "81+": 1
    },
    "Cities": {
      "Harlingen": 2,
      "Brownsville": 5,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/18",
    "Count": 19,
    "Gender": {
      "Male": 4,
      "Female": 15
    },
    "Transmission": {
      "Travel": 0,
      "Community": 4,
      "Linked To Previous Case": 15
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 2,
      "41 - 60": 6,
      "61 - 80": 4,
      "81+": 5
    },
    "Cities": {
      "Harlingen": 14,
      "Brownsville": 3,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 1,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/20",
    "Count": 12,
    "Gender": {
      "Male": 7,
      "Female": 5
    },
    "Transmission": {
      "Travel": 3,
      "Community": 3,
      "Linked To Previous Case": 6
    },
    "Ages": {
      "0 - 20": 2,
      "21 - 40": 2,
      "41 - 60": 6,
      "61 - 80": 2,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 3,
      "Brownsville": 4,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 4,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/21",
    "Count": 11,
    "Gender": {
      "Male": 4,
      "Female": 7
    },
    "Transmission": {
      "Travel": 0,
      "Community": 1,
      "Linked To Previous Case": 10
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 2,
      "41 - 60": 3,
      "61 - 80": 0,
      "81+": 6
    },
    "Cities": {
      "Harlingen": 7,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 1,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/22",
    "Count": 12,
    "Gender": {
      "Male": 3,
      "Female": 9
    },
    "Transmission": {
      "Travel": 0,
      "Community": 2,
      "Linked To Previous Case": 10
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 3,
      "41 - 60": 5,
      "61 - 80": 3,
      "81+": 1
    },
    "Cities": {
      "Harlingen": 1,
      "Brownsville": 7,
      "Rancho Viejo": 0,
      "Rio Hondo": 1,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 1,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/23",
    "Count": 11,
    "Gender": {
      "Male": 6,
      "Female": 5
    },
    "Transmission": {
      "Travel": 0,
      "Community": 2,
      "Linked To Previous Case": 9
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 5,
      "41 - 60": 4,
      "61 - 80": 1,
      "81+": 1
    },
    "Cities": {
      "Harlingen": 6,
      "Brownsville": 3,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 0,
      "La Feria": 0,
      "San Benito": 2,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  }
];

export default DEFAULT_CASES;
