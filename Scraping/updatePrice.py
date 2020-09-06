import pymongo


def main():
    client=pymongo.MongoClient(host="localhost",port=27017)
    db=client.ticket
    collection=db.ticketdetail
    data = []
    for line in open("id.txt", "r"):
        data.append(line.replace("\n",""))
    # for id in data:
    #     condition={'id':id}
    #     result=collection.find_one(condition)
    #     print(result['detail'])
    #     print("\n")
    result=collection.find_one("1_1_622394291857")
    print(result)
main()