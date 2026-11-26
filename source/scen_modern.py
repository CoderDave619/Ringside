# Later start years for the Real History scenario (2011, 2015, 2020, 2026), from public history.
# Rough stats on purpose. Line format: [f ]Name,birth,debut year,F/H,charisma,work,popularity,weight[,gimmick[,death[,retire]]]
# "@CO" starts a company block. "@" alone = free agents and future debuts.

def parse(txt,W):
    out=[];co=''
    for ln in txt.strip().split('\n'):
        ln=ln.strip()
        if not ln or ln.startswith('#'):continue
        if ln.startswith('@'):co=ln[1:].strip();continue
        g='M'
        if ln.startswith('f '):g='F';ln=ln[2:]
        p=[x.strip() for x in ln.split(',')]
        p+=['']*(11-len(p))
        out.append(W(p[0],g,p[1],p[2],co,p[3],int(p[4]),int(p[5]),int(p[6]),int(p[7]),p[8] or 'None',p[10],p[9]))
    return out

R11="""
@WWE
John Cena,1977-04-23,2000,F,94,80,94,251,Hero
Randy Orton,1980-04-01,2000,F,84,86,90,250
The Miz,1980-10-08,2004,H,90,70,82,221,Showman
Edge,1973-10-30,1992,F,84,84,86,241,,,2011-04-11
Rey Mysterio,1974-12-11,1989,F,76,90,80,175,Masked
CM Punk,1978-10-26,1999,H,94,86,80,218,Showman
Wade Barrett,1980-08-10,2004,H,76,74,70,246,Villain
Sheamus,1978-01-28,2002,H,74,80,76,267,Brawler
Christian,1973-11-30,1995,F,80,84,72,212
Alberto Del Rio,1977-05-25,1995,H,76,84,74,238,Villain
Dolph Ziggler,1980-07-27,2004,H,80,86,66,218
Daniel Bryan,1981-05-22,1999,F,72,98,66,210,Technician
John Morrison,1979-10-03,2002,F,74,84,66,215
R-Truth,1972-01-19,1997,H,80,70,58,228
Kofi Kingston,1981-08-14,2006,F,80,84,64,212
Big Show,1972-02-08,1995,F,70,62,76,450,Monster
Kane,1967-04-26,1992,H,70,72,76,323,Monster
The Undertaker,1965-03-24,1987,F,84,74,90,299,Monster,,2020-11-22
Triple H,1969-07-27,1992,F,88,84,88,255,Veteran
Cody Rhodes,1985-06-30,2006,H,78,80,58,220
Drew McIntyre,1985-06-06,2001,H,70,78,56,265
Mark Henry,1971-06-12,1996,H,62,62,62,390,Monster
Jack Swagger,1982-03-24,2006,H,58,76,58,263
Santino Marella,1974-12-09,2005,F,82,58,56,232,Showman
Vladimir Kozlov,1979-05-27,2006,F,50,60,48,302
Zack Ryder,1985-05-14,2004,F,82,64,48,214
Evan Bourne,1983-05-28,2003,F,58,86,52,183
Ted DiBiase,1982-11-08,2006,H,60,72,52,235
f Natalya,1982-05-27,2000,F,64,82,60,135,Technician
f Beth Phoenix,1980-11-24,2001,H,64,80,64,160
f Michelle McCool,1980-01-25,2004,H,64,70,62,130
f Layla,1977-06-25,2006,H,64,62,54,120
f Kelly Kelly,1987-01-15,2006,F,66,48,60,120
f Eve Torres,1984-08-21,2007,F,66,62,58,118
Seth Rollins,1986-05-28,2005,F,78,90,30,217,Rookie
Roman Reigns,1985-05-25,2010,F,70,70,20,265,Rookie
Dean Ambrose,1985-12-07,2004,H,82,80,30,225,Rookie
@TNA
Jeff Hardy,1977-08-31,1993,H,80,80,82,215
Kurt Angle,1968-12-09,1998,F,86,92,84,220,Technician
Sting,1959-03-20,1985,F,82,68,86,250,Veteran
AJ Styles,1977-06-02,1998,F,80,94,76,218
Mr. Anderson,1976-04-02,1999,H,86,74,70,247,Showman
Robert Roode,1977-05-11,1998,H,76,84,64,235
James Storm,1977-06-01,1997,H,78,78,62,240
Abyss,1973-10-04,1995,H,58,64,58,350,Monster
Matt Morgan,1976-09-10,2002,H,60,60,56,325
Rob Van Dam,1970-12-18,1990,F,82,82,76,235
Kazarian,1977-08-26,1998,F,66,84,52,215
Robbie E,1983-10-12,2005,H,72,56,44,215
Alex Shelley,1983-05-23,2002,F,66,90,54,215
Chris Sabin,1982-06-02,2000,F,62,88,52,190
Jay Lethal,1985-04-29,2001,F,72,86,54,215
Samoa Joe,1979-03-17,1999,H,74,90,68,282,Brawler
Hulk Hogan,1953-08-11,1977,H,96,54,88,302,Veteran,2025-07-24
Ric Flair,1949-02-25,1972,H,96,62,84,243,Veteran
Bully Ray,1971-07-14,1991,H,80,66,64,326
Devon,1972-08-01,1991,F,66,62,58,276
Kazuchika Okada,1987-11-08,2004,H,50,80,30,236,Rookie
f Mickie James,1979-08-31,1999,F,72,82,66,130
f Madison Rayne,1986-06-18,2006,H,66,68,52,120
f Tara,1971-05-17,1997,H,58,74,54,150
f Velvet Sky,1981-06-02,2004,F,68,54,54,125
f Angelina Love,1981-09-13,2003,H,64,62,52,125
@ROH
Roderick Strong,1983-07-26,2000,H,58,90,46,200,Technician
Davey Richards,1983-03-01,2004,H,56,92,46,190,Technician
Eddie Edwards,1983-12-30,2002,F,60,88,42,215
El Generico,1984-05-02,2002,F,74,90,44,200,Masked
Kevin Steen,1984-05-07,2000,H,84,84,44,265,Brawler
Chris Hero,1979-12-24,1998,H,72,86,44,235
Claudio Castagnoli,1980-12-27,2000,H,64,88,44,232
Jay Briscoe,1984-01-25,2000,H,66,82,44,230,Brawler,2024-01-17
Mark Briscoe,1985-01-18,2000,H,64,82,42,215,Brawler
Christopher Daniels,1970-03-24,1993,H,74,84,46,225,Veteran
Kenny King,1981-03-26,2002,F,62,78,36,215
Adam Cole,1989-07-05,2008,F,82,82,32,210,Rookie
Michael Elgin,1986-12-13,2004,F,54,84,32,240
@NJPW
Hiroshi Tanahashi,1976-11-13,1999,F,86,92,80,229,Hero
Shinsuke Nakamura,1980-02-24,2002,H,88,86,76,229,Showman
Satoshi Kojima,1970-09-14,1991,F,70,80,70,253,Veteran
Togi Makabe,1972-09-29,1997,F,66,72,64,240,Brawler
Hirooki Goto,1979-06-25,2003,F,58,82,60,225
Tetsuya Naito,1982-06-22,2006,F,70,84,56,225
Yujiro Takahashi,1981-05-02,2004,H,58,70,46,225
Prince Devitt,1981-07-25,2000,F,76,90,56,190
Ryusuke Taguchi,1979-04-15,2002,F,74,78,48,200,Showman
Karl Anderson,1980-01-20,2002,H,66,80,54,215
Giant Bernard,1974-02-13,1996,H,58,70,54,325,Monster
Yuji Nagata,1968-04-24,1992,F,64,84,62,238,Veteran
Toru Yano,1978-05-18,2002,H,76,58,46,265
Jushin Liger,1964-11-30,1984,F,72,84,62,209,Masked,,2020-01-05
Minoru Suzuki,1968-06-17,1988,H,80,86,62,225,Villain
Kota Ibushi,1982-05-21,2004,F,74,92,46,203
@AJPW
Suwama,1976-10-07,2004,F,56,82,56,265
Keiji Mutoh,1962-12-23,1984,F,82,78,72,243,Veteran
Taiyo Kea,1975-06-13,1993,F,52,76,44,250
Kaz Hayashi,1973-05-29,1993,F,56,80,42,185
Masakatsu Funaki,1969-03-13,1985,F,58,72,52,220
@NOAH
Takashi Sugiura,1970-05-20,2000,H,58,86,58,232
Go Shiozaki,1982-01-21,2004,F,62,86,56,240
Kenta,1981-03-12,2000,F,72,92,62,190
Naomichi Marufuji,1979-09-26,1998,F,70,92,62,190
Jun Akiyama,1969-10-09,1992,F,62,88,62,232,Veteran
Yoshihiro Takayama,1966-09-19,1992,H,62,72,54,276
@Toryumon
Masato Yoshino,1980-09-29,2000,F,66,88,46,170
CIMA,1977-11-15,1997,H,82,86,52,175,Showman
Shingo Takagi,1982-11-21,2004,H,62,86,44,220
YAMATO,1981-09-14,2006,H,64,82,40,200
BxB Hulk,1979-09-24,2004,F,66,82,40,175
@CMLL
Mistico,1982-12-22,1999,F,84,88,78,170,Masked
Atlantis,1962-01-17,1983,F,66,78,64,200,Masked
Ultimo Guerrero,1972-09-25,1993,H,64,80,58,200,Masked
La Sombra,1989-01-01,2005,F,74,86,52,200,Masked
Volador Jr.,1981-03-15,1997,F,62,86,56,185,Masked
Averno,1977-01-01,1996,H,58,80,48,190,Masked
@AAA
El Mesias,1972-01-01,1991,F,66,76,58,260
Dr. Wagner Jr.,1965-08-12,1986,H,70,76,62,230,Masked
Electroshock,1970-01-01,1992,H,58,72,48,240,Masked
Cibernetico,1972-01-01,1992,F,64,72,56,230,Masked
Jack Evans,1982-04-02,1999,F,62,84,44,175
@DDT
Kenny Omega,1983-10-16,2000,F,82,94,40,201,Showman
HARASHIMA,1975-09-16,2000,F,62,84,40,210
@
Ricochet,1988-10-11,2003,F,72,92,30,188
Pac,1986-12-22,2004,F,70,90,30,190
Zack Sabre Jr.,1987-07-24,2004,F,66,94,28,180,Technician
f Io Shirai,1990-05-08,2007,F,72,88,30,120
f Kana,1981-09-26,2004,F,76,84,28,135
Will Ospreay,1993-05-07,2012,F,74,90,10,195,Rookie
f Kairi Hojo,1988-09-23,2011,F,72,80,10,115,Rookie
f Charlotte Flair,1986-04-05,2012,H,86,88,20,145,Rookie
f Becky Lynch,1987-01-30,2002,F,88,82,20,135
"""
TI11=[('WWE Championship','WWE',1,'singles','The Miz','2010-11-22'),('World Heavyweight Championship','WWE',1,'singles','Edge','2010-12-19'),
 ('WWE Intercontinental Championship','WWE',2,'singles','Dolph Ziggler','2010-08-15'),('WWE United States Championship','WWE',2,'singles','Daniel Bryan','2010-09-19'),
 ('WWE Tag Team Championship','WWE',1,'tag','Santino Marella & Vladimir Kozlov','2010-12-13'),("WWE Divas Championship",'WWE',1,'singles','Natalya','2010-11-21'),
 ('TNA World Heavyweight Championship','TNA',1,'singles','Jeff Hardy','2010-10-10'),('TNA X Division Championship','TNA',2,'singles','Robbie E','2010-11-07'),
 ('TNA World Tag Team Championship','TNA',1,'tag','Alex Shelley & Chris Sabin','2010-08-08'),("TNA Knockouts Championship",'TNA',1,'singles','',''),
 ('ROH World Championship','ROH',1,'singles','Roderick Strong','2010-09-11'),('ROH World Tag Team Championship','ROH',1,'tag','',''),
 ('IWGP Heavyweight Championship','NJPW',1,'singles','Satoshi Kojima','2010-10-11'),('IWGP Junior Heavyweight Championship','NJPW',2,'singles','Prince Devitt','2010-06-19'),
 ('IWGP Tag Team Championship','NJPW',1,'tag','Karl Anderson & Giant Bernard','2010-01-04'),
 ('Triple Crown Heavyweight Championship','AJPW',1,'singles','',''),('GHC Heavyweight Championship','NOAH',1,'singles','',''),
 ('Open the Dream Gate Championship','Toryumon',1,'singles','',''),('CMLL World Heavyweight Championship','CMLL',1,'singles','',''),('AAA Mega Championship','AAA',1,'singles','',''),
 ('KO-D Openweight Championship','DDT',1,'singles','','')]

