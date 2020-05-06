import CAMERON_DEFAULT_CASES from './CAMERON_DEFAULT_CASES';
import CAMERON_DEFAULT_DEATHS from './CAMERON_DEFAULT_DEATHS';
import CAMERON_DEFAULT_RECOVERIES from './CAMERON_DEFAULT_RECOVERIES';
import HIDALGO_DEFAULT_CASES from './HIDALGO_DEFAULT_CASES';
import HIDALGO_DEFAULT_DEATHS from './HIDALGO_DEFAULT_DEATHS';
import HIDALGO_DEFAULT_RECOVERIES from './HIDALGO_DEFAULT_RECOVERIES';

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
  },
  {
    date: "04/22/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_322_333_PR28_4-22-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Related Deaths",
  },
  {
    date: "04/23/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_334_344_PR29_4-23-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Related Deaths",
  },
  {
    date: "04/24/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_345_354_PR30_4-24-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/25/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_355_366_PR31_4-25-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/27/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_367_376_PR32_4-27-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Cases",
  },
  {
    date: "04/28/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_377_387_PR33_4-28-2020.pdf",
    title: "Cameron County Confirms Additional COVID-19 Related Deaths",
  },
  {
    date: "04/29/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_388-401_PR34_4-29-2020.pdf",
    title: "Cameron County Confirms COVID-19 Related Death",
  },
  {
    date: "04/30/2020",
    url: "https://www.cameroncounty.us/wp-content/uploads/2020/04/COVID-19-Press-Release_402_412_PR35_4-30-2020.pdf",
    title: "Cameron County Confirms COVID-19 Related Death",
  }
];

const RESOURCES = [
  {
    description: "Promote Care and Prevent Harm",
    title: "Spread The Word",
    url: "https://promotecarepreventharm.org/"
  },
  {
    description: "RGV Meal Pick Up Locations during Coronavirus",
    title: "KRGV Article",
    url: "https://www.valleycentral.com/news/local-news/meal-pickup-locations-for-rgv-school-districts/",
  },
  {
    description: "COVID 19 Impacted Families can Apply for Benefits",
    title: "Hidalgo County Disaster Assistance Application",
    url: "https://www.hidalgocounty.us/744/Download-Application",
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

const ENDPOINT_MAP = {
  "cases": "Cases",
  "deaths": "Deaths",
  "recoveries": "Recoveries"
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
  "recoveries": "#2E8B57",
  "deaths": "#000",
  "cases": "#2B8AC5",
}

const GRAPH_COLOR_MAP = {
  "recoveries": "#fff",
  "deaths": "#9B3133",
  "cases": "#CD0D00",
}

export {
  PRESS_RELEASES,
  RESOURCES,
  ENDPOINT_MAP,
  ENDPOINT_SINGULAR_MAP,
  CATEGORY_MAP,
  CAMERON_DEFAULT_CASES,
  CAMERON_DEFAULT_DEATHS,
  CAMERON_DEFAULT_RECOVERIES,
  HIDALGO_DEFAULT_CASES,
  HIDALGO_DEFAULT_DEATHS,
  HIDALGO_DEFAULT_RECOVERIES,
  LINE_COLOR_MAP,
  GRAPH_COLOR_MAP,
};
