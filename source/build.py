import re
s=open('/home/user/game/src.html').read()
d=open('/home/user/scripts/data.json').read();o=s.replace('__DATA__',d).replace('__LOOKJS__',open('/home/user/game/wrestler-look.js').read()).replace('__BELTJS__',open('/home/user/game/belt-look.js').read())
open('/home/user/game/index.html','w').write(o)
open('/tmp/g.js','w').write(max(re.findall(r'<script>(.*?)</script>',o,re.S),key=len))
print('built')
