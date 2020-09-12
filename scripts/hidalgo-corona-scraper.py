import sys

# EX command run
# python3 hidalgo-corona-scraper.py 08-06-2020 deaths https://www.hidalgocounty.us/DocumentCenter/View/40152/08062020---Twenty-Two-people-die-of-COVID-19-complications-and-404-test-positive-for-the-virus enumerated

AGE_RANGE_MAP = {
    '0-19': 11, 
    "20's": 21,
    '20s': 21,
    '30s': 31,
    "30's": 31,
    '40s': 41,
    "40's": 41,
    '50s': 51,
    "50's": 51,
    '60s': 61,
    "60's": 61,
    '70+': 71,
    'Unknown': -1,
    'unknown': -1
}

GENDER_MAP = {
    'F': 'Female',
    'M': 'Male',
    'Male': 'Male',
    'Female': 'Female',
    'U': ''
}

CITY_MAP = {
    'McAllen': 'McAllen',
    'Pharr': 'Pharr',
    'Weslaco': 'Weslaco',
    'Mission': 'Mission',
    'Hidalgo': 'Hidalgo',
    'Edinburg': 'Edinburg',
    'Donna': 'Donna',
    'Mercedes': 'Mercedes',
    'Alton': 'Alton',
    'San Juan': 'San Juan',
    'San	Juan': 'San Juan',
    'Alamo': 'Alamo',
    'La Joya': 'La Joya',
    'Penitas': 'Penitas',
    'Undisclosed': '',
    'undisclosed': '',
    'Unknown': '',
    'unknown': '',
    'OOA': ''
}

TAB = '	'
SEPARATOR = ','

if (len(sys.argv) < 2):
    print('usage: command line arg 1 should be of the format 07/23/2020\n')
    exit()
if (len(sys.argv) < 3):
    print('usage: command line arg 2 should be either cases or deaths\n')
    exit()
if (sys.argv[2] != 'cases' and sys.argv[2] != 'deaths'):
    print('usage: command line arg 2 should be either cases or deaths\n')
    exit()
if (len(sys.argv) < 4):
    print('usage: command line arg 3 should be the url link\n')
    exit()

date = sys.argv[1]
argv2 = sys.argv[2]
link = sys.argv[3]

enumerated = False

if (len(sys.argv) == 5):
    if (sys.argv[4] == 'enumerated'):
        enumerated = True

outputFileHidalgo = open(f'./{date}/output-hidalgo-{argv2}.csv', 'w')
outputFileHidalgo.write('Country,State,County,Date,Age,Gender,City,Link,Extra_info,Transmission\n')

with open(f'./{date}/hidalgo-{argv2}.txt', 'r') as f:
    date = date.replace('-', '/')
    k = 1
    for line in f:
        lineArr = line.split()
        i, j = 0, 0
        while (i < len(lineArr)):
            if (enumerated):
                if (j == 0):
                    lineArr.pop(0)

            lineItem = lineArr[i]
            if (lineItem in AGE_RANGE_MAP.keys() and (j % 3) == 0):
                outputFileHidalgo.write(f'USA{SEPARATOR}TX{SEPARATOR}Hidalgo{SEPARATOR}{date}{SEPARATOR}{AGE_RANGE_MAP[lineItem]}{SEPARATOR}')
                lineArr.pop(i)
                i-=1
            elif (lineItem in GENDER_MAP.keys() and (j % 3) == 1):
                outputFileHidalgo.write(f'{GENDER_MAP[lineItem]}{SEPARATOR}')
                lineArr.pop(i)
                i-=1
            elif (lineItem in CITY_MAP.keys() and (j % 3) == 2):
                outputFileHidalgo.write(f'{CITY_MAP[lineItem]}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')
                lineArr.pop(i)
                i-=1
            elif ((i + 1) < len(lineArr) and  f'{lineItem} {lineArr[i + 1]}' in CITY_MAP.keys()):
                outputFileHidalgo.write(f'{CITY_MAP[ lineItem + " " + lineArr[i + 1] ]}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')
                lineArr.pop(i)
                lineArr.pop(i)
                i-=1
            else:
                print(f'something wrong w line {k} - {lineArr}')
            i+=1
            j+=1
            if (j == 3): j = 0
        if len(lineArr) != 0:
            print(f'something wrong w line {k} - {lineArr}')
        k+=1
        # print(lineArr)

print(f'{argv2} file for Hidalgo from {date} processed\n')
