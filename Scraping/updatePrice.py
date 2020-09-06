import pymongo


def main():
    client = pymongo.MongoClient(host="localhost", port=27017)
    db = client.ticket
    collection = db.ticketdetail
    data = []
    for line in open("id.txt", "r"):
        data.append(line.replace("\n", ""))

    for id in data:
        condition = {'id': id}
        result = collection.find_one(condition)
        if result is None:
            continue
        newTimes = []
        newPrices = []
        for time in result['times']:
            if time.find('暂不可售') != -1:
                # 包含暂不可售则删除
                time = time.replace('暂不可售', '')
                if time.strip() == '':
                    continue
            if time.find('无票') != -1:
                # 包含无票
                time = time.replace('无票', '')
                if time.strip() == '':
                    continue
            if time.find('优惠') == -1 and time.find('惠') != -1:
                time = time.replace('惠', '')
                if time.strip() == '':
                    continue
            newTimes.append(time)

        for price in result['prices']:
            if price.find('缺货登记'):
                price = price.replace('缺货登记', '')
            if price.find('开售提醒'):
                price = price.replace('开售提醒', '')
            newPrices.append(price)
        result['times'] = newTimes
        result['prices'] = newPrices
        result = collection.update_one(condition, {'$set': result})


main()
