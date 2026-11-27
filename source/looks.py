# Real ring-gear looks for the Real History scenarios. Approximations of each wrestler's best-known gear
# for that start year, within what the character builder can draw. "Name@YEAR" overrides the base entry.
import json
S=['#ffdbc4','#f1c09a','#dca67a','#c08456','#9a6440','#74472b','#4f2f1d','#3a2216']
R,K,Wt,Y,B,G,P,Pk,O,Cy,Gy,Br,Au,Sv,Mr,Nv,Lm,Cr='#d7263d','#1b1b1f','#f5f5f5','#f4c20d','#1f6feb','#14a37f','#7b2ff7','#ff5fa2','#ff7a00','#00b8d9','#8a96a3','#6b3f26','#c9a227','#c8ccd4','#7c1f24','#1d2a52','#8bd450','#e8e3da'
BLK,DBR,BRN,LBR,BLD,PLAT,GRY,RED,ORG='#1a1412','#3e2718','#6b4425','#a46a33','#dcb468','#f0ebe1','#9a9a9a','#c9332b','#e05a1b'
JEANS='#3c5f8f'
def g(c1=None,c2=Wt,c3=None,c4=None,**k):
    d=dict(k)
    if c1: d['gear1']=c1
    d['gear2']=c2
    if c3: d['gear3']=c3
    if c4: d['gear4']=c4
    return d
