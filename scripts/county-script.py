import sys
import os

# EX command run
# python3 county-recoveries.py 08-06-2020 cases/recoveried/deaths Cameron 123 https://www.hidalgocounty.us/DocumentCenter/View/40152/08062020---Twenty-Two-people-die-of-COVID-19-complications-and-404-test-positive-for-the-virus Hidalgo 123 https://www.hidalgocounty.us/DocumentCenter/View/40152/08062020---Twenty-Two-people-die-of-COVID-19-complications-and-404-test-positive-for-the-virus Starr 123 https://www.themonitor.com/2020/08/06/22-covid-19-deaths-hidalgo-co/?fbclid=IwAR1lwpoTgD2h0BhMdBquhDPfFsipgiVGXnWQPV2pQtQkBmo1UXFJOymQkwQ Willacy 123 https://www.themonitor.com/2020/08/06/22-covid-19-deaths-hidalgo-co/?fbclid=IwAR1lwpoTgD2h0BhMdBquhDPfFsipgiVGXnWQPV2pQtQkBmo1UXFJOymQkwQ

if ((len(sys.argv) - 3) % 3 != 0):
    print('usage: command line not the right length\n')
    exit()

if (len(sys.argv) < 2):
    print('usage: command line arg 1 should be of the format 07/23/2020\n')
    exit()
if (len(sys.argv) < 3):
    print('usage: command line arg 2 should be the cases type - cases or recoveries\n')
    exit()
if (len(sys.argv) < 4):
    print('usage: command line arg 3 should be the county name\n')
    exit()
if (len(sys.argv) < 5):
    print('usage: command line arg 4 should be the recovery count for the county\n')
    exit()
if (len(sys.argv) < 6):
    print('usage: command line arg 5 should be the url link\n')
    exit()

TAB = '	'
SEPARATOR = ','

GENDER_MAP = {
    'F': 'Female',
    'M': 'Male',
    'Male': 'Male',
    'Female': 'Female',
    'U': ''
}

CITY_MAP = {
    'Brownsville': 'Brownsville',
    'Harlingen': 'Harlingen',
    'Los Fresnos': 'Los Fresnos',
    'San Benito': 'San Benito',
    'Port Isabel': 'Port Isabel',
    'Santa Rosa': 'Santa Rosa',
    'La Feria': 'La Feria',
    'Rio Hondo': 'Rio Hondo',
    'Laguna Vista': 'Laguna Vista',
    'Undisclosed': '',
    'Unknown': '',
    'OOA': ''
}

date = sys.argv[1]
casesType = sys.argv[2]
if (not os.path.exists(f'./{date}')):
    os.mkdir(f'./{date}')
outputFile = open(f'./{date}/output-{casesType}.csv', 'w+')
outputFile.write('Country,State,County,Date,Age,Gender,City,Link,Extra_info,Transmission\n')
countiesInCommandLine = int((len(sys.argv) - 2) / 3)
for i in range(countiesInCommandLine):
    county = sys.argv[3 + 3 * i]
    recoveriesCount = sys.argv[3 + 3 * i + 1]
    link = sys.argv[3 + 3 * i + 2]
    if (county == 'Cameron' and casesType == 'deaths'):
        with open(f'./{date}/cameron-deaths.txt', 'r') as f:
            date = date.replace('-', '/')
            i = 0
            city = ''
            for line in f:
                full_line = line
                line = line[:-1]
                if line in CITY_MAP.keys():
                    city = line
                    continue
                if full_line in CITY_MAP.keys():
                    city = line
                    continue
                gender = line.split()[0]
                ages = line.replace(',', '').split()[1:]
                for age in ages:
                    outputFile.write(f'USA{SEPARATOR}TX{SEPARATOR}{county}{SEPARATOR}{date}{SEPARATOR}{age}{SEPARATOR}{gender}{SEPARATOR}{city}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')        
    else:
        date = date.replace('-', '/')
        for j in range(int(recoveriesCount)):
            outputFile.write(f'USA{SEPARATOR}TX{SEPARATOR}{county}{SEPARATOR}{date}{SEPARATOR}-1{SEPARATOR}{SEPARATOR}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')

print(f'{casesType} file for county recoveries from {date} processed\n')