R15="""
@WWE
Brock Lesnar,1977-07-12,2000,H,74,86,92,286,Monster
John Cena,1977-04-23,2000,F,94,80,92,251,Hero
Randy Orton,1980-04-01,2000,H,84,86,86,250
Roman Reigns,1985-05-25,2010,F,72,76,80,265
Seth Rollins,1986-05-28,2005,H,78,92,78,217
Dean Ambrose,1985-12-07,2004,F,84,80,74,225,Brawler
Daniel Bryan,1981-05-22,1999,F,80,96,84,210,Technician
Bray Wyatt,1987-05-23,2009,H,90,72,74,285,Villain,2023-08-24
Luke Harper,1979-11-16,2003,H,60,82,56,275,Brawler,2020-12-26
Erick Rowan,1981-12-13,2007,H,54,62,46,315
Dolph Ziggler,1980-07-27,2004,F,80,86,66,218
Rusev,1985-12-25,2008,H,72,78,70,305,Monster
The Miz,1980-10-08,2004,H,90,70,70,221,Showman
Damien Mizdow,1981-01-01,2001,F,78,72,58,233
Sheamus,1978-01-28,2002,H,76,82,72,267,Brawler
Big Show,1972-02-08,1995,H,70,62,70,450,Monster
Kane,1967-04-26,1992,H,70,68,66,323,Veteran
Cesaro,1980-12-27,2000,F,66,92,62,232,Technician
Bad News Barrett,1980-08-10,2004,H,80,74,64,246
Kofi Kingston,1981-08-14,2006,F,82,82,62,212
Big E,1986-03-01,2010,F,84,74,60,285
Xavier Woods,1986-09-04,2005,F,84,72,54,205
Jey Uso,1985-08-22,2009,F,72,80,60,235
Jimmy Uso,1985-08-22,2009,F,72,78,60,251
Cody Rhodes,1985-06-30,2006,F,82,82,58,220,Showman
Goldust,1969-04-11,1988,F,82,78,58,232,Veteran
Bad Luck Fale,1982-01-08,2010,H,50,56,40,330
Undertaker,1965-03-24,1987,F,86,70,90,299,Monster,,2020-11-22
Triple H,1969-07-27,1992,H,88,80,84,255,Veteran
Sami Zayn,1984-07-12,2002,F,82,92,58,212
Kevin Owens,1984-05-07,2000,H,86,86,62,266,Brawler
Finn Balor,1981-07-25,2000,F,76,90,58,190
Hideo Itami,1981-03-12,2000,F,62,90,48,190
f Nikki Bella,1983-11-21,2007,H,72,70,72,125
f Brie Bella,1983-11-21,2007,F,70,66,66,125
f AJ Lee,1987-03-19,2007,F,82,74,74,115
f Paige,1992-08-17,2005,H,78,76,68,140
f Natalya,1982-05-27,2000,F,64,84,56,135,Technician
f Charlotte,1986-04-05,2012,H,84,88,58,145
f Sasha Banks,1992-01-26,2010,H,84,90,56,114
f Becky Lynch,1987-01-30,2002,F,86,84,54,135
f Bayley,1989-06-15,2008,F,82,86,54,119,Hero
@TNA
Bobby Lashley,1976-07-16,2004,H,64,80,70,273,Monster
Bobby Roode,1977-05-11,1998,F,80,86,66,235
Kurt Angle,1968-12-09,1998,F,86,88,74,220,Veteran
Austin Aries,1978-04-15,2000,F,80,90,58,202
Eric Young,1979-12-15,1998,H,80,78,56,225
Ethan Carter III,1984-04-18,2004,H,84,78,60,235,Villain
James Storm,1977-06-01,1997,F,78,74,54,240
Davey Richards,1983-03-01,2004,F,56,92,48,190
Eddie Edwards,1983-12-30,2002,F,62,88,48,215
Matt Hardy,1974-09-23,1992,F,80,80,58,236
Jeff Hardy,1977-08-31,1993,F,80,78,62,215
Low Ki,1979-09-09,1997,H,56,88,46,175
Drew Galloway,1985-06-06,2001,F,72,80,56,265
Mr. Anderson,1976-04-02,1999,H,86,72,54,247
f Taryn Terrell,1985-12-28,2008,F,66,74,52,125
f Gail Kim,1977-02-20,2000,F,68,86,58,125
f Havok,1986-09-27,2011,H,52,62,42,250,Monster
f Awesome Kong,1977-01-15,2002,H,62,70,54,272,Monster
@ROH
Jay Briscoe,1984-01-25,2000,H,70,82,58,230,Brawler,2024-01-17
Mark Briscoe,1985-01-18,2000,H,68,82,52,215,Brawler
Jay Lethal,1985-04-29,2001,H,80,86,58,215,Showman
Adam Cole,1989-07-05,2008,H,86,84,54,210
Michael Elgin,1986-12-13,2004,F,56,88,52,240
Roderick Strong,1983-07-26,2000,F,60,92,50,200,Technician
Bobby Fish,1976-11-27,1998,F,58,84,44,197
Kyle O'Reilly,1987-03-01,2005,F,62,90,46,205
Matt Jackson,1985-03-13,2004,H,80,88,52,174
Nick Jackson,1989-07-28,2004,H,78,88,52,173
ACH,1988-06-17,2007,F,64,86,40,184
@NJPW
Hiroshi Tanahashi,1976-11-13,1999,F,88,92,84,229,Hero
Kazuchika Okada,1987-11-08,2004,F,86,94,84,236,Showman
Shinsuke Nakamura,1980-02-24,2002,F,92,88,82,229,Showman
AJ Styles,1977-06-02,1998,H,82,96,80,218
Tetsuya Naito,1982-06-22,2006,F,74,86,62,225
Tomohiro Ishii,1975-12-10,1996,F,66,90,62,220,Brawler
Tomoaki Honma,1976-11-29,1997,F,74,72,48,230
Karl Anderson,1980-01-20,2002,H,70,82,58,215
Doc Gallows,1983-12-22,2005,H,60,70,52,290
Kenny Omega,1983-10-16,2000,H,86,96,62,201,Showman
Ryusuke Taguchi,1979-04-15,2002,F,76,78,50,200,Showman
Kota Ibushi,1982-05-21,2004,F,76,94,62,203
Hirooki Goto,1979-06-25,2003,F,58,84,56,225
Katsuyori Shibata,1979-11-17,1999,F,66,90,62,210,Brawler
Togi Makabe,1972-09-29,1997,F,68,72,56,240,Brawler
Minoru Suzuki,1968-06-17,1988,H,82,86,64,225,Villain
Jay White,1992-10-09,2013,F,60,72,20,215,Rookie
@AJPW
Suwama,1976-10-07,2004,F,58,82,48,265
Joe Doering,1982-04-21,2004,H,54,72,44,295,Monster
Kento Miyahara,1989-02-27,2006,F,72,84,42,220
@NOAH
Naomichi Marufuji,1979-09-26,1998,F,72,92,56,190
Takashi Sugiura,1970-05-20,2000,H,58,86,52,232
Katsuhiko Nakajima,1988-03-11,2003,H,62,88,48,190
Go Shiozaki,1982-01-21,2004,F,62,86,48,240
@Toryumon
Masato Yoshino,1980-09-29,2000,F,66,88,46,170
CIMA,1977-11-15,1997,F,82,84,48,175,Showman
Shingo Takagi,1982-11-21,2004,H,64,88,46,220
YAMATO,1981-09-14,2006,H,64,82,42,200
@CMLL
Atlantis,1962-01-17,1983,F,66,74,56,200,Masked,,
Ultimo Guerrero,1972-09-25,1993,H,64,78,54,200,Masked
Volador Jr.,1981-03-15,1997,F,66,88,58,185,Masked
Rush,1988-09-29,2005,H,78,82,58,210,Villain
Dragon Lee,1995-05-12,2014,F,62,86,30,170,Rookie
Marco Corleone,1977-09-24,2001,F,62,66,46,280
@AAA
Pentagon Jr.,1985-02-26,2007,H,80,86,54,195,Masked
Fenix,1990-12-30,2005,F,72,92,50,175,Masked
Psycho Clown,1985-12-16,2004,F,74,70,58,240,Masked
El Texano Jr.,1984-01-01,2000,H,62,76,50,240
Myzteziz,1982-12-22,1999,F,78,84,62,170,Masked
@LU
Prince Puma,1988-10-11,2003,F,72,94,48,188,Masked
Johnny Mundo,1979-10-03,2002,F,76,84,54,215
Mil Muertes,1980-01-01,2002,H,58,72,46,300,Monster
Chavo Guerrero,1970-10-20,1994,H,66,80,44,215,Veteran
@Stardom
f Io Shirai,1990-05-08,2007,F,76,92,50,120
f Mayu Iwatani,1993-02-19,2011,F,72,84,42,115
f Kairi Hojo,1988-09-23,2011,F,74,82,42,115
f Meiko Satomura,1979-11-17,1995,F,66,92,52,140,Veteran
f Yoshiko,1993-05-21,2011,H,58,72,36,180
@DDT
HARASHIMA,1975-09-16,2000,F,62,84,40,210
Konosuke Takeshita,1995-05-29,2012,F,66,86,34,220,Rookie
@
Will Ospreay,1993-05-07,2012,F,76,92,30,195
Zack Sabre Jr.,1987-07-24,2004,F,66,96,36,180,Technician
f Asuka,1981-09-26,2004,F,78,88,40,135
Samoa Joe,1979-03-17,1999,H,76,90,62,282,Brawler
Maxwell Jacob Friedman,1996-03-15,2015,H,90,72,10,216,Rookie
f Bianca Belair,1989-04-09,2016,F,80,76,10,165,Rookie
f Rhea Ripley,1996-10-11,2013,H,74,76,10,137,Rookie
Pac,1986-12-22,2004,F,70,90,30,190
"""
TI15=[('WWE World Heavyweight Championship','WWE',1,'singles','Brock Lesnar','2014-08-17'),('WWE Intercontinental Championship','WWE',2,'singles','Luke Harper','2014-12-29'),
 ('WWE United States Championship','WWE',2,'singles','Rusev','2014-11-03'),('WWE Tag Team Championship','WWE',1,'tag','Jey Uso & Jimmy Uso','2014-12-29'),
 ('WWE Divas Championship','WWE',1,'singles','Nikki Bella','2014-11-23'),('NXT Championship','WWE',2,'singles','Kevin Owens','2014-12-11'),
 ('TNA World Heavyweight Championship','TNA',1,'singles','Bobby Lashley','2014-06-15'),('TNA X Division Championship','TNA',2,'singles','Low Ki','2014-11-19'),
 ('TNA World Tag Team Championship','TNA',1,'tag','Davey Richards & Eddie Edwards','2014-10-08'),('TNA Knockouts Championship','TNA',1,'singles','Havok','2014-10-01'),
 ('ROH World Championship','ROH',1,'singles','Jay Briscoe','2014-09-06'),('ROH World Television Championship','ROH',2,'singles','Jay Lethal','2014-04-04'),
 ('ROH World Tag Team Championship','ROH',1,'tag',"Bobby Fish & Kyle O'Reilly",'2014-06-22'),
 ('IWGP Heavyweight Championship','NJPW',1,'singles','Hiroshi Tanahashi','2014-10-13'),('IWGP Intercontinental Championship','NJPW',2,'singles','Shinsuke Nakamura','2014-09-21'),
 ('IWGP Junior Heavyweight Championship','NJPW',2,'singles','',''),('IWGP Tag Team Championship','NJPW',1,'tag','Karl Anderson & Doc Gallows','2014-11-08'),
 ('Triple Crown Heavyweight Championship','AJPW',1,'singles','',''),('GHC Heavyweight Championship','NOAH',1,'singles','',''),
 ('Open the Dream Gate Championship','Toryumon',1,'singles','',''),('CMLL World Heavyweight Championship','CMLL',1,'singles','',''),('AAA Mega Championship','AAA',1,'singles','',''),
 ('Lucha Underground Championship','LU',1,'singles','',''),('World of Stardom Championship','Stardom',1,'singles','',''),('KO-D Openweight Championship','DDT',1,'singles','','')]