L={
# ---------- 1994 headliners
'Ric Flair':g(B,Wt,K,K,skin=S[1],hair='wavy',hairColor=PLAT,top='robe',bottoms='trunks',pads='none',mouth='shout'),
'Mitsuharu Misawa':g(None,Wt,G,G,skin=S[1],hair='crew',hairColor=BLK,top='none',bottoms='trunks',pads='both',padColor=G,boots='tall'),
'Bret Hart':g(None,K,Pk,Pk,skin=S[1],hair='long',hairColor=BLK,top='none',bottoms='tights',botArt='split',botArtColor=K,boots='tall',pads='knee',padColor=K,eyewear='shades'),
'The Undertaker':g(K,Gy,K,K,skin=S[0],build='muscular',hair='long',hairColor='#5a2e1c',top='trenchcoat',bottoms='tights',boots='tall',pads='none',wrists='gloves',wristColor=Gy,headwear='hat',headColor=K,eyes='glare',brows='angry'),
'The Undertaker@2003':g(K,Gy,K,K,skin=S[0],build='muscular',hair='long',hairColor=BLK,facial='goatee',facialColor=BLK,top='vest',bottoms='pants',boots='tall',pads='none',wrists='mma',wristColor=K,headwear='bandana',headColor=K,eyewear='shades',tattoo='sleeves',ink='#1f2b3d'),
'The Undertaker@2011':g(K,Gy,K,K,skin=S[0],build='muscular',hair='long',hairColor=BLK,top='trenchcoat',bottoms='tights',boots='tall',pads='knee',padColor=K,wrists='mma',wristColor=K,headwear='hat',headColor=K,eyes='glare',tattoo='sleeves',ink='#1f2b3d'),
'Undertaker':g(K,Gy,K,K,skin=S[0],build='muscular',hair='buzz',hairColor=BLK,top='trenchcoat',bottoms='tights',boots='tall',pads='knee',padColor=K,wrists='mma',wristColor=K,headwear='hat',headColor=K,eyes='glare',facial='goatee',facialColor=GRY,tattoo='sleeves',ink='#1f2b3d'),
'Undertaker@2020':g(K,Gy,K,K,skin=S[0],build='muscular',hair='long',hairColor=BLK,facial='goatee',facialColor=GRY,top='leather',bottoms='pants',boots='tall',pads='none',wrists='mma',wristColor=K,headwear='bandana',headColor=K,eyewear='shades',tattoo='sleeves',ink='#1f2b3d'),
'Sting':g(None,K,Y,K,skin=S[1],build='muscular',hair='flattop',hairColor=BLD,top='none',bottoms='tights',botArt='stripes',botArtColor=K,boots='tall',pads='knee',padColor=K,paint='facePaint',paintColor=R),
'Sting@2003':g(K,Wt,K,K,skin=S[1],build='muscular',hair='long',hairColor=BLK,top='trenchcoat',bottoms='tights',boots='tall',pads='none',wrists='gloves',wristColor=K,paint='crow',paintColor=K),
'Sting@2011':g(K,R,K,K,skin=S[1],build='muscular',hair='long',hairColor=BLK,top='trenchcoat',bottoms='tights',boots='tall',pads='none',wrists='gloves',wristColor=K,paint='crow',paintColor=R,mouth='grin'),
'Keiji Mutoh':g(None,R,K,K,skin=S[1],hair='shaggy',hairColor=BLK,facial='mustache',facialColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=R,boots='tall',pads='knee',padColor=R),
'Keiji Mutoh@2003':g(None,R,K,K,skin=S[1],hair='bald',facial='goatee',facialColor=BLK,top='none',bottoms='tights',botArt='flames',botArtColor=R,boots='tall',pads='knee',padColor=R),
'Keiji Mutoh@2011':g(None,R,K,K,skin=S[1],hair='bald',facial='goatee',facialColor=GRY,top='none',bottoms='tights',botArt='flames',botArtColor=R,boots='tall',pads='brace'),
'Randy Savage':g(Pk,Y,Pk,Pk,skin=S[2],build='muscular',hair='long',hairColor=DBR,facial='full',facialColor=DBR,top='fringe',bottoms='tights',botArt='stars',botArtColor=Y,boots='tall',pads='knee',padColor=Pk,headwear='hat',headColor=Pk,eyewear='starshades'),
'Shinya Hashimoto':g(None,Wt,K,K,skin=S[1],build='heavy',hair='buzz',hairColor=BLK,facial='goatee',facialColor=BLK,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=K,wrists='tape'),
'Kenta Kobashi':g(None,Wt,O,O,skin=S[1],build='muscular',hair='shaggy',hairColor=BLK,top='none',bottoms='trunks',boots='tall',pads='both',padColor=O,wrists='tape'),
'Kenta Kobashi@2003':g(None,Wt,O,O,skin=S[1],build='muscular',hair='crew',hairColor=LBR,top='none',bottoms='trunks',boots='tall',pads='both',padColor=O,wrists='tape'),
'Shawn Michaels':g(None,Pk,K,K,skin=S[2],hair='long',hairColor=BLD,top='none',bottoms='tights',botArt='hearts',botArtColor=Pk,boots='tall',pads='knee',padColor=K,mouth='smirk'),
'Shawn Michaels@2003':g(None,R,K,K,skin=S[2],hair='long',hairColor=BLD,facial='goatee',facialColor=BLD,top='none',bottoms='chaps',boots='tall',pads='knee',padColor=K,mouth='smirk'),
'Yokozuna':g(None,Au,R,K,skin=S[3],build='belly',hair='topknot',hairColor=BLK,head='round',top='none',bottoms='mawashi',boots='barefoot',pads='none'),
'Toshiaki Kawada':g(None,Y,K,K,skin=S[1],hair='buzz',hairColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=Y,boots='kickpads',pads='knee',padColor=K,eyes='glare'),
'Giant Baba':g(None,Wt,R,K,skin=S[1],build='lean',head='long',hair='slick',hairColor=BLK,top='none',bottoms='trunks',boots='boots',pads='none'),
'Razor Ramon':g(None,Au,P,K,skin=S[2],hair='slick',hairColor=BLK,facial='stubble',facialColor=BLK,top='none',bottoms='pants',botArt='stripes',botArtColor=Au,boots='tall',pads='knee',padColor=K,extra='chain',mouth='smirk'),
'Vader':g(K,R,K,K,skin=S[1],build='belly',hair='crew',hairColor=BRN,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=K,mask='full',mask1=K,mask2=R,maskPattern='stripe',wrists='tape'),
'Jushin Liger':g(R,Wt,R,R,skin=S[1],build='lean',top='rashguard',bottoms='tights',boots='tall',pads='none',mask='full',mask1=R,mask2=Wt,maskPattern='horned'),
'Stan Hansen':g(None,Wt,K,Br,skin=S[0],build='heavy',hair='shaggy',hairColor=BLD,facial='mustache',facialColor=BLD,top='vest',bottoms='trunks',boots='cowboy',pads='none',headwear='hat',headColor=Br,wrists='bands',wristColor=K),
'Lex Luger':g(None,R,B,Wt,skin=S[2],build='muscular',hair='mullet',hairColor=BLD,top='none',bottoms='trunks',botArt='stars',botArtColor=Wt,boots='tall',pads='knee',padColor=B,wrists='bands',wristColor=R),
'Masahiro Chono':g(K,Wt,K,K,skin=S[1],hair='slick',hairColor=BLK,facial='goatee',facialColor=BLK,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=K,eyewear='shades'),
'El Hijo del Santo':g(None,K,Sv,Sv,skin=S[2],build='lean',top='none',bottoms='tights',boots='tall',pads='none',mask='full',mask1=Sv,mask2=K,maskPattern='eyes'),
'Konnan':g(Wt,R,K,K,skin=S[3],hair='crew',hairColor=BLK,facial='goatee',facialColor=BLK,top='jersey',bottoms='sweats',boots='sneakers',pads='none',headwear='bandana',headColor=R,eyewear='shades'),
'Tatsumi Fujinami':g(None,Wt,R,K,skin=S[1],hair='crew',hairColor=BLK,top='none',bottoms='trunks',boots='boots',pads='none'),
'Riki Choshu':g(None,Wt,K,K,skin=S[1],build='heavy',hair='long',hairColor=BLK,top='none',bottoms='trunks',boots='boots',pads='none'),
'Rick Rude':g(None,Pk,Cy,Cy,skin=S[2],build='muscular',hair='mullet',hairColor=DBR,facial='mustache',facialColor=DBR,top='robe',bottoms='tights',botArt='logo',botArtColor=Pk,boots='tall',pads='none',mouth='smirk'),
'Aja Kong':g(K,R,K,K,skin=S[4],build='heavy',hair='mohawk',hairColor=BLK,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=K,paint='tribal',paintColor=Y),
'Ricky Steamboat':g(None,Wt,R,Wt,skin=S[2],hair='curly',hairColor=BLK,top='none',bottoms='trunks',boots='tall',pads='none'),
'Akira Hokuto':g(K,Au,K,K,skin=S[1],hair='long',hairColor=BLK,top='leotard',bottoms='tights',boots='kneehigh',pads='knee',padColor=K),
'Mr. Perfect':g(Nv,Au,Nv,Nv,skin=S[1],hair='curly',hairColor=BLD,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=Nv,mouth='smirk'),
'Terry Funk':g(None,Wt,K,K,skin=S[0],hair='shaggy',hairColor=BLD,top='tee',bottoms='trunks',boots='boots',pads='knee',padColor=K,headwear='hat',headColor=Br),
# ---------- 2003
'Stone Cold Steve Austin':g(K,Wt,K,K,skin=S[1],build='muscular',hair='bald',facial='goatee',facialColor=DBR,top='none',bottoms='trunks',botArt='logo',botArtColor=Wt,boots='boots',pads='both',padColor=K,brows='angry',eyes='glare'),
'The Rock':g(None,Wt,K,K,skin=S[4],build='muscular',hair='buzz',hairColor=BLK,top='none',bottoms='trunks',boots='boots',pads='single',padColor=K,brows='arched',mouth='smirk',tattoo='tribal',ink='#1f2b3d'),
'Triple H':g(None,Wt,K,K,skin=S[1],build='muscular',hair='long',hairColor=LBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Triple H@2011':g(None,Wt,K,K,skin=S[1],build='muscular',hair='slick',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Triple H@2015':g(None,Wt,K,K,skin=S[1],build='muscular',hair='slick',hairColor=DBR,facial='stubble',facialColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Brock Lesnar':g(None,Wt,K,K,skin=S[1],build='muscular',head='square',hair='buzz',hairColor=BLD,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,tattoo='chest',ink='#1f2b3d'),
'Brock Lesnar@2015':g(None,Wt,K,K,skin=S[1],build='muscular',head='square',hair='buzz',hairColor=BLD,facial='goatee',facialColor=BLD,top='none',bottoms='boardshorts',boots='boots',pads='none',wrists='mma',wristColor=K,tattoo='chest',ink='#1f2b3d',tattoo2='back',ink2='#1f2b3d',eyes='glare'),
'Hulk Hogan':g(R,Y,Y,R,skin=S[2],build='bodybuilder',hair='balding',hairColor=BLD,facial='horseshoe',facialColor=BLD,top='tank',bottoms='trunks',boots='tall',pads='none',headwear='bandana',headColor=R,mouth='shout'),
'Hulk Hogan@2011':g(K,Wt,K,K,skin=S[2],build='muscular',hair='balding',hairColor=PLAT,facial='horseshoe',facialColor=PLAT,top='leather',bottoms='pants',boots='tall',pads='none',headwear='bandana',headColor=K,eyewear='shades'),
'Kurt Angle':g(B,Wt,B,B,skin=S[1],hair='bald',top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=B,extra='medal',extraColor=R),
'Kurt Angle@2011':g(K,R,K,K,skin=S[1],hair='bald',facial='stubble',facialColor=DBR,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=K,extra='medal',extraColor=R),
'Chris Jericho':g(None,Sv,K,K,skin=S[1],hair='long',hairColor=BLD,top='none',bottoms='tights',botArt='flames',botArtColor=Sv,boots='tall',pads='knee',padColor=K,mouth='grin'),
'Chris Jericho@2020':g(None,R,K,K,skin=S[1],build='heavy',hair='slick',hairColor=DBR,facial='full',facialColor=GRY,top='none',bottoms='tights',botArt='side',botArtColor=R,boots='tall',pads='knee',padColor=K,eyewear='shades'),
'Big Show':g(K,Wt,K,K,skin=S[1],build='giant',head='round',hair='bald',facial='goatee',facialColor=BLK,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=K),
'Rob Van Dam':g(None,Y,R,Wt,skin=S[2],hair='ponytail',hairColor=DBR,top='none',bottoms='pants',botArt='flames',botArtColor=Y,boots='kickpads',pads='none',mouth='grin'),
'Trish Stratus':g(Pk,Wt,Pk,Pk,skin=S[2],hair='long',hairColor=BLD,top='crop',bottoms='tights',boots='kneehigh',pads='none',mouth='smile'),
'Jun Akiyama':g(None,Wt,G,K,skin=S[1],hair='crew',hairColor=BLK,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=G),
'Eddie Guerrero':g(None,R,K,K,skin=S[3],hair='slick',hairColor=BLK,facial='mustache',facialColor=BLK,top='none',bottoms='tights',botArt='flames',botArtColor=R,boots='tall',pads='knee',padColor=K,tattoo='stomach',ink='#1f2b3d',mouth='grin'),
'Rey Mysterio':g(None,Wt,B,Wt,skin=S[3],build='lean',top='none',bottoms='pants',botArt='side',botArtColor=Wt,boots='tall',pads='knee',padColor=B,mask='full',mask1=B,mask2=Wt,maskPattern='wings',tattoo='stomach',ink='#1f2b3d'),
'Rey Mysterio@2020':g(None,Au,K,K,skin=S[3],build='lean',top='none',bottoms='pants',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=K,mask='full',mask1=K,mask2=Au,maskPattern='cross',tattoo='stomach',ink='#1f2b3d',tattoo2='sleeves',ink2='#1f2b3d'),
'Booker T':g(None,Au,K,K,skin=S[6],build='muscular',hair='braids',hairColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=K),
'Kane':g(R,K,R,K,skin=S[1],build='muscular',hair='long',hairColor=BLK,top='rashguard',bottoms='tights',boots='tall',pads='none',wrists='gloves',wristColor=K,mask='full',mask1=R,mask2=K,maskPattern='halves'),
'Kane@2011':g(None,R,K,K,skin=S[1],build='muscular',hair='bald',top='none',bottoms='tights',botArt='flames',botArtColor=R,boots='tall',pads='none',wrists='gloves',wristColor=K,eyes='glare'),
'Kane@2015':g(None,R,K,K,skin=S[1],build='muscular',hair='bald',facial='goatee',facialColor=BLK,top='none',bottoms='tights',botArt='flames',botArtColor=R,boots='tall',pads='none',wrists='gloves',wristColor=K,eyes='glare'),
'Yuji Nagata':g(None,Wt,B,K,skin=S[1],hair='buzz',hairColor=BLK,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=B),
'Chris Benoit':g(None,R,K,K,skin=S[1],build='muscular',hair='crew',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='both',padColor=K,mouth='gap'),
'Edge':g(None,Sv,K,K,skin=S[1],hair='long',hairColor=BLD,facial='stubble',facialColor=BLD,top='none',bottoms='tights',botArt='side',botArtColor=Sv,boots='tall',pads='knee',padColor=K),
'Jeff Hardy':g(K,Wt,K,K,skin=S[1],build='lean',hair='long',hairColor='#8e3fc2',top='tee',bottoms='cargo',boots='tall',pads='none',wrists='armbands',wristColor=K,paint='facePaint',paintColor=Wt,tattoo='sleeve',ink='#1f2b3d'),
'Jeff Hardy@2011':g(K,Wt,K,K,skin=S[1],build='lean',hair='long',hairColor=RED,top='tee',bottoms='cargo',boots='tall',pads='none',wrists='sleeves',wristColor=K,paint='facePaint',paintColor=K,bodyPaint='arms',bodyColor=Wt,tattoo='sleeve',ink='#1f2b3d'),
'Lita':g(K,R,G,K,skin=S[1],hair='long',hairColor=RED,top='crop',bottoms='camo',boots='tall',pads='none',tattoo='back',ink='#1f2b3d'),
# ---------- 2011
'John Cena':g(P,K,JEANS,K,skin=S[1],build='muscular',hair='buzz',hairColor=DBR,top='tee',bottoms='shorts',boots='sneakers',pads='none',headwear='cap',headColor=P,wrists='bands',wristColor=P,mouth='smile'),
'John Cena@2015':g(R,K,JEANS,K,skin=S[1],build='muscular',hair='buzz',hairColor=DBR,top='tee',bottoms='shorts',boots='sneakers',pads='none',headwear='cap',headColor=R,wrists='bands',wristColor=R,mouth='smile'),
'John Cena@2020':g(Lm,K,JEANS,K,skin=S[1],build='muscular',hair='buzz',hairColor=DBR,top='tee',bottoms='shorts',boots='sneakers',pads='none',headwear='cap',headColor=Lm,wrists='bands',wristColor=Lm,mouth='smile'),
'Randy Orton':g(None,Wt,K,K,skin=S[1],build='muscular',hair='buzz',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,tattoo='sleeves',ink='#1f2b3d',eyes='glare'),
'Randy Orton@2020':g(None,Wt,K,K,skin=S[1],build='muscular',hair='crew',hairColor=DBR,facial='stubble',facialColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,tattoo='sleeves',ink='#1f2b3d',eyes='glare'),
'The Miz':g(None,Au,K,K,skin=S[1],hair='slick',hairColor=DBR,top='none',bottoms='trunks',botArt='logo',botArtColor=Au,boots='boots',pads='knee',padColor=K,mouth='smirk'),
'CM Punk':g(None,Wt,K,K,skin=S[1],build='lean',hair='buzz',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape',tattoo='sleeves',ink='#1f2b3d',tattoo2='stomach',ink2='#1f2b3d',mouth='smirk'),
'CM Punk@2026':g(None,Wt,K,K,skin=S[1],build='lean',hair='wavy',hairColor=DBR,facial='full',facialColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape',tattoo='sleeves',ink='#1f2b3d',tattoo2='stomach',ink2='#1f2b3d'),
'Hiroshi Tanahashi':g(None,Pk,Wt,Wt,skin=S[1],hair='long',hairColor=LBR,top='none',bottoms='tights',botArt='side',botArtColor=Pk,boots='tall',pads='knee',padColor=Wt,mouth='smile'),
'Mistico':g(None,B,Wt,Wt,skin=S[2],build='lean',top='none',bottoms='tights',botArt='side',botArtColor=B,boots='tall',pads='none',mask='full',mask1=Wt,mask2=B,maskPattern='wings'),
'Sheamus':g(None,G,K,K,skin=S[0],build='muscular',hair='crew',hairColor=RED,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape'),
'Sheamus@2015':g(None,G,K,K,skin=S[0],build='muscular',hair='mohawk',hairColor=RED,facial='braided',facialColor=RED,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape'),
'AJ Styles':g(None,Wt,K,K,skin=S[1],hair='long',hairColor=DBR,facial='full',facialColor=DBR,top='none',bottoms='tights',botArt='side',botArtColor=Wt,boots='tall',pads='knee',padColor=K,wrists='tape'),
'AJ Styles@2011':g(None,R,K,K,skin=S[1],hair='crew',hairColor=DBR,facial='goatee',facialColor=DBR,top='none',bottoms='tights',botArt='side',botArtColor=R,boots='tall',pads='knee',padColor=K,wrists='tape'),
'Shinsuke Nakamura':g(None,K,R,K,skin=S[1],hair='shaggy',hairColor=BLK,facial='goatee',facialColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=K,boots='tall',pads='knee',padColor=K,eyes='crazy'),
'Alberto Del Rio':g(None,Au,K,K,skin=S[2],hair='slick',hairColor=BLK,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,extra='scarf',extraColor=Au),
'Christian':g(None,Au,K,K,skin=S[1],hair='long',hairColor=LBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Wade Barrett':g(None,Wt,K,K,skin=S[1],build='muscular',hair='crew',hairColor=BLK,facial='stubble',facialColor=BLK,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape'),
'Samoa Joe':g(None,Wt,K,K,skin=S[3],build='stocky',hair='buzz',hairColor=BLK,top='none',bottoms='shorts',boots='boots',pads='knee',padColor=K,tattoo='sleeve',ink='#1f2b3d'),
'Dolph Ziggler':g(None,Pk,K,K,skin=S[1],hair='slick',hairColor=PLAT,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,mouth='smirk'),
'Daniel Bryan':g(None,Wt,Mr,K,skin=S[1],build='lean',hair='crew',hairColor=BRN,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=K),
'Daniel Bryan@2015':g(None,Wt,Mr,K,skin=S[1],build='lean',hair='long',hairColor=BRN,facial='full',facialColor=BRN,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=K,mouth='shout'),
# ---------- 2015
'Kazuchika Okada':g(None,Au,Nv,Au,skin=S[1],hair='wavy',hairColor=BLD,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=Nv),
'Kazuchika Okada@2020':g(None,Au,Nv,Au,skin=S[1],hair='wavy',hairColor=RED,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=Nv),
'Roman Reigns':g(K,Wt,K,K,skin=S[3],build='muscular',hair='ponytail',hairColor=BLK,facial='stubble',facialColor=BLK,top='vest',bottoms='cargo',boots='tall',pads='none',wrists='mma',wristColor=K,tattoo='rightsleeve',ink='#1f2b3d'),
'Roman Reigns@2020':g(None,Wt,K,K,skin=S[3],build='muscular',hair='ponytail',hairColor=BLK,facial='full',facialColor=BLK,top='none',bottoms='cargo',boots='tall',pads='none',wrists='mma',wristColor=K,tattoo='rightsleeve',ink='#1f2b3d',eyes='glare'),
'Roman Reigns@2026':g(None,Wt,K,K,skin=S[3],build='muscular',hair='ponytail',hairColor=BLK,facial='full',facialColor=BLK,top='none',bottoms='cargo',boots='tall',pads='none',wrists='mma',wristColor=K,tattoo='rightsleeve',ink='#1f2b3d',extra='lei',eyes='glare'),
'Seth Rollins':g(None,Au,K,K,skin=S[1],hair='long',hairColor=BLK,facial='full',facialColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=K),
'Seth Rollins@2026':g(None,Pk,P,P,skin=S[1],hair='long',hairColor=BLD,facial='full',facialColor=BLK,top='none',bottoms='tights',botArt='stars',botArtColor=Pk,boots='tall',pads='knee',padColor=P),
'Dean Ambrose':g(K,Wt,JEANS,K,skin=S[1],hair='shaggy',hairColor=LBR,top='tank',bottoms='pants',boots='boots',pads='none',wrists='tape',mouth='smirk'),
'Jon Moxley':g(K,Wt,K,K,skin=S[1],hair='shaggy',hairColor=LBR,facial='stubble',facialColor=LBR,top='none',bottoms='pants',boots='boots',pads='none',wrists='tape',tattoo='band',ink='#1f2b3d'),
'Bray Wyatt':g(Cr,R,Cr,K,skin=S[1],build='heavy',hair='long',hairColor=BRN,facial='full',facialColor=BRN,top='flannel',bottoms='pants',boots='boots',pads='none',headwear='hat',headColor=Cr,eyes='crazy'),
'The Fiend':g(Mr,R,K,K,skin=S[1],build='heavy',hair='dreads',hairColor=DBR,top='rashguard',bottoms='striped',boots='tall',pads='none',mask='full',mask1='#d9c7a0',mask2=Mr,maskPattern='grin'),
'AJ Lee':g(R,K,K,Pk,skin=S[2],build='lean',hair='ponytail',hairColor=BLK,top='tee',bottoms='shorts',boots='sneakers',pads='knee',padColor=K,mouth='smile'),
'Nikki Bella':g(R,Au,R,R,skin=S[2],hair='wavy',hairColor=DBR,top='crop',bottoms='tights',boots='kneehigh',pads='none'),
'Brie Bella':g(Pk,Au,Pk,Pk,skin=S[2],hair='wavy',hairColor=DBR,top='crop',bottoms='tights',boots='kneehigh',pads='none'),
'Rusev':g(None,Au,R,R,skin=S[1],build='heavy',hair='buzz',hairColor=BLK,facial='full',facialColor=BLK,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=R),
'Bobby Lashley':g(None,R,K,K,skin=S[6],build='bodybuilder',hair='bald',top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Paige':g(K,R,K,K,skin=S[0],hair='long',hairColor=BLK,top='crop',bottoms='tights',botArt='checker',botArtColor=R,boots='kneehigh',pads='knee',padColor=K,mouth='lipstick',eyes='lined'),
'Bobby Roode':g(Au,K,K,K,skin=S[1],hair='slick',hairColor=BLD,facial='stubble',facialColor=BLD,top='robe',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Bad News Barrett':g(None,Wt,K,K,skin=S[1],build='muscular',hair='crew',hairColor=BLK,facial='stubble',facialColor=BLK,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,wrists='tape'),
'Minoru Suzuki':g(None,Wt,K,K,skin=S[1],hair='slick',hairColor=PLAT,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,eyes='crazy',mouth='grin'),
'Cesaro':g(None,R,Wt,R,skin=S[1],build='muscular',hair='buzz',hairColor=BLD,facial='stubble',facialColor=BLD,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=R),
# ---------- 2020
'Becky Lynch':g(K,ORG,K,K,skin=S[0],hair='long',hairColor=ORG,top='crop',bottoms='tights',botArt='side',botArtColor=ORG,boots='kneehigh',pads='knee',padColor=K,mouth='smirk'),
'Tetsuya Naito':g(None,R,K,K,skin=S[1],hair='shaggy',hairColor=BLK,top='none',bottoms='tights',botArt='logo',botArtColor=R,boots='tall',pads='knee',padColor=K,eyes='crazy'),
'Charlotte Flair':g(Au,Wt,Au,Au,skin=S[1],hair='long',hairColor=PLAT,top='leotard',bottoms='tights',boots='kneehigh',pads='none',extra='feathers',extraColor=Wt),
'Kenny Omega':g(None,Cy,Wt,Wt,skin=S[1],hair='long',hairColor=BLD,top='none',bottoms='tights',botArt='side',botArtColor=Cy,boots='tall',pads='knee',padColor=Cy),
'Drew McIntyre':g(None,R,Nv,K,skin=S[1],build='muscular',hair='long',hairColor=DBR,facial='full',facialColor=DBR,top='none',bottoms='kilt',boots='tall',pads='knee',padColor=K,tattoo='sleeve',ink='#1f2b3d'),
'Sasha Banks':g(Pk,Au,Pk,Pk,skin=S[5],hair='long',hairColor='#2d6be0',top='crop',bottoms='tights',boots='kneehigh',pads='none',extra='chain'),
'Mercedes Mone':g(K,Au,K,K,skin=S[5],hair='long',hairColor='#5a1a6b',top='crop',bottoms='tights',botArt='side',botArtColor=Au,boots='kneehigh',pads='none',extra='chain'),
'Cody':g(None,Au,K,K,skin=S[1],hair='slick',hairColor=BLD,top='none',bottoms='tights',botArt='trim',botArtColor=Au,boots='tall',pads='knee',padColor=K),
'Cody Rhodes':g(None,R,K,K,skin=S[1],build='muscular',hair='slick',hairColor=BLD,top='none',bottoms='trunks',boots='tall',pads='knee',padColor=K,tattoo='neck',ink='#1f2b3d'),
'Kota Ibushi':g(None,Au,Wt,Wt,skin=S[1],hair='shaggy',hairColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=Wt),
'Kofi Kingston':g(None,Y,Lm,Lm,skin=S[6],hair='dreads',hairColor=BLK,top='none',bottoms='tights',botArt='stripes',botArtColor=Y,boots='tall',pads='knee',padColor=Lm,mouth='smile'),
'Kevin Owens':g(K,Wt,K,K,skin=S[1],build='belly',hair='crew',hairColor=DBR,facial='full',facialColor=DBR,top='tee',bottoms='trunks',boots='boots',pads='knee',padColor=K),
'Braun Strowman':g(K,Gy,K,K,skin=S[1],build='giant',hair='shaggy',hairColor=BRN,facial='full',facialColor=BRN,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=K),
'Jay White':g(None,Wt,K,K,skin=S[1],hair='slick',hairColor=BLD,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,mouth='smirk'),
'Bayley':g(P,Y,P,P,skin=S[2],hair='ponytail',hairColor=DBR,top='crop',bottoms='tights',boots='kneehigh',pads='knee',padColor=P),
'Asuka':g(Cy,Pk,Cy,Cy,skin=S[1],hair='bowl',hairColor='#ff6fae',top='leotard',bottoms='tights',boots='kneehigh',pads='none',paint='facePaint',paintColor=P),
'Alexa Bliss':g(K,Pk,K,K,skin=S[0],hair='pigtails',hairColor=PLAT,top='crop',bottoms='tights',botArt='stars',botArtColor=Pk,boots='kneehigh',pads='none',mouth='smirk'),
'Big E':g(Y,B,Y,B,skin=S[6],build='stocky',hair='bald',facial='full',facialColor=BLK,top='singlet',bottoms='singlet',boots='tall',pads='knee',padColor=B,mouth='smile'),
# ---------- 2026
'Rhea Ripley':g(K,Sv,K,K,skin=S[1],build='muscular',hair='mullet',hairColor=BLK,top='crop',bottoms='tights',botArt='pinstripe',botArtColor=Sv,boots='kneehigh',pads='knee',padColor=K,extra='shoulderPads',extraColor=K,wrists='spiked',eyes='lined',mouth='lipstick',tattoo='sleeves',ink='#1f2b3d'),
'Gunther':g(None,Wt,K,K,skin=S[0],build='heavy',hair='crew',hairColor=BLD,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,eyes='glare'),
'Jey Uso':g(None,Y,K,K,skin=S[4],build='muscular',hair='braids',hairColor=BLK,facial='full',facialColor=BLK,top='none',bottoms='pants',botArt='side',botArtColor=Y,boots='tall',pads='none',tattoo='sleeves',ink='#1f2b3d',eyewear='shades'),
'Adam Page':g(None,Br,K,Br,skin=S[1],hair='shaggy',hairColor=LBR,facial='full',facialColor=LBR,top='none',bottoms='tights',botArt='side',botArtColor=Br,boots='tall',pads='knee',padColor=K,headwear='hat',headColor=Br),
'LA Knight':g(None,Au,K,K,skin=S[1],hair='buzz',hairColor=DBR,facial='stubble',facialColor=DBR,top='none',bottoms='tights',botArt='side',botArtColor=Au,boots='tall',pads='knee',padColor=K,mouth='shout'),
'Bianca Belair':g(R,Au,R,R,skin=S[5],build='muscular',hair='ponytail',hairColor=BLK,top='crop',bottoms='shorts',boots='kneehigh',pads='none',mouth='smile'),
'Will Ospreay':g(None,R,Wt,Wt,skin=S[1],hair='shaggy',hairColor=DBR,facial='stubble',facialColor=DBR,top='none',bottoms='tights',botArt='side',botArtColor=R,boots='tall',pads='knee',padColor=Wt),
'Maxwell Jacob Friedman':g(None,Au,K,K,skin=S[1],hair='slick',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,extra='scarf',extraColor=Wt,mouth='smirk'),
'Iyo Sky':g(P,Cy,K,K,skin=S[1],build='lean',hair='long',hairColor=BLK,top='crop',bottoms='tights',botArt='side',botArtColor=Cy,boots='kneehigh',pads='knee',padColor=K),
'Liv Morgan':g(K,P,K,K,skin=S[0],hair='long',hairColor=BLD,top='crop',bottoms='tights',botArt='side',botArtColor=P,boots='kneehigh',pads='none'),
'Bron Breakker':g(None,Au,K,K,skin=S[1],build='muscular',hair='buzz',hairColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,mouth='shout'),
'Toni Storm':g(Wt,Au,Wt,Wt,skin=S[0],hair='wavy',hairColor=PLAT,top='leotard',bottoms='tights',boots='kneehigh',pads='none',mouth='lipstick'),
'Finn Balor':g(None,Wt,K,K,skin=S[1],build='lean',hair='undercut',hairColor=BLK,facial='stubble',facialColor=BLK,top='none',bottoms='tights',botArt='logo',botArtColor=Wt,boots='tall',pads='knee',padColor=K),
'Sami Zayn':g(None,R,K,K,skin=S[1],hair='curly',hairColor=DBR,facial='full',facialColor=DBR,top='none',bottoms='trunks',boots='boots',pads='knee',padColor=K,mouth='smile'),
'Dominik Mysterio':g(None,R,K,K,skin=S[2],hair='buzz',hairColor=BLK,facial='mustache',facialColor=BLK,top='none',bottoms='tights',botArt='side',botArtColor=R,boots='tall',pads='knee',padColor=K,extra='chain',mouth='smirk'),
}
def apply(path='/home/user/scripts/data.json'):
    d=json.load(open(path)); n=0; miss=set(L)
    for v in d['real']['versions']:
        yr=int(v['data']['start'][:4])
        for w in v['data']['wrestlers']:
            nm=w['name']; keys=[k for k in L if k.split('@')[0]==nm]
            if not keys: continue
            miss-= set(keys)
            # best override at or before this year, else base
            best=None;by=-1
            for k in keys:
                y=int(k.split('@')[1]) if '@' in k else 0
                if y<=yr and y>by: best,by=k,y
            if best is None: best=min(keys,key=lambda k:int(k.split('@')[1]) if '@' in k else 0)
            px=dict(L[best]); 
            px.setdefault('frame','feminine' if w.get('gender')=='F' else 'masculine')
            px.setdefault('wrists','none'); px.setdefault('bg','spotlight')
            w['px']=px; n+=1
    json.dump(d,open(path,'w'),ensure_ascii=False,separators=(',',':'))
    print('applied',n,'unused',sorted(miss))
if __name__=='__main__': apply()
