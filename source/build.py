# Builds the playable game: injects data.json into src.html and writes ../index.html
import os
here = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(here, 'src.html')).read()
d = open(os.path.join(here, 'data.json')).read()
open(os.path.join(here, '..', 'index.html'), 'w').write(s.replace('__DATA__', d))
print('built index.html')
