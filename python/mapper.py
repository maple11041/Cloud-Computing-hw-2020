#!/usr/bin/env python3
import sys

for line in sys.stdin:
    line = line.strip()
    # print (line)
    hour  = line.split()[3][1:-6]
    print (("%s\t%s") % (hour, 1))
    # break
