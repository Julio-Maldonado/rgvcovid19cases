const PRESS_RELEASES = [
  {
    date: "03/19/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/03-18-2020-Press-Release-Cameron-County-Confirms-Travel-Related-COVID-19-Vacationers.pdf",
    title: "Cameron County Confirms Travel-Related COVID-19 Vacationers",
  },
  {
    date: "03/20/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_2nd-TRC-3.21.2020.pdf",
    title: "Cameron County Confirms Second Travel Related COVID-19 Case",
  },
  {
    date: "03/21/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_Addlt-4-TRC-3.21.2020.pdf",
    title: "Cameron County Confirms Four More Travel Related COVID-19 Cases",
  },
  {
    date: "03/24/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/REV_COVID-19-Press-Release_1st-Comm-Spd.pdf",
    title: "Cameron County Confirms Seventh COVID-19 Case",
  },
  {
    date: "03/25/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_Addlt-3-TRC-3.25.2020.pdf",
    title: "Cameron County Confirms Additional Travel Related COVID-19 Cases",
  },
  {
    date: "03/26/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_Addlt-3-TRC-3-26-2020.pdf",
    title: "Three Additional COVID-19 Cases Reported in Cameron County",
  },
  {
    date: "03/28/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_2ndLocalTransmission_-3.28.2020.pdf",
    title: "Cameron County Confirms Second Community Transmission Case",
  },
  {
    date: "03/30/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/03/COVID-19-Press-Release_Cases21_26.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/01/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_27_27_4-1-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/02/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_38-55-4-2-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  // {
  //   date: "04/02/2020",
  //   url: "https://www.facebook.com/photo.php?fbid=10156798738612714&set=a.459648677713&type=3&theater",
  //   title: "",
  // },
  {
    date: "04/03/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_56_62-4-3-2020.pdf",
    title: "Cameron County Confirms Seven Additional COVID-19 Cases",
  },
  {
    date: "04/04/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_63_77-4-4-2020-Ver2.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/05/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_78_87-4-5-2020-Ver2-1.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/06/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_88_101-4-6-2020-002.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/07/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_102_108_4-7-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/08/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_109_118_4-8-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/09/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_119_147_4-9-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/10/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_148_159_4-10-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/11/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_160_195_4-11-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/13/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_196_216_4-13-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/14/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_217_239_4-14-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/15/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_240_254_4-15-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/16/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_255_270_PR23-4-16-2020.pdf",
    title: "Cameron County Confirms Fourth COVID-19 Related Death",
  },
  {
    date: "04/17/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_270_279_PR24-4-17-2020.pdf",
    title: "Cameron County Confirms Fifth COVID-19 Related Death",
  },
  {
    date: "04/18/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_280_298_PR25_4-18-2020-002.pdf",
    title: "Cameron County Confirms Sixth COVID-19 Related Death",
  },
  {
    date: "04/20/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_280_298_PR25_4-18-2020-002.pdf",
    title: "Cameron County Confirms Seventh COVID-19 Related Death",
  },
  {
    date: "04/21/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_311_321_PR27_4-21-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Related Deaths",
  }
];

const RESOURCES = [
  {
    description: "RGV Meal Pick Up Locations during Coronavirus",
    title: "KRGV Article",
    url: "https://www.valleycentral.com/news/local-news/meal-pickup-locations-for-rgv-school-districts/",
  },
  {
    description: "MISD Meal Pick Ups during Coronavirus",
    title: "MISD Website",
    url: "https://www.mcallenisd.org/apps/pages/meals",
  },
  {
    description: "HCISD Meal Pick Ups during Coronavirus",
    title: "HCISD Website",
    url: "https://www.hcisd.org/apps/pages/index.jsp?uREC_ID=1688567&type=d&pREC_ID=1866939",
  },
  {
    description: "LCISD Meal Pick Ups during Coronavirus",
    title: "LCISD Website",
    url: "https://www.lfcisd.net/offices/child_nutrition",
  },
  {
    description: "Check the status of your $1,200 stimulus check",
    title: "IRS Website",
    url: "https://www.irs.gov/coronavirus/get-my-payment",
  },
  {
    description: "Small Business Administration: Paycheck Protection Program info",
    title: "SBA Website",
    url: "https://www.sba.gov/funding-programs/loans/coronavirus-relief-options/paycheck-protection-program-ppp",
  },
  {
    description: "Make sure you're well during this pandemic",
    title: "Self-Care in the Time of Coronavirus",
    url: "https://childmind.org/article/self-care-in-the-time-of-coronavirus/",
  },
  {
    description: "Apply for Medicaid",
    title: "Medicaid Website",
    url: "https://www.medicaid.gov/",
  },
  {
    description: "Apply for Medicare",
    title: "Medicare Website",
    url: "https://www.medicare.gov/",
  },
];

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
      "Community": 0
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
    "Count": 4,
    "Gender": {
      "Male": 4,
      "Female": 0
    },
    "Transmission": {
      "Travel": 4,
      "Community": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 4,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 4,
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
    "Count": 16,
    "Gender": {
      "Male": 8,
      "Female": 8
    },
    "Transmission": {
      "Travel": 16,
      "Community": 0
    },
    "Ages": {
      "0 - 20": 8,
      "21 - 40": 4,
      "41 - 60": 4,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 4,
      "Brownsville": 8,
      "Rancho Viejo": 4,
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
    "Count": 4,
    "Gender": {
      "Male": 4,
      "Female": 0
    },
    "Transmission": {
      "Travel": 0,
      "Community": 4
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 4,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 4,
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
    "Count": 12,
    "Gender": {
      "Male": 8,
      "Female": 4
    },
    "Transmission": {
      "Travel": 12,
      "Community": 0
    },
    "Ages": {
      "0 - 20": 4,
      "21 - 40": 8,
      "41 - 60": 0,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 8,
      "Rancho Viejo": 4,
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
    "Count": 12,
    "Gender": {
      "Male": 12,
      "Female": 0
    },
    "Transmission": {
      "Travel": 12,
      "Community": 0
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 4,
      "41 - 60": 8,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 4,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 4,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 4,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/28",
    "Count": 28,
    "Gender": {
      "Male": 20,
      "Female": 8
    },
    "Transmission": {
      "Travel": 24,
      "Community": 4
    },
    "Ages": {
      "0 - 20": 0,
      "21 - 40": 12,
      "41 - 60": 12,
      "61 - 80": 4,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 20,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 4,
      "La Feria": 0,
      "San Benito": 4,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "3/30",
    "Count": 24,
    "Gender": {
      "Male": 16,
      "Female": 8
    },
    "Transmission": {
      "Travel": 20,
      "Community": 4
    },
    "Ages": {
      "0 - 20": 4,
      "21 - 40": 12,
      "41 - 60": 8,
      "61 - 80": 0,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 20,
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
  }
]

const DEFAULT_DEATHS = [
  {
    "Date": "4/05",
    "Count": 0,
    "Gender": {
      "Male": 0,
      "Female": 0
    },
    "Transmission": {
      "Travel": 0,
      "Community": 0
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
    "Date": "4/06",
    "Count": 1,
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
    "Date": "4/09",
    "Count": 2,
    "Gender": {
      "Male": 0,
      "Female": 2
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
      "81+": 2
    },
    "Cities": {
      "Harlingen": 2,
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
    "Date": "4/16",
    "Count": 1,
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
    "Date": "4/17",
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
      "21 - 40": 0,
      "41 - 60": 0,
      "61 - 80": 1,
      "81+": 0
    },
    "Cities": {
      "Harlingen": 0,
      "Brownsville": 0,
      "Rancho Viejo": 0,
      "Rio Hondo": 0,
      "Los Fresnos": 1,
      "La Feria": 0,
      "San Benito": 0,
      "Laguna Vista": 0,
      "Santa Rosa": 0,
      "Port Isabel": 0
    }
  },
  {
    "Date": "4/18",
    "Count": 1,
    "Gender": {
      "Male": 0,
      "Female": 1
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
  }
]

const DEFAULT_RECOVERIES = [
  {
    "Date": "4/02",
    "Count": 0,
    "Gender": {
      "Male": 0,
      "Female": 0
    },
    "Transmission": {
      "Travel": 0,
      "Community": 0
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
    "Date": "4/03",
    "Count": 10,
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
    "Date": "4/04",
    "Count": 1,
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
    "Date": "4/07",
    "Count": 7,
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
    "Date": "4/08",
    "Count": 5,
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
    "Date": "4/09",
    "Count": 22,
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
    "Date": "4/11",
    "Count": 17,
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
    "Date": "4/13",
    "Count": 8,
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
    "Date": "4/14",
    "Count": 3,
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
    "Date": "4/15",
    "Count": 11,
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
    "Date": "4/16",
    "Count": 12,
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
    "Date": "4/17",
    "Count": 6,
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
    "Date": "4/18",
    "Count": 6,
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
  }
]

const ENDPOINT_MAP = {
  "cases": "Cases",
  "deaths": "Deaths",
  "recoveries": "Recoveries"
}

const CATEGORY_MAP = {
  "Cities": "City",
  "Ages": "Age Range",
  "Transmission": "Transmission",
  "Gender": "Gender",
}

export {
  PRESS_RELEASES,
  RESOURCES,
  ENDPOINT_MAP,
  CATEGORY_MAP,
  DEFAULT_CASES,
  DEFAULT_DEATHS,
  DEFAULT_RECOVERIES,
};