R20="""
@WWE
Brock Lesnar,1977-07-12,2000,H,76,84,90,286,Monster
The Fiend,1987-05-23,2009,H,94,72,88,285,Monster,2023-08-24
Roman Reigns,1985-05-25,2010,F,78,80,86,265
Seth Rollins,1986-05-28,2005,H,80,92,80,217
AJ Styles,1977-06-02,1998,H,82,94,80,218
Kofi Kingston,1981-08-14,2006,F,84,84,72,212
Big E,1986-03-01,2010,F,88,76,68,285
Xavier Woods,1986-09-04,2005,F,84,72,58,205
Randy Orton,1980-04-01,2000,H,86,86,82,250,Veteran
Rey Mysterio,1974-12-11,1989,F,76,86,76,175,Masked
Drew McIntyre,1985-06-06,2001,F,76,84,74,265
Daniel Bryan,1981-05-22,1999,F,82,96,80,210,Technician
Shinsuke Nakamura,1980-02-24,2002,H,88,84,66,229
Sami Zayn,1984-07-12,2002,H,86,88,62,212
Kevin Owens,1984-05-07,2000,F,86,86,72,266,Brawler
Andrade,1989-11-03,2003,H,64,86,60,214
Braun Strowman,1983-09-06,2013,F,68,64,72,385,Monster
Bobby Lashley,1976-07-16,2004,H,64,80,66,273,Monster
Rusev,1985-12-25,2008,F,74,78,62,305
Ricochet,1988-10-11,2003,F,68,94,58,188
Erik,1984-06-21,2003,F,54,72,52,250
Ivar,1984-05-14,2004,F,52,76,52,320
Jey Uso,1985-08-22,2009,F,72,80,60,235
Jimmy Uso,1985-08-22,2009,F,72,78,58,251
King Corbin,1984-09-26,2012,H,72,66,62,275,Villain
The Miz,1980-10-08,2004,F,90,70,66,221,Showman
John Cena,1977-04-23,2000,F,94,76,88,251,Hero
Undertaker,1965-03-24,1987,F,86,64,88,299,Veteran,,2020-11-22
Adam Cole,1989-07-05,2008,H,88,86,62,210
Finn Balor,1981-07-25,2000,H,76,90,66,190
Tommaso Ciampa,1985-05-08,2005,H,80,86,56,201
Johnny Gargano,1987-08-14,2005,F,74,88,56,197
Keith Lee,1984-11-08,2005,F,76,86,54,340
f Becky Lynch,1987-01-30,2002,F,94,84,90,135
f Charlotte Flair,1986-04-05,2012,F,86,90,82,145
f Bayley,1989-06-15,2008,H,84,86,70,119
f Sasha Banks,1992-01-26,2010,H,86,90,74,114
f Asuka,1981-09-26,2004,H,78,90,70,135
f Kairi Sane,1988-09-23,2011,H,74,82,58,115
f Alexa Bliss,1991-08-09,2013,H,84,70,70,102
f Nikki Cross,1989-04-21,2008,F,72,74,50,125
f Rhea Ripley,1996-10-11,2013,F,76,80,58,137
f Shayna Baszler,1980-08-08,2006,H,62,82,58,145
f Io Shirai,1990-05-08,2007,H,72,92,54,120
f Bianca Belair,1989-04-09,2016,F,82,78,52,165
@AEW
Chris Jericho,1970-11-09,1990,H,94,82,84,227,Showman
Jon Moxley,1985-12-07,2004,F,86,82,80,234,Brawler
Kenny Omega,1983-10-16,2000,F,86,96,78,201,Showman
Adam Page,1991-07-27,2008,F,82,86,66,214
Cody,1985-06-30,2006,F,86,84,74,220,Showman
Matt Jackson,1985-03-13,2004,F,82,88,68,174
Nick Jackson,1989-07-28,2004,F,80,88,68,173
Pac,1986-12-22,2004,H,70,92,58,190
Darby Allin,1993-01-07,2015,F,78,82,54,170
Maxwell Jacob Friedman,1996-03-15,2015,H,92,78,60,216,Villain
Brodie Lee,1979-11-16,2003,H,72,82,56,275,Villain,2020-12-26
Orange Cassidy,1984-05-04,2004,F,86,74,58,163,Showman
Jungle Boy,1997-03-23,2015,F,72,82,46,180
Frankie Kazarian,1977-08-26,1998,F,66,84,50,215
Scorpio Sky,1983-03-20,2002,F,64,82,48,215
Dustin Rhodes,1969-04-11,1988,F,74,80,54,232,Veteran
Jake Hager,1982-03-24,2006,H,58,74,46,263
Lance Archer,1977-02-28,2000,H,60,76,50,280,Monster
Sammy Guevara,1993-07-28,2010,H,74,84,48,190
f Riho,1997-03-04,2006,F,70,80,48,100
f Nyla Rose,1982-05-23,2009,H,62,68,48,240
f Britt Baker,1991-04-23,2015,H,80,72,50,124
f Hikaru Shida,1988-02-11,2008,F,64,82,44,130
@NJPW
Kazuchika Okada,1987-11-08,2004,F,88,96,86,236,Showman
Tetsuya Naito,1982-06-22,2006,H,88,88,84,225,Villain
Hiroshi Tanahashi,1976-11-13,1999,F,86,84,78,229,Veteran
Jay White,1992-10-09,2013,H,78,86,72,215,Villain
Kota Ibushi,1982-05-21,2004,F,74,94,74,203
Will Ospreay,1993-05-07,2012,F,74,96,68,195
Shingo Takagi,1982-11-21,2004,F,66,90,62,220
Hiromu Takahashi,1989-12-04,2010,H,78,90,62,180
Zack Sabre Jr.,1987-07-24,2004,H,72,96,60,180,Technician
Tomohiro Ishii,1975-12-10,1996,F,66,92,58,220,Brawler
Evil,1987-01-19,2011,H,60,76,56,225
Sanada,1988-01-28,2007,H,66,86,58,210
Kenta,1981-03-12,2000,H,74,88,62,190
Hirooki Goto,1979-06-25,2003,F,58,84,52,225
Tama Tonga,1982-11-01,2009,H,64,76,50,240
Tanga Loa,1983-03-30,2009,H,56,72,48,250
Juice Robinson,1989-04-12,2008,F,72,74,48,210
Taichi,1980-03-19,2002,H,66,72,46,215
El Desperado,1984-01-01,2010,H,70,86,50,190,Masked
f Momo Watanabe,2000-01-01,2017,H,56,72,20,130,Rookie
@ROH
Rush,1988-09-29,2005,H,80,82,56,210,Villain
Jay Lethal,1985-04-29,2001,F,80,86,52,215
PCO,1967-10-02,1987,F,62,64,46,265,Monster
Dragon Lee,1995-05-12,2014,F,64,90,48,170
Bandido,1995-01-01,2010,F,66,90,46,190,Masked
Jay Briscoe,1984-01-25,2000,F,70,82,48,230,Brawler,2024-01-17
Mark Briscoe,1985-01-18,2000,F,68,82,46,215,Brawler
Matt Taven,1985-03-17,2006,H,66,80,44,200
f Kelly Klein,1984-01-01,2008,F,52,72,36,145
@TNA
Sami Callihan,1987-08-20,2006,H,72,80,46,215,Brawler
Tessa Blanchard,1995-10-26,2014,F,72,86,52,130
Rich Swann,1991-02-05,2006,F,72,86,46,177
Eddie Edwards,1983-12-30,2002,F,62,86,44,215
Moose,1984-06-16,2012,H,62,76,46,290
Ace Austin,1997-09-22,2015,H,66,82,36,175
Ethan Page,1989-04-13,2007,H,72,76,40,250
Josh Alexander,1987-06-18,2005,H,56,90,40,230
f Taya Valkyrie,1983-11-22,2012,H,66,74,44,135
f Jordynne Grace,1996-09-21,2013,F,64,80,40,170
@MLW
Jacob Fatu,1992-04-12,2012,H,66,84,46,325,Monster
Tom Lawlor,1983-05-14,2015,H,62,78,36,205
Alexander Hammerstone,1991-05-01,2015,F,66,76,38,250
@NWA
Nick Aldis,1986-12-06,2006,H,72,80,46,240,Veteran
Eli Drake,1983-05-01,2005,H,80,66,40,240
f Thunder Rosa,1986-07-22,2014,F,70,80,40,130
@Stardom
f Mayu Iwatani,1993-02-19,2011,F,74,86,54,115
f Utami Hayashishita,1998-05-29,2017,F,64,82,44,135
f Giulia,1994-04-21,2017,H,82,82,48,125
f Tam Nakano,1996-01-01,2016,F,72,74,42,115
f Syuri,1989-02-01,2005,F,62,86,42,130
f Hana Kimura,1997-09-03,2016,H,72,66,40,145,,2020-05-23
f Starlight Kid,2002-01-01,2014,F,62,80,30,110,Masked
f AZM,2002-07-07,2013,F,62,82,32,105
@CMLL
Ultimo Guerrero,1972-09-25,1993,H,64,76,50,200,Masked
Volador Jr.,1981-03-15,1997,F,66,86,54,185,Masked
Barbaro Cavernario,1993-01-01,2010,H,66,82,44,185
Soberano Jr.,1998-01-01,2015,F,62,84,40,170,Masked
Titan,1990-01-01,2007,F,60,86,42,175,Masked
@AAA
Psycho Clown,1985-12-16,2004,F,76,70,60,240,Masked
Pagano,1986-01-01,2008,F,62,62,44,220,Brawler
Laredo Kid,1987-01-01,2002,F,60,88,42,170,Masked
El Hijo del Vikingo,1997-01-01,2012,F,72,94,44,165,Masked
Pentagon Jr.,1985-02-26,2007,H,82,86,62,195,Masked
Fenix,1990-12-30,2005,F,74,94,60,175,Masked
@NOAH
Kaito Kiyomiya,1996-07-17,2015,F,66,84,48,230
Go Shiozaki,1982-01-21,2004,F,64,86,52,240
Naomichi Marufuji,1979-09-26,1998,F,72,90,54,190,Veteran
Katsuhiko Nakajima,1988-03-11,2003,H,64,88,50,190
Kenoh,1985-03-15,2006,H,72,84,48,190
Takashi Sugiura,1970-05-20,2000,H,58,84,48,232
@AJPW
Kento Miyahara,1989-02-27,2006,F,76,86,50,220
Suwama,1976-10-07,2004,F,58,80,44,265
Jake Lee,1989-01-19,2011,F,62,80,40,240
@Toryumon
Ben-K,1991-01-01,2014,F,62,80,36,220
Eita,1992-01-01,2011,H,66,84,36,175
YAMATO,1981-09-14,2006,H,64,80,38,200
Masato Yoshino,1980-09-29,2000,F,66,84,40,170,Veteran
@DDT
Konosuke Takeshita,1995-05-29,2012,F,68,90,44,220
HARASHIMA,1975-09-16,2000,F,62,80,36,210,Veteran
@GCW
Nick Gage,1980-12-01,1999,H,72,62,40,240,Brawler
Joey Janela,1989-07-30,2007,F,76,72,38,170,Showman
@
Bron Breakker,1997-10-06,2021,F,62,70,10,250,Rookie
f Jade Cargill,1992-06-03,2020,F,72,60,10,165,Rookie
Swerve Strickland,1990-07-26,2008,H,80,86,40,190
"""
TI20=[('WWE Championship','WWE',1,'singles','Brock Lesnar','2019-10-04'),('WWE Universal Championship','WWE',1,'singles','The Fiend','2019-10-31'),
 ('WWE Intercontinental Championship','WWE',2,'singles','Shinsuke Nakamura','2019-07-16'),('WWE United States Championship','WWE',2,'singles','Andrade','2019-12-26'),
 ('Raw Tag Team Championship','WWE',1,'tag','Erik & Ivar','2019-07-08'),('SmackDown Tag Team Championship','WWE',1,'tag','Big E & Kofi Kingston','2019-10-04'),
 ("Raw Women's Championship",'WWE',1,'singles','Becky Lynch','2019-04-07'),("SmackDown Women's Championship",'WWE',1,'singles','Bayley','2019-10-11'),
 ("WWE Women's Tag Team Championship",'WWE',1,'tag','Asuka & Kairi Sane','2019-10-06'),('NXT Championship','WWE',2,'singles','Adam Cole','2019-06-01'),
 ("NXT Women's Championship",'WWE',2,'singles','Rhea Ripley','2019-12-18'),
 ('AEW World Championship','AEW',1,'singles','Chris Jericho','2019-08-31'),("AEW Women's World Championship",'AEW',1,'singles','Riho','2019-10-02'),
 ('AEW World Tag Team Championship','AEW',1,'tag','Frankie Kazarian & Scorpio Sky','2019-10-30'),
 ('IWGP Heavyweight Championship','NJPW',1,'singles','Kazuchika Okada','2019-04-06'),('IWGP Intercontinental Championship','NJPW',2,'singles','Jay White','2019-10-14'),
 ('IWGP Junior Heavyweight Championship','NJPW',2,'singles','Will Ospreay','2019-05-16'),('IWGP Tag Team Championship','NJPW',1,'tag','Tama Tonga & Tanga Loa','2019-10-14'),
 ('NEVER Openweight Championship','NJPW',3,'singles','Kenta','2019-09-22'),
 ('ROH World Championship','ROH',1,'singles','Rush','2019-12-13'),('ROH World Television Championship','ROH',2,'singles','Dragon Lee','2019-07-20'),
 ('Impact World Championship','TNA',1,'singles','Sami Callihan','2019-10-20'),("Impact Knockouts Championship",'TNA',1,'singles','Taya Valkyrie','2019-01-06'),
 ('Impact X Division Championship','TNA',2,'singles','Ace Austin','2019-11-22'),('Impact World Tag Team Championship','TNA',1,'tag','Ethan Page & Josh Alexander','2019-07-07'),
 ('MLW World Heavyweight Championship','MLW',1,'singles','Jacob Fatu','2019-07-06'),('NWA Worlds Heavyweight Championship','NWA',1,'singles','Nick Aldis','2018-10-21'),
 ('World of Stardom Championship','Stardom',1,'singles','',''),('GHC Heavyweight Championship','NOAH',1,'singles','Kaito Kiyomiya','2019-11-02'),
 ('Triple Crown Heavyweight Championship','AJPW',1,'singles','',''),('Open the Dream Gate Championship','Toryumon',1,'singles','',''),
 ('CMLL World Heavyweight Championship','CMLL',1,'singles','',''),('AAA Mega Championship','AAA',1,'singles','',''),('KO-D Openweight Championship','DDT',1,'singles','',''),
 ('GCW World Championship','GCW',1,'singles','','')]

