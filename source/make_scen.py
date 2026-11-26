# Builds the built-in scenarios from public wrestling history (not from any other game's files).
# Rough dates and stats on purpose: players can change anything in the editor.
import json

def W(name,g,birth,debut,home,al,cha,wrk,pop,wt,gim='None',retire='',death=''):
    b=str(birth); d=str(debut)
    return {'name':name,'gender':g,'birth':b if '-' in b else b+'-06-01','debut':d if '-' in d else d+'-01-01','retire':retire,'death':death,
            'home':home,'align':al,'cha':cha,'wrk':wrk,'pop':pop,'wt':wt,'gim':gim}

def C(short,name,open_,close,pop,size,sty,renames=None,owner=''):
    c={'short':short,'name':name,'open':open_,'close':close,'pop':pop,'size':size,'renames':renames or [],'owner':owner}
    for i,k in enumerate(sty): c['sty%d'%i]=k
    return c

def T(name,co,tier,div,champ,since):
    return {'name':name,'co':co,'tier':tier,'div':div,'champ':champ,'since':since,'past':''}

# ---------- companies across the modern era (renames and closures follow history) ----------
COS=[
 C('WWF','World Wrestling Federation','1963-04-29','',88,'International',['entertainment'],[{'date':'2002-05-06','short':'WWE','name':'World Wrestling Entertainment'}]),
 C('WCW','World Championship Wrestling','1988-11-02','2001-03-26',80,'International',['entertainment','lucha']),
 C('ECW','Eastern Championship Wrestling','1992-02-25','2001-04-04',45,'Regional',['hardcore'],[{'date':'1994-08-27','short':'ECW','name':'Extreme Championship Wrestling'}]),
 C('NJPW','New Japan Pro-Wrestling','1972-03-06','',78,'National',['strong','serious']),
 C('AJPW','All Japan Pro Wrestling','1972-10-21','',74,'National',['serious','strong']),
 C('CMLL','Consejo Mundial de Lucha Libre','1933-09-21','',66,'National',['lucha']),
 C('AAA','Asistencia Asesoría y Administración','1992-05-15','',64,'National',['lucha','entertainment']),
 C('SMW','Smoky Mountain Wrestling','1991-10-01','1995-11-30',35,'Local',['serious']),
 C('USWA','United States Wrestling Association','1989-01-01','1997-12-31',38,'Local',['entertainment']),
 C('FMW','Frontier Martial-Arts Wrestling','1989-07-28','2002-02-15',42,'Regional',['hardcore']),
 C('Toryumon','Toryumon Japan','1999-01-01','',40,'Regional',['lucha'],[{'date':'2004-07-04','short':'Dragon Gate','name':'Dragon Gate'}]),
 C('NOAH','Pro Wrestling NOAH','2000-08-05','',62,'National',['strong','serious']),
 C('ZERO1','Pro Wrestling ZERO1','2001-03-02','',40,'Regional',['strong']),
 C('ROH','Ring of Honor','2002-02-23','',35,'Regional',['grappling','strong']),
 C('TNA','Total Nonstop Action Wrestling','2002-06-19','',45,'National',['entertainment','lucha'],[{'date':'2017-03-02','short':'Impact','name':'Impact Wrestling'},{'date':'2024-01-13','short':'TNA','name':'TNA Wrestling'}]),
 C('DDT','DDT Pro-Wrestling','1997-08-17','',38,'Regional',['comedy','strong']),
 C('Stardom','World Wonder Ring Stardom','2011-01-23','',40,'Regional',['women','strong']),
 C('LU','Lucha Underground','2014-10-29','2018-11-14',45,'National',['lucha','entertainment']),
 C('GCW','Game Changer Wrestling','2015-01-01','',28,'Local',['hardcore']),
 C('NWA','National Wrestling Alliance','2017-05-01','',35,'Regional',['serious']),
 C('MLW','Major League Wrestling','2017-07-06','',32,'Regional',['strong','lucha']),
 C('AEW','All Elite Wrestling','2019-05-25','',70,'National',['entertainment','strong']),
]

