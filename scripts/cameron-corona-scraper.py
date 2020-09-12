import sys

TAB = '	'
SEPARATOR = ','

AGE_RANGE_MAP = [
    9,       # 0 - 9
    19,      # 10 - 19
    29,      # 20 - 29
    39,      # 30 - 39
    49,      # 40 - 49
    59,      # 50 - 59
    69,      # 60 - 69
    79,      # 70 - 79
    89,      # 80 - 89
    91       # 90+
]

if (len(sys.argv) < 2):
    print('usage: command line arg 1 should be of the format 07-23-2020\n')
    exit()
if (len(sys.argv) < 3):
    print('usage: command line arg 2 should be the link of the source\n')
    exit()

date = sys.argv[1]
link = sys.argv[2]

outputFileCameron = open(f'./{date}/output-cameron-cases.csv', 'w')
outputFileCameron.write('Country,State,County,Date,Age,Gender,City,Link,Extra_info,Transmission\n')
with open(f'./{date}/cameron-cases.txt', 'r') as f:
    date = date.replace('-', '/')
    for line in f:
        city = ' '.join(line.split()[:-1])
        if (city == 'Unknown'): city = ''
        line = next(f)
        gender = 'Female'
        for i, age in enumerate(line.split()[1:]):
            if (age != '-' and age != '0'):
                for j in range(int(age)):
                    outputFileCameron.write(f'USA{SEPARATOR}TX{SEPARATOR}Cameron{SEPARATOR}{date}{SEPARATOR}{AGE_RANGE_MAP[i]}{SEPARATOR}{gender}{SEPARATOR}{city}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')
        line = next(f)
        gender = 'Male'
        for i, age in enumerate(line.split()[1:]):
            if (age != '-' and age != '0'):
                for j in range(int(age)):
                    outputFileCameron.write(f'USA{SEPARATOR}TX{SEPARATOR}Cameron{SEPARATOR}{date}{SEPARATOR}{AGE_RANGE_MAP[i]}{SEPARATOR}{gender}{SEPARATOR}{city}{SEPARATOR}{link}{SEPARATOR}{SEPARATOR}\n')

print(f'cases file for Cameron from {date} processed\n')