R26="""
@WWE
Cody Rhodes,1985-06-30,2006,F,90,86,92,220,Hero
Roman Reigns,1985-05-25,2010,F,86,82,92,265
Seth Rollins,1986-05-28,2005,H,86,92,84,217
CM Punk,1978-10-26,1999,F,94,82,88,218,Veteran
Gunther,1987-08-20,2005,H,78,92,82,297,Technician
Jey Uso,1985-08-22,2009,F,86,78,82,235
Jimmy Uso,1985-08-22,2009,F,76,78,66,251
Randy Orton,1980-04-01,2000,F,88,84,84,250,Veteran
Drew McIntyre,1985-06-06,2001,H,80,84,78,265
Brock Lesnar,1977-07-12,2000,H,76,80,82,286,Monster
LA Knight,1982-08-24,2003,F,90,72,78,230,Showman
Bron Breakker,1997-10-06,2021,H,70,82,74,250
Bronson Reed,1988-11-01,2008,H,62,76,62,330,Monster
Solo Sikoa,1993-03-12,2018,H,62,74,62,275
Jacob Fatu,1992-04-12,2012,H,70,86,70,325,Monster
Sami Zayn,1984-07-12,2002,F,88,86,72,212
Kevin Owens,1984-05-07,2000,H,86,84,70,266,Brawler
Damian Priest,1982-09-26,2005,F,74,78,66,255
Dominik Mysterio,1997-04-05,2020,H,86,72,72,200,Villain
Rey Mysterio,1974-12-11,1989,F,76,80,68,175,Veteran
Penta,1985-02-26,2007,F,84,86,70,195,Masked
Carmelo Hayes,1994-10-06,2014,H,78,84,56,200
AJ Styles,1977-06-02,1998,F,82,88,76,218,Veteran,,2026-01-31
Sheamus,1978-01-28,2002,F,78,80,62,267,Veteran
Logan Paul,1995-04-01,2021,H,80,72,70,210,Showman
Oba Femi,1998-04-26,2022,F,64,76,54,295,Monster
Trick Williams,1994-09-11,2021,F,82,70,56,210
f Rhea Ripley,1996-10-11,2013,F,86,84,86,137
f Iyo Sky,1990-05-08,2007,F,76,92,76,120
f Bianca Belair,1989-04-09,2016,F,84,80,78,165
f Liv Morgan,1994-06-08,2014,H,84,72,76,115
f Raquel Rodriguez,1990-12-12,2017,H,62,72,58,185
f Tiffany Stratton,1999-04-24,2021,H,82,76,72,135
f Jade Cargill,1992-06-03,2020,F,76,66,72,165
f Charlotte Flair,1986-04-05,2012,F,86,88,80,145
f Becky Lynch,1987-01-30,2002,H,92,82,84,135
f Stephanie Vaquer,1993-01-01,2011,F,78,86,64,125
f Naomi,1987-11-30,2009,F,80,76,62,130
f Asuka,1981-09-26,2004,H,78,86,64,135
f Bayley,1989-06-15,2008,F,82,84,64,119
f Lyra Valkyria,1997-01-01,2017,F,66,80,54,125
f Chelsea Green,1991-04-04,2014,H,86,70,58,130,Showman
f Nia Jax,1984-05-29,2014,H,66,66,58,272,Monster
@AEW
Adam Page,1991-07-27,2008,F,86,86,80,214,Hero
Jon Moxley,1985-12-07,2004,H,86,80,78,234,Brawler
Kenny Omega,1983-10-16,2000,F,86,94,78,201,Showman
Will Ospreay,1993-05-07,2012,F,78,96,78,195
Maxwell Jacob Friedman,1996-03-15,2015,H,94,82,78,216,Villain
Swerve Strickland,1990-07-26,2008,F,84,86,72,190
Samoa Joe,1979-03-17,1999,H,78,84,70,282,Veteran
Kazuchika Okada,1987-11-08,2004,H,86,92,76,236,Showman
Konosuke Takeshita,1995-05-29,2012,H,72,92,66,220
Kyle Fletcher,1999-01-01,2016,H,72,90,62,205
Darby Allin,1993-01-07,2015,F,80,82,66,170
Orange Cassidy,1984-05-04,2004,F,86,74,62,163,Showman
Ricochet,1988-10-11,2003,H,72,92,62,188
Christian Cage,1973-11-30,1995,H,86,76,62,212,Veteran
Dax Harwood,1984-01-01,2004,F,66,90,62,220
Cash Wheeler,1987-01-01,2006,F,64,88,62,225
Matt Jackson,1985-03-13,2004,H,82,86,66,174
Nick Jackson,1989-07-28,2004,H,80,86,66,173
Brody King,1987-01-01,2015,F,66,80,52,290,Brawler
Hook,1999-01-01,2021,F,72,70,52,200
f Mercedes Mone,1992-01-26,2010,H,88,88,78,114,Showman
f Toni Storm,1995-10-19,2009,F,90,80,74,140,Showman
f Kris Statlander,1995-02-28,2016,F,72,80,62,155
f Jamie Hayter,1995-01-01,2011,F,70,82,60,145
f Thunder Rosa,1986-07-22,2014,F,70,78,52,130
@NJPW
Zack Sabre Jr.,1987-07-24,2004,H,74,96,70,180,Technician
Hiroshi Tanahashi,1976-11-13,1999,F,88,74,78,229,Veteran,,2026-01-04
Shingo Takagi,1982-11-21,2004,F,68,88,62,220
Yota Tsuji,1993-01-01,2015,F,74,86,62,230
Shota Umino,1997-01-01,2016,F,72,80,58,215
Hirooki Goto,1979-06-25,2003,F,58,80,54,225,Veteran
El Desperado,1984-01-01,2010,H,74,86,58,190,Masked
Hiromu Takahashi,1989-12-04,2010,F,80,88,60,180
Evil,1987-01-19,2011,H,62,72,52,225
David Finlay,1993-05-16,2012,H,64,80,52,215
Gabe Kidd,1997-01-01,2016,H,70,82,50,225,Brawler
Jake Lee,1989-01-19,2011,H,62,80,48,240
Callum Newman,2002-01-01,2018,H,66,84,46,195
@TNA
Mike Santana,1991-01-01,2009,F,80,80,56,210
Joe Hendry,1988-06-01,2009,F,90,70,60,230,Showman
Nic Nemeth,1980-07-27,2004,F,80,84,58,218,Veteran
Frankie Kazarian,1977-08-26,1998,H,70,82,50,215,Veteran
Moose,1984-06-16,2012,H,62,76,48,290
Leon Slater,2003-01-01,2018,F,64,88,44,170
Matt Hardy,1974-09-23,1992,F,80,72,52,236,Veteran
Jeff Hardy,1977-08-31,1993,F,80,72,54,215,Veteran
f Masha Slamovich,1992-01-01,2015,H,64,84,48,145
f Ash by Elegance,1993-01-01,2017,H,70,66,44,120
@ROH
Bandido,1995-01-01,2010,F,68,90,48,190,Masked
Lee Moriarty,1997-01-01,2016,H,58,84,36,175
f Athena,1988-01-01,2007,H,78,82,50,140,Villain
@Stardom
f Saya Kamitani,1996-01-01,2019,F,76,86,52,120
f Momo Watanabe,2000-01-01,2017,H,62,80,46,130
f Starlight Kid,2002-01-01,2014,H,70,82,44,110
f AZM,2002-07-07,2013,F,62,84,42,105
f Natsupoi,1995-01-01,2015,F,70,78,40,115
f Maika,1997-01-01,2017,F,66,78,40,140
@CMLL
Mistico,1997-01-01,2012,F,80,90,58,170,Masked
Mascara Dorada,1996-01-01,2015,F,66,88,46,165,Masked
Atlantis Jr.,2000-01-01,2016,F,66,86,46,180,Masked
Templario,1991-01-01,2010,H,58,84,40,190,Masked
Volador Jr.,1981-03-15,1997,F,66,82,48,185,Masked,,
Ultimo Guerrero,1972-09-25,1993,H,64,72,46,200,Veteran
@AAA
El Hijo del Vikingo,1997-01-01,2012,F,76,96,58,165,Masked
Psycho Clown,1985-12-16,2004,F,76,68,54,240,Masked
Laredo Kid,1987-01-01,2002,F,60,86,40,170,Masked
Pagano,1986-01-01,2008,H,64,60,40,220,Brawler
Mr. Iguana,1990-01-01,2012,F,82,64,40,170,Showman
@NOAH
Kaito Kiyomiya,1996-07-17,2015,F,70,86,52,230
Yoshiki Inamura,1992-01-01,2017,F,72,76,46,290
Ozawa,1997-01-01,2020,H,74,80,44,190
Naomichi Marufuji,1979-09-26,1998,F,72,84,46,190,Veteran
@AJPW
Kento Miyahara,1989-02-27,2006,F,78,84,48,220
Suwama,1976-10-07,2004,F,58,72,38,265,Veteran
@Toryumon
Shun Skywalker,1997-01-01,2017,H,66,88,36,175
Ben-K,1991-01-01,2014,F,62,80,36,220
@DDT
Yuki Ueno,1996-01-01,2017,F,66,84,36,170
@GCW
Nick Gage,1980-12-01,1999,H,74,60,40,240,Brawler
Joey Janela,1989-07-30,2007,F,76,70,38,170,Showman
@MLW
Alexander Hammerstone,1991-05-01,2015,F,66,76,40,250
Matt Riddle,1985-11-14,2014,F,72,82,48,220
@NWA
Thom Latimer,1986-01-01,2004,H,62,78,32,240
f Kenzie Paige,1999-01-01,2016,F,58,70,28,130
@
Tetsuya Naito,1982-06-22,2006,H,88,82,72,225,Villain
Tomohiro Ishii,1975-12-10,1996,F,66,86,52,220,Brawler
Kenta,1981-03-12,2000,H,70,82,46,190
f Mayu Iwatani,1993-02-19,2011,F,74,84,50,115
"""
TI26=[('Undisputed WWE Championship','WWE',1,'singles','Cody Rhodes','2025-08-03'),('World Heavyweight Championship','WWE',1,'singles','CM Punk','2025-11-17'),
 ('WWE Intercontinental Championship','WWE',2,'singles','Dominik Mysterio','2025-04-20'),('WWE United States Championship','WWE',2,'singles','',''),
 ("Women's World Championship",'WWE',1,'singles','Stephanie Vaquer','2025-09-20'),("WWE Women's Championship",'WWE',1,'singles','',''),
 ('World Tag Team Championship','WWE',1,'tag','',''),('WWE Tag Team Championship','WWE',1,'tag','',''),('NXT Championship','WWE',2,'singles','Oba Femi',''),
 ('AEW World Championship','AEW',1,'singles','Adam Page','2025-07-12'),("AEW Women's World Championship",'AEW',1,'singles','',''),
 ('AEW World Tag Team Championship','AEW',1,'tag','',''),('AEW TNT Championship','AEW',2,'singles','',''),
 ('IWGP World Heavyweight Championship','NJPW',1,'singles','',''),('IWGP Junior Heavyweight Championship','NJPW',2,'singles','',''),
 ('TNA World Championship','TNA',1,'singles','',''),("TNA Knockouts World Championship",'TNA',1,'singles','',''),
 ('ROH World Championship','ROH',1,'singles','Bandido',''),("ROH Women's World Championship",'ROH',1,'singles','Athena',''),
 ('World of Stardom Championship','Stardom',1,'singles','',''),('GHC Heavyweight Championship','NOAH',1,'singles','',''),
 ('Triple Crown Heavyweight Championship','AJPW',1,'singles','',''),('Open the Dream Gate Championship','Toryumon',1,'singles','',''),
 ('CMLL World Heavyweight Championship','CMLL',1,'singles','',''),('AAA Mega Championship','AAA',1,'singles','',''),('KO-D Openweight Championship','DDT',1,'singles','',''),
 ('GCW World Championship','GCW',1,'singles','',''),('MLW World Heavyweight Championship','MLW',1,'singles','',''),('NWA Worlds Heavyweight Championship','NWA',1,'singles','','')]