# ---------- wrestlers: name, gender, birth, debut, home in 1994, alignment, cha, wrk, pop, weight, gimmick ----------
R94=[
 # WWF
 W('Bret Hart','M','1957-07-02',1976,'WWF','F',72,95,88,234,'Technician'),
 W('Shawn Michaels','M','1965-07-22',1984,'WWF','H',90,93,82,225,'Showman'),
 W('Razor Ramon','M','1958-10-20',1984,'WWF','H',84,76,80,287,'Villain',death='2022-03-14'),
 W('Yokozuna','M','1966-10-02',1984,'WWF','H',60,62,82,568,'Monster',death='2000-10-23'),
 W('The Undertaker','M','1965-03-24',1987,'WWF','F',78,74,88,328,'Monster'),
 W('Lex Luger','M','1958-06-02',1985,'WWF','F',62,64,78,265,'Hero'),
 W('Owen Hart','M','1965-05-07',1986,'WWF','H',78,90,68,227,'Technician',death='1999-05-23'),
 W('Diesel','M','1959-02-09',1990,'WWF','H',66,60,66,328,'Monster'),
 W('Mr. Perfect','M','1958-03-28',1978,'WWF','F',82,88,70,235,'Technician',death='2003-02-10'),
 W('Randy Savage','M','1952-11-15',1973,'WWF','F',94,82,84,237,'Showman',death='2011-05-20'),
 W('The 1-2-3 Kid','M','1972-04-22',1990,'WWF','F',58,82,52,212,'Rookie'),
 W('Jeff Jarrett','M','1967-07-14',1986,'WWF','H',72,72,55,230,'Villain'),
 W('Doink the Clown','M','1958-01-01',1985,'WWF','H',62,60,48,250,'Showman'),
 W('Bam Bam Bigelow','M','1961-09-01',1985,'WWF','H',58,74,62,390,'Monster',death='2007-01-19'),
 W('Jacques Rougeau','M','1960-06-13',1977,'WWF','H',55,70,50,240),
 W('Pierre Ouellet','M','1964-06-30',1982,'WWF','H',52,68,48,260),
 W('Alundra Blayze','F','1964-01-02',1984,'WWF','F',62,74,56,135),
 W('Bertha Faye','F','1961-01-01',1984,'WWF','H',50,66,40,200),
 W('Hunter Hearst Helmsley','M','1969-07-27','1992-03-24','WCW','H',66,72,40,246,'Rookie'),
 # WCW
 W('Ric Flair','M','1949-02-25',1972,'WCW','F',96,88,90,243,'Showman'),
 W('Sting','M','1959-03-20',1985,'WCW','F',82,76,88,250,'Hero'),
 W('Vader','M','1955-05-14',1985,'WCW','H',66,82,80,450,'Monster',death='2018-06-18'),
 W('Steve Austin','M','1964-12-18',1989,'WCW','H',74,86,62,252,'Technician'),
 W('Ricky Steamboat','M','1953-02-28',1976,'WCW','F',76,92,72,235,'Technician'),
 W('Cactus Jack','M','1965-06-11',1986,'WCW','F',78,74,60,287,'Brawler'),
 W('Lord Steven Regal','M','1968-05-10',1983,'WCW','H',80,88,56,240,'Technician'),
 W('Dustin Rhodes','M','1969-04-11',1988,'WCW','F',64,80,60,232),
 W('Brian Pillman','M','1962-05-22',1986,'WCW','F',76,82,56,227,death='1997-10-05'),
 W('Arn Anderson','M','1958-09-20',1982,'WCW','H',84,84,62,249,'Veteran'),
 W('Sid Vicious','M','1960-12-16',1987,'WCW','H',62,48,66,317,'Monster',death='2024-08-26'),
 W('Brian Knobbs','M','1964-05-06',1985,'WCW','H',50,54,52,295,'Brawler'),
 W('Jerry Sags','M','1964-02-14',1985,'WCW','H',48,56,50,280,'Brawler'),
 W('Madusa','F','1964-01-02',1984,'WCW','F',60,72,40,135),
 W('Big Van Vader Jr','M','1975-01-01','2001-01-01','','H',40,50,10,300,'Rookie'),
 # ECW
 W('Terry Funk','M','1944-06-30',1965,'ECW','F',88,74,70,247,'Veteran',death='2023-08-23'),
 W('Shane Douglas','M','1964-11-21',1982,'ECW','H',80,76,56,235,'Villain'),
 W('Sabu','M','1964-12-12',1985,'ECW','H',56,74,56,220,'Brawler'),
 W('Tommy Dreamer','M','1971-02-13',1989,'ECW','F',72,66,44,250,'Brawler'),
 W('The Sandman','M','1963-06-16',1989,'ECW','F',76,46,52,240,'Brawler'),
 W('Taz','M','1967-10-11',1987,'ECW','H',72,80,46,215,'Brawler'),
 # NJPW
 W('Shinya Hashimoto','M','1965-07-03',1984,'NJPW','F',70,86,84,278,'Hero',death='2005-07-11'),
 W('Keiji Mutoh','M','1962-12-23',1984,'NJPW','F',80,90,86,243,'Showman'),
 W('Masahiro Chono','M','1963-09-17',1984,'NJPW','H',76,80,78,243,'Villain'),
 W('Jushin Liger','M','1964-11-30',1984,'NJPW','F',70,94,80,209,'Masked'),
 W('Tatsumi Fujinami','M','1953-12-28',1971,'NJPW','F',68,84,74,231,'Veteran'),
 W('Riki Choshu','M','1951-12-03',1974,'NJPW','F',70,78,74,236,'Veteran'),
 W('Kensuke Sasaki','M','1966-08-04',1986,'NJPW','F',58,82,66,253),
 W('Hiroshi Hase','M','1961-05-08',1986,'NJPW','F',56,86,60,231,'Technician'),
 W('El Samurai','M','1966-05-09',1987,'NJPW','F',50,84,52,198,'Masked'),
 W('Koji Kanemoto','M','1966-08-14',1990,'NJPW','F',54,86,52,198),
 # AJPW
 W('Mitsuharu Misawa','M','1962-06-18',1981,'AJPW','F',66,98,90,240,'Technician',death='2009-06-13'),
 W('Toshiaki Kawada','M','1963-12-08',1982,'AJPW','H',62,94,82,232),
 W('Kenta Kobashi','M','1967-03-27',1988,'AJPW','F',72,97,84,253,'Hero'),
 W('Akira Taue','M','1961-05-08',1988,'AJPW','H',56,86,70,264),
 W('Jun Akiyama','M','1969-10-09',1992,'AJPW','F',56,84,56,232,'Rookie'),
 W('Stan Hansen','M','1949-08-29',1973,'AJPW','H',74,78,80,322,'Brawler'),
 W('Steve Williams','M','1960-05-14',1982,'AJPW','H',58,82,70,285,death='2009-12-29'),
 W('Giant Baba','M','1938-01-23',1960,'AJPW','F',72,40,82,309,'Veteran',death='1999-01-31'),
 W('Manami Toyota','F','1971-03-02',1987,'AJPW','F',62,96,70,145),
 # CMLL / AAA
 W('Último Dragón','M','1966-12-12',1987,'CMLL','F',64,90,64,183,'Masked'),
 W('El Hijo del Santo','M','1963-08-02',1982,'CMLL','F',76,88,78,198,'Masked'),
 W('Atlantis','M','1962-09-05',1983,'CMLL','F',66,82,68,198,'Masked'),
 W('Rey Mysterio Jr.','M','1974-12-11',1989,'AAA','F',70,94,66,165,'Masked'),
 W('Psicosis','M','1971-06-20',1990,'AAA','H',54,86,54,190,'Masked'),
 W('Konnan','M','1964-01-06',1987,'AAA','F',84,62,76,240,'Showman'),
 W('Eddie Guerrero','M','1967-10-09',1987,'AAA','H',86,94,64,220,'Technician',death='2005-11-13'),
 W('Art Barr','M','1966-09-18',1987,'AAA','H',76,82,56,180,death='1994-11-23'),
 W('Octagón','M','1961-03-27',1981,'AAA','F',64,72,68,198,'Masked'),
 W('Perro Aguayo','M','1946-07-18',1968,'AAA','F',72,70,70,220,'Veteran',death='2019-07-03'),
 # SMW / USWA
 W('Jim Cornette','M','1961-09-17',1982,'SMW','H',95,10,50,180,'Showman'),
 W('Chris Candido','M','1972-03-21',1986,'SMW','H',66,82,40,225,death='2005-04-28'),
 W('Jerry Lawler','M','1949-11-29',1970,'USWA','H',94,68,64,243,'Showman'),
 # FMW
 W('Atsushi Onita','M','1957-10-25',1974,'FMW','F',82,56,64,235,'Brawler'),
 W('Hayabusa','M','1968-11-29',1991,'FMW','F',58,84,52,220,'Masked',death='2016-03-03'),
 # Indies now, stars later (debut dates)
 W('Chris Jericho','M','1970-11-09',1990,'','F',86,86,40,226,'Showman'),
 W('Chris Benoit','M','1967-05-21',1985,'NJPW','F',44,95,52,220,'Technician'),
 W('Dean Malenko','M','1960-08-04',1979,'AJPW','F',40,94,40,212,'Technician'),
 W('Kurt Angle','M','1968-12-09','1998-10-01','','F',82,94,50,220,'Technician'),
 W('The Rock','M','1972-05-02','1996-03-01','','F',98,76,40,260,'Showman'),
 W('Mick Foley Jr','M','1980-01-01','2010-01-01','','F',40,40,10,240,'Rookie'),
 W('Edge','M','1973-10-30',1992,'','F',72,80,30,240),
 W('Christian','M','1973-11-30',1995,'','F',74,80,26,227),
 W('Jeff Hardy','M','1977-08-31',1993,'','F',70,76,28,215),
 W('Matt Hardy','M','1974-09-23',1992,'','F',66,78,26,236),
 W('Trish Stratus','F','1975-12-18','1999-11-01','','F',80,62,40,125),
 W('Lita','F','1975-04-14','1999-01-01','','F',74,64,36,130),
 W('Brock Lesnar','M','1977-07-12','2000-10-01','','H',62,82,40,286,'Monster'),
 W('John Cena','M','1977-04-23','2000-04-01','','F',90,70,40,251,'Hero'),
 W('Randy Orton','M','1980-04-01','2000-03-01','','H',78,80,40,250),
 W('Batista','M','1969-01-18','2000-01-01','','H',64,60,40,290,'Monster'),
 W('AJ Styles','M','1977-06-02','1998-01-01','','F',72,95,30,218),
 W('Samoa Joe','M','1979-03-17','1999-01-01','','H',74,90,30,282,'Brawler'),
 W('CM Punk','M','1978-10-26','1999-01-01','','H',92,84,30,218,'Showman'),
 W('Bryan Danielson','M','1981-05-22','1999-10-01','','F',66,98,30,210,'Technician'),
 W('Kenta','M','1981-03-12','2000-05-01','','F',62,90,30,190),
 W('Hiroshi Tanahashi','M','1976-11-13','1999-10-10','','F',84,90,30,229,'Hero'),
 W('Shinsuke Nakamura','M','1980-02-24','2002-08-29','','F',88,86,30,229,'Showman'),
 W('Rey Fenix Jr','M','1990-01-01','2005-01-01','','F',50,60,10,180,'Rookie'),
]

R03=[
 # WWE (Raw and SmackDown)
 W('Triple H','M','1969-07-27',1992,'WWE','H',88,84,90,255,'Villain'),
 W('Shawn Michaels','M','1965-07-22',1984,'WWE','F',92,92,84,225,'Showman'),
 W('Brock Lesnar','M','1977-07-12',2000,'WWE','F',66,84,88,295,'Monster'),
 W('Big Show','M','1972-02-08',1995,'WWE','H',64,62,80,500,'Monster'),
 W('Kurt Angle','M','1968-12-09',1998,'WWE','H',88,95,86,220,'Technician'),
 W('Chris Benoit','M','1967-05-21',1985,'WWE','F',50,96,74,220,'Technician'),
 W('Eddie Guerrero','M','1967-10-09',1987,'WWE','F',90,94,76,220,'Showman',death='2005-11-13'),
 W('Chavo Guerrero','M','1970-10-20',1994,'WWE','F',62,82,56,215),
 W('Rey Mysterio','M','1974-12-11',1989,'WWE','F',72,93,76,165,'Masked'),
 W('Edge','M','1973-10-30',1992,'WWE','F',80,84,74,240),
 W('The Undertaker','M','1965-03-24',1987,'WWE','F',80,74,88,299,'Veteran'),
 W('Chris Jericho','M','1970-11-09',1990,'WWE','H',92,88,82,226,'Showman'),
 W('Christian','M','1973-11-30',1995,'WWE','H',78,82,62,227),
 W('Booker T','M','1965-03-01',1989,'WWE','F',84,78,76,256),
 W('Goldust','M','1969-04-11',1988,'WWE','F',80,78,62,232,'Showman'),
 W('Kane','M','1967-04-26',1992,'WWE','H',62,70,76,323,'Monster'),
 W('Rob Van Dam','M','1970-12-18',1990,'WWE','F',72,84,80,235),
 W('Ric Flair','M','1949-02-25',1972,'WWE','H',96,72,80,243,'Veteran'),
 W('Randy Orton','M','1980-04-01',2000,'WWE','H',76,80,60,245,'Rookie'),
 W('Batista','M','1969-01-18',2000,'WWE','H',62,62,56,290,'Monster'),
 W('John Cena','M','1977-04-23',2000,'WWE','H',88,70,62,240,'Showman'),
 W('Matt Hardy','M','1974-09-23',1992,'WWE','H',78,78,62,236),
 W('Jeff Hardy','M','1977-08-31',1993,'WWE','F',72,78,74,215),
 W('Trish Stratus','F','1975-12-18',1999,'WWE','F',82,74,80,125),
 W('Victoria','F','1971-02-10',2000,'WWE','H',70,76,58,135),
 W('Molly Holly','F','1977-09-07',1997,'WWE','H',62,80,56,135),
 W('Jazz','F','1973-08-26',1998,'WWE','H',60,78,52,145),
 W('Lita','F','1975-04-14',1999,'WWE','F',76,66,74,130),
 W('Stacy Keibler','F','1979-10-14',1999,'WWE','F',72,30,58,125,'Showman'),
 W('The Rock','M','1972-05-02',1996,'WWE','H',99,78,94,260,'Showman'),
 W('Stone Cold Steve Austin','M','1964-12-18',1989,'WWE','F',96,74,96,252,'Brawler',retire='2003-03-30'),
 W('Hulk Hogan','M','1953-08-11',1977,'WWE','F',94,48,88,302,'Hero'),
 W('Scott Steiner','M','1962-07-29',1986,'WWE','F',64,58,66,275,'Monster'),
 W('Bubba Ray Dudley','M','1971-07-14',1991,'WWE','F',80,72,66,295,'Brawler'),
 W('D-Von Dudley','M','1972-08-01',1991,'WWE','F',62,70,62,280,'Brawler'),
 W('Charlie Haas','M','1972-03-27',1996,'WWE','H',50,80,40,250,'Technician'),
 W('Shelton Benjamin','M','1975-07-09',2000,'WWE','H',50,84,40,245),
 # TNA
 W('Jeff Jarrett','M','1967-07-14',1986,'TNA','H',78,74,62,230,'Villain'),
 W('AJ Styles','M','1977-06-02',1998,'TNA','F',72,95,56,218),
 W('Jerry Lynn','M','1963-06-12',1988,'TNA','F',56,88,44,210,'Technician'),
 W('Low Ki','M','1979-09-29',1998,'TNA','H',58,88,42,185),
 W('Ron Killings','M','1972-01-19',1999,'TNA','F',76,72,50,225),
 W('Raven','M','1964-09-08',1988,'TNA','H',84,70,56,235,'Villain'),
 W('Christopher Daniels','M','1970-03-24',1993,'TNA','H',76,88,44,215),
 W('Sting','M','1959-03-20',1985,'','F',82,68,80,250,'Veteran'),
 # ROH
 W('Samoa Joe','M','1979-03-17',1999,'ROH','H',76,92,48,282,'Brawler'),
 W('Bryan Danielson','M','1981-05-22',1999,'ROH','F',62,97,44,195,'Technician'),
 W('CM Punk','M','1978-10-26',1999,'ROH','H',90,84,44,218,'Showman'),
 W('Xavier','M','1977-01-01',1998,'ROH','H',58,74,34,205),
 W('Paul London','M','1980-04-16',1999,'ROH','F',62,84,36,190),
 W('Homicide','M','1977-02-20',1993,'ROH','H',64,80,38,230,'Brawler'),
 # NJPW
 W('Yuji Nagata','M','1968-04-24',1992,'NJPW','F',62,88,76,238),
 W('Hiroshi Tanahashi','M','1976-11-13',1999,'NJPW','F',82,86,62,229,'Hero'),
 W('Shinsuke Nakamura','M','1980-02-24',2002,'NJPW','F',80,80,56,229,'Rookie'),
 W('Hiroyoshi Tenzan','M','1971-03-23',1991,'NJPW','H',60,82,68,264),
 W('Satoshi Kojima','M','1970-09-14',1991,'AJPW','H',68,82,66,251),
 W('Masahiro Chono','M','1963-09-17',1984,'NJPW','H',80,74,74,243,'Villain'),
 W('Jushin Liger','M','1964-11-30',1984,'NJPW','F',72,88,74,209,'Masked'),
 W('Minoru Suzuki','M','1968-06-17',1988,'NJPW','H',80,88,60,225,'Brawler'),
 # AJPW
 W('Keiji Mutoh','M','1962-12-23',1984,'AJPW','F',84,82,84,243,'Showman'),
 W('Toshiaki Kawada','M','1963-12-08',1982,'AJPW','H',62,90,78,232),
 W('Taiyo Kea','M','1975-10-25',1995,'AJPW','F',50,78,40,240),
 # NOAH
 W('Kenta Kobashi','M','1967-03-27',1988,'NOAH','F',76,96,90,253,'Hero',retire='2013-05-11'),
 W('Mitsuharu Misawa','M','1962-06-18',1981,'NOAH','F',68,94,88,240,'Veteran',death='2009-06-13'),
 W('Jun Akiyama','M','1969-10-09',1992,'NOAH','H',62,90,78,232),
 W('Yoshinari Ogawa','M','1966-12-01',1985,'NOAH','H',52,84,56,200,'Technician'),
 W('Kenta','M','1981-03-12',2000,'NOAH','F',66,92,58,190),
 W('Naomichi Marufuji','M','1979-09-26',1998,'NOAH','F',68,92,60,190),
 W('Takeshi Morishima','M','1979-01-01',1998,'NOAH','H',50,76,44,320,'Monster'),
 # ZERO1 / Toryumon / Mexico
 W('Shinya Hashimoto','M','1965-07-03',1984,'ZERO1','F',72,78,76,278,'Veteran',death='2005-07-11'),
 W('Masato Tanaka','M','1973-02-28',1993,'ZERO1','F',58,84,56,225,'Brawler'),
 W('Masaaki Mochizuki','M','1970-02-17',1992,'Toryumon','F',50,84,40,190),
 W('CIMA','M','1978-11-15',1997,'Toryumon','F',76,88,50,180,'Showman'),
 W('Último Dragón','M','1966-12-12',1987,'Toryumon','F',66,84,62,183,'Masked'),
 W('Místico','M','1982-12-22',1997,'CMLL','F',72,90,50,165,'Masked'),
 W('Atlantis','M','1962-09-05',1983,'CMLL','F',62,76,62,198,'Masked'),
 W('El Hijo del Santo','M','1963-08-02',1982,'AAA','F',76,82,70,198,'Masked'),
 W('La Parka','M','1965-11-04',1982,'AAA','H',76,72,62,210,'Masked',death='2020-01-11'),
 W('Octagón','M','1961-03-27',1981,'AAA','F',62,62,58,198,'Masked'),
 # coming up later
 W('Seth Rollins','M','1986-05-28','2005-01-01','','F',82,92,30,217),
 W('Roman Reigns','M','1985-05-25','2010-08-01','','F',80,78,40,265,'Hero'),
 W('Kazuchika Okada','M','1987-11-08','2004-08-29','','F',84,94,30,236,'Showman'),
 W('Kenny Omega','M','1983-10-16','2000-01-01','','F',86,96,30,201,'Showman'),
 W('Becky Lynch','F','1987-01-30','2002-01-01','','F',90,82,30,135,'Showman'),
 W('Charlotte Flair','F','1986-04-05','2012-05-01','','H',86,88,40,145),
 W('Kofi Kingston','M','1981-08-14','2006-01-01','','F',80,84,30,212),
 W('Dolph Ziggler','M','1980-07-27','2004-01-01','','H',80,84,30,218),
 W('The Miz','M','1980-10-08','2004-01-01','','H',88,66,30,221,'Showman'),
]

