#!/usr/bin/python
import sys, getopt, time

def main(argv):
    argument = ''
    usage = 'usage: script.py -f <sometext>'
    
    # parse incoming arguments
    try:
        opts, args = getopt.getopt(argv,"hf:",["foo="])
    except getopt.GetoptError:
        print(usage)
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print(usage)
            sys.exit()
        elif opt in ("-f", "--foo"):
            argument = arg

    # print output
    print("Start : %s" % time.ctime())
    time.sleep( 5 )
    print('Foo is')
    time.sleep( 5 )
    print(argument)
    print("End : %s" % time.ctime())
    f = open('./public/data/pos.json','w')
    f.write('[{"name": "ImageButton-17781", "color": {"Black": 0.0, "White": 0.51, "Red": 0.0, "Lime": 0.0, "Yellow": 0.0, "Green": 0.0, "Cyan": 0.0, "Blue": 0.0, "Magenta": 0.49}, "content-desc": "", "coordinates": {"from": [726, 41], "to": [800, 108]}, "dimensions": {"height": 65, "width": 72}, "package_name": "com.ter.androidapp", "text": "", "widget_class": "ImageButton", "application_name": "SNCF TER Mobile", "downloads": "  500,000 - 1,000,000  ", "url": "https://www.apkmonk.com/app/com.ter.androidapp", "src": "/mnt/UIXML/Myscreenshot2/com.ter.androidapp-17781.png", "category": "MAPS_AND_NAVIGATION", "Developer": "SNCF", "font": "", "syns": [], "sims": ["ImageButton-17427", "ImageButton-30162", "ImageButton-46826", "ImageButton-16724", "ImageButton-2891", "ImageButton-2707"], "date": "13 Oct, 2015"}]')
    f.close()

if __name__ == "__main__":
    main(sys.argv[1:])