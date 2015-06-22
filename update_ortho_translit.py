import pandas as pd 

dataset = pd.read_csv('resources/admin_areas.csv')

import re,json
from lxml import html

with open("resources/special_cases.json",'r',encoding='utf-8') as fp:
    lookup_dict = json.load(fp)

def ortho_rules(text,lookup_dict):
    """
    Takes a text string and a lookup dict as input
    Removes any lingering html tags
    Breaks the string down into component words with split
    Uses replacements to modernize orthography
    Returns re-assembled text with modern orthography
    """
    if type(text)==str:
        text = html.fromstring(text).text_content()
        textlist = text.split(' ')
        out_list = []
        for word in textlist:
            if word in [',','.',';',':']:
                out_list.append(word)
                continue
            punct = ""
            if len(re.findall(r"([,.;:])$",word))!=0:
                   punct = re.findall(r"([,.;:])$",word)[0]
            word = word.strip(',.;:')
            if word in lookup_dict:
                word = lookup_dict[word]
                out_list.append(word)
            else:
                word = re.sub("[Ъъ]$",'',word)
                word = re.sub(r"^([че]{0,2}[ч]?[вбнр]?[веоаи])з([ПФКТШСЧпфктшсч])",r"\1с\2",word,re.IGNORECASE)
                word = re.sub("аго$","ого",word,re.IGNORECASE)
                word = re.sub("яго$","его",word,re.IGNORECASE)
                word = re.sub("ыя$","ые",word,re.IGNORECASE)
                word = re.sub("iя$","ие",word,re.IGNORECASE)
                word = word.replace('i','и') #english
                word = word.replace('I','И') #english
                word = word.replace('і','и') #cyrillic
                word = word.replace('І','И') #cyrillic
                word = word.replace('Ѣ','Е')
                word = word.replace('ѣ','е')
                word = word.replace('Ѳ','Ф')
                word = word.replace('ѳ','ф')
                word += punct
                out_list.append(word)
        out_str = ' '.join(out_list)
        return out_str
    else:
        return None

cyrillic_translit={u'\u0410': 'A', u'\u0430': 'a',u'\u0411': 'B', u'\u0431': 'b',u'\u0412': 'V', u'\u0432': 'v',u'\u0413': 'G', u'\u0433': 'g',u'\u0414': 'D', u'\u0434': 'd',u'\u0415': 'E', u'\u0435': 'e',u'\u0416': 'Zh', u'\u0436': 'zh',u'\u0417': 'Z', u'\u0437': 'z',u'\u0418': 'I', u'\u0438': 'i',u'\u0419': 'I', u'\u0439': 'i',u'\u041a': 'K', u'\u043a': 'k',u'\u041b': 'L', u'\u043b': 'l',u'\u041c': 'M', u'\u043c': 'm',u'\u041d': 'N', u'\u043d': 'n',u'\u041e': 'O', u'\u043e': 'o',u'\u041f': 'P', u'\u043f': 'p',u'\u0420': 'R', u'\u0440': 'r',u'\u0421': 'S', u'\u0441': 's',u'\u0422': 'T', u'\u0442': 't',u'\u0423': 'U', u'\u0443': 'u',u'\u0424': 'F', u'\u0444': 'f',u'\u0425': 'Kh', u'\u0445': 'kh',u'\u0426': 'Ts', u'\u0446': 'ts',u'\u0427': 'Ch', u'\u0447': 'ch',u'\u0428': 'Sh', u'\u0448': 'sh',u'\u0429': 'Shch', u'\u0449': 'shch',u'\u042a': '"', u'\u044a': '"',u'\u042b': 'Y', u'\u044b': 'y',u'\u042c': "'", u'\u044c': "'",u'\u042d': 'E', u'\u044d': 'e',u'\u042e': 'Iu', u'\u044e': 'iu',u'\u042f': 'Ia', u'\u044f': 'ia',u'\u0462': 'E', u'\u0463': 'e'}

def transliterate(word, translit_table):
    """
    Transliterates 'word' based on the key/value pairs in 'translit_table'
    """
    converted_word = ''
    for char in word:
        transchar = ''
        if char in translit_table:
            transchar = translit_table[char]
        else:
            transchar = char
        converted_word += transchar
    return converted_word

dataset['ru_new_orth'] = dataset['ru_old_orth'].apply(lambda x: ortho_rules(x,lookup_dict))
dataset['lc_translit_old'] = dataset['ru_old_orth'].apply(lambda x: transliterate(x,cyrillic_translit))
dataset['lc_translit_new'] = dataset['ru_new_orth'].apply(lambda x: transliterate(x,cyrillic_translit))

dataset.to_csv("resources/admin_areas.csv",encoding='utf-8')