TI94=[
 T('WWF World Heavyweight Championship','WWF',1,'singles','Yokozuna','1993-06-13'),
 T('WWF Intercontinental Championship','WWF',2,'singles','Razor Ramon','1993-09-27'),
 T('WWF Tag Team Championship','WWF',1,'tag','Jacques Rougeau & Pierre Ouellet','1993-09-13'),
 T("WWF Women's Championship",'WWF',1,'singles','Alundra Blayze','1993-12-13'),
 T('WCW World Heavyweight Championship','WCW',1,'singles','Ric Flair','1993-12-27'),
 T('WCW United States Championship','WCW',2,'singles','Steve Austin','1993-12-27'),
 T('WCW World Television Championship','WCW',3,'singles','Lord Steven Regal','1993-09-19'),
 T('WCW World Tag Team Championship','WCW',1,'tag','Brian Knobbs & Jerry Sags','1993-10-24'),
 T('ECW Heavyweight Championship','ECW',1,'singles','Terry Funk','1993-12-26'),
 T('IWGP Heavyweight Championship','NJPW',1,'singles','Shinya Hashimoto','1993-09-20'),
 T('IWGP Junior Heavyweight Championship','NJPW',2,'singles','Jushin Liger','1993-08-01'),
 T('Triple Crown Heavyweight Championship','AJPW',1,'singles','Mitsuharu Misawa','1992-08-22'),
 T('World Tag Team Championship (AJPW)','AJPW',1,'tag','Toshiaki Kawada & Akira Taue','1993-12-03'),
 T('CMLL World Heavyweight Championship','CMLL',1,'singles','',''),
 T('AAA Americas Heavyweight Championship','AAA',1,'singles','Konnan',''),
 T('SMW Heavyweight Championship','SMW',1,'singles','',''),
 T('FMW Brass Knuckles Heavyweight Championship','FMW',1,'singles','Atsushi Onita',''),
]
TI03=[
 T('World Heavyweight Championship','WWE',1,'singles','Triple H','2002-12-15'),
 T('WWE Championship','WWE',1,'singles','Big Show','2002-11-17'),
 T('World Tag Team Championship','WWE',1,'tag','Booker T & Goldust','2002-12-15'),
 T('WWE Tag Team Championship','WWE',1,'tag','Eddie Guerrero & Chavo Guerrero','2002-11-17'),
 T("WWE Women's Championship",'WWE',1,'singles','Trish Stratus','2002-11-17'),
 T('WWE Cruiserweight Championship','WWE',3,'singles','',''),
 T('NWA World Heavyweight Championship','TNA',1,'singles','Jeff Jarrett','2002-11-20'),
 T('X Division Championship','TNA',2,'singles','Jerry Lynn','2002-10-30'),
 T('ROH World Championship','ROH',1,'singles','Xavier','2002-09-21'),
 T('IWGP Heavyweight Championship','NJPW',1,'singles','Yuji Nagata','2002-04-05'),
 T('IWGP Junior Heavyweight Championship','NJPW',2,'singles','Jushin Liger',''),
 T('Triple Crown Heavyweight Championship','AJPW',1,'singles','Keiji Mutoh','2002-02-24'),
 T('GHC Heavyweight Championship','NOAH',1,'singles','Yoshinari Ogawa','2002-09-23'),
 T('GHC Junior Heavyweight Championship','NOAH',2,'singles','Kenta',''),
 T('CMLL World Middleweight Championship','CMLL',1,'singles','',''),
 T('AAA Mega Championship','AAA',1,'singles','',''),
]

