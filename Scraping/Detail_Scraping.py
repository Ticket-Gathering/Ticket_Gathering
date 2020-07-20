from selenium import webdriver
from bs4 import BeautifulSoup
import pymongo

def getresponse(id):
    driver = webdriver.PhantomJS()
    driver.get("https://detail.damai.cn/item.htm?id="+id)
    res = driver.page_source
    driver.quit()
    soup = BeautifulSoup(res, 'html.parser')
    return soup

def parse(soup,id):
    detail = ""
    notice0 = ""
    notice1 = ""
    images = []
    times = []
    prices = []

    time = soup.find(class_='perform__order__select perform__order__select__performs')
    try:
        for i in time.find_all('span'):
           times.append(i.get_text().replace(" ", "").replace("\n", ""))
    except:
        times=[]

    for i in soup.find_all('div', class_='skuname'):
        prices.append(i.get_text().replace(" ", "").replace("\n", ""))

    words = soup.find(id='detail')
    for i in words.find_all('p'):
        if i.get_text() != '':
            detail += i.get_text() + '\n'
    for i in words.find_all('img'):
        images.append(i['src'])

    for i in soup.find_all(id='notice0'):
        words = i.find(class_='words')
        for j in words.find_all('div'):
            title = j.find('p').string
            words = j.find('ul').get_text()
            notice0 += title + "\n" + words + "\n"

    for i in soup.find_all(id='notice1'):
        words = i.find(class_='words')
        for j in words.find_all('div'):
            title = j.find('p').string
            words = j.find('ul').get_text()
            notice1 += title + "\n" + words + "\n"

    ticket = {"id": "1_1_"+id,"detail": detail, "notice0": notice0, "notice1": notice1, "times": times, "prices": prices,
              "images": images}
    return ticket

def main():
    client=pymongo.MongoClient(host="localhost",port=27017)
    db=client.ticket
    collection=db.ticketdetail
    data = []
    for line in open("id.txt", "r"):
        data.append(line.replace("\n",""))

    for id in data:
     id=id.replace("1_1_","")
     soup=getresponse(id)
     ticket=parse(soup,id)
     result = collection.insert(ticket)
     print(result)
     print(id)

main()
