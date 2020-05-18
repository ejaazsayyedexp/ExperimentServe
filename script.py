import shutil
import os
import sys

if(__name__=="__main__"):
    fname = sys.argv[1]
    destination = sys.argv[2]
    shutil.move('uploads//'+fname,'./fetch//'+destination+'//')
    os.remove('uploads//'+fname)
    print("Success!")