def check(ws,ts,start):
    names={w['name'] for w in ws}
    for t in ts:
        for n in [x.strip() for x in t['champ'].split('&') if x.strip()]:
            assert n in names,(t['name'],n)
            w=[x for x in ws if x['name']==n][0]; assert w['home']==t['co'],(n,w['home'],t['co'])
    al={}
    for c in COS:
        al[c['short']]=c['short']
        for r in c['renames']:al[r['short']]=c['short']
    for w in ws: assert w['home']=='' or w['home'] in al,(w['name'],w['home'])
    assert len(names)==len(ws),'duplicate names'

# 1994 home company names are the 1994 short names (WWF etc.); 2003 uses WWE (rename handled by the company list)
import copy,scen_modern as SM
def cos(over,cash=None):
    out=copy.deepcopy(COS)
    for c in out:
        if c['short'] in over:c['pop']=over[c['short']]
        if cash and c['short'] in cash:c['cash']=cash[c['short']]
    return out
# Starting money for the giants, so a big real roster doesn't sink them before the player can trim it. Rough, change in the editor.
COS94=cos({},{'WWF':450000,'WCW':450000});COS03=cos({},{'WWF':700000})
R11=SM.parse(SM.R11,W);R15=SM.parse(SM.R15,W);R20=SM.parse(SM.R20,W);R26=SM.parse(SM.R26,W)
TI11,TI15,TI20,TI26=[[T(*t) for t in x] for x in (SM.TI11,SM.TI15,SM.TI20,SM.TI26)]
check(R94,TI94,'1994-01-01');check(R03,TI03,'2003-01-01')
for r,t,d in ((R11,TI11,'2011'),(R15,TI15,'2015'),(R20,TI20,'2020'),(R26,TI26,'2026')):check(r,t,d)
C11=cos({'WWF':90,'TNA':58,'ROH':38,'NJPW':70,'AJPW':55,'NOAH':55,'Toryumon':50,'CMLL':66,'AAA':62,'ZERO1':30},{'WWF':900000,'TNA':250000})
C15=cos({'WWF':92,'TNA':44,'ROH':48,'NJPW':76,'AJPW':45,'NOAH':45,'Toryumon':45,'CMLL':60,'AAA':58},{'WWF':1000000,'NJPW':250000})
C20=cos({'WWF':90,'AEW':74,'NJPW':78,'TNA':40,'ROH':45,'MLW':35,'NWA':38,'Stardom':55,'CMLL':58,'AAA':60,'NOAH':50,'AJPW':45,'Toryumon':45},{'WWF':1200000,'AEW':600000,'NJPW':250000})
C26=cos({'WWF':94,'AEW':70,'NJPW':66,'TNA':50,'ROH':35,'Stardom':55,'CMLL':55,'AAA':64,'NOAH':45,'AJPW':40,'Toryumon':42,'MLW':30,'NWA':25},{'WWF':1500000,'AEW':800000,'NJPW':250000})
real={'name':'Real History','desc':'The real wrestling world, from public history. Rough dates and starting stats: change anything in the editor.','versions':[
  {'v':1,'label':'1994 start','date':'2026-11-26','data':{'name':'Real History','start':'1994-01-01','desc':'The Monday night era is about to begin.','companies':COS94,'wrestlers':R94,'titles':TI94}},
  {'v':2,'label':'2003 start','date':'2026-11-26','data':{'name':'Real History','start':'2003-01-01','desc':'The brand split era, with TNA and ROH just starting.','companies':COS03,'wrestlers':R03,'titles':TI03}},
  {'v':3,'label':'2011 start','date':'2026-11-26','data':{'name':'Real History','start':'2011-01-01','desc':'The PG era in WWE, TNA on Monday nights, and NJPW starting its comeback.','companies':C11,'wrestlers':R11,'titles':TI11}},
  {'v':4,'label':'2015 start','date':'2026-11-26','data':{'name':'Real History','start':'2015-01-01','desc':'NXT is taking off, NJPW is booming and Lucha Underground just launched.','companies':C15,'wrestlers':R15,'titles':TI15}},
  {'v':5,'label':'2020 start','date':'2026-11-26','data':{'name':'Real History','start':'2020-01-01','desc':'AEW has just arrived. The first real challenger to WWE in nearly twenty years.','companies':C20,'wrestlers':R20,'titles':TI20}},
  {'v':6,'label':'2026 start','date':'2026-11-26','data':{'name':'Real History','start':'2026-01-01','desc':'Today. WWE on Netflix, AEW settled in, and TNA back under its old name.','companies':C26,'wrestlers':R26,'titles':TI26}}]}

# ---------- tutorial world: all made up ----------
TC=[C('HCW','Harbor City Wrestling','2000-01-01','',55,'Regional',['entertainment']),
    C('IVP','Iron Valley Pro','2000-01-01','',48,'Regional',['serious','grappling']),
    C('SSW','Southern Star Wrestling','2000-01-01','',40,'Local',['hardcore'])]
import random
random.seed(7)
FIRST=['Duke','Rex','Tony','Buck','Vic','Hank','Jimmy','Rocco','Max','Lars','Diego','Ray','Ace','Mack','Otis','Nico','Bobby','Dutch','Moose','Rico','Clint','Jet','Brick','Hiro','Pablo','Seamus','Cole','Wade','Kai','Zeke']
FEM=['Dolly','Rita','Vera','Gail','Trixie','Mae','Lola','Kitty','Sunny','Babs']
LAST=['Malone','Riker','Vance','Dalton','Cruz','Brennan','Hayes','Stone','Holt','Graves','Kowal','Ford','Steele','Blaze','Knox','Reyes','Mercer','Pike','Sloan','Vega']
TW=[];seen=set()
def nm(f):
    while True:
        n=random.choice(FEM if f else FIRST)+' '+random.choice(LAST)
        if n not in seen: seen.add(n);return n
GM=['None','Hero','Villain','Showman','Technician','Monster','Brawler','Masked','Veteran','Rookie']
for co,n in [('HCW',8),('IVP',8),('SSW',7),('',12)]:
    for i in range(n):
        f=random.random()<.2;cha=random.randint(35,85);wrk=random.randint(35,88);pop=random.randint(15,70) if co else random.randint(8,40)
        TW.append(W(nm(f),'F' if f else 'M',random.randint(1968,1982),random.randint(1990,1999),co,random.choice('FH'),cha,wrk,pop,random.randint(120,165) if f else random.randint(190,320),random.choice(GM)))
champ=lambda co:[w['name'] for w in TW if w['home']==co and w['gender']=='M'][0]
TT=[T('HCW Championship','HCW',1,'singles',champ('HCW'),'1999-10-01'),T('IVP Heavyweight Title','IVP',1,'singles',champ('IVP'),'1999-08-01'),T('SSW Hardcore Title','SSW',1,'singles',champ('SSW'),'1999-11-01')]
tutorial={'name':'Tutorial','start':'2000-01-01','desc':'A small made-up wrestling world for learning the game. Plays as the story campaign with your own new company.','companies':TC,'wrestlers':TW,'titles':TT}

json.dump({'real':real,'tutorial':tutorial},open('/home/user/scripts/data.json','w'),ensure_ascii=False,separators=(',',':'))
print('real',[len(x) for x in (R94,R03,R11,R15,R20,R26)],'tutorial',len(TW))
