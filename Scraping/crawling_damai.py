import requests
import json
import csv      # 用于后期文件的保存

class Spider(object):   # 新式类
    # 构造请求头等   self就是用于存储对象属性的集合，就算没有属性self也是必备的
    def __init__(self,pagenumber):
        self.url = "https://search.damai.cn/searchajax.html?order=1&pageSize=30&currPage="+str(pagenumber)
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
            "cookie": "cna=YUh4F/d5b28CAX1ykESiRMc9; xlly_s=1; XSRF-TOKEN=90624fc6-fb33-4729-83ae-20d99ca7592a; isg=BPv7j-zPIEmBgBy0QsdugUkBit9lUA9SkXpb4u24xfoRTBsudiJLoyDNY-wC02dK; l=eBxC1kIgOOXAYmWiBOfanurza779QIRYsuPzaNbMiOCP_k5p59vdWZPioOT9CnhVh6jD83-WSGYuBeYBq_C-nxv9kdMO8ZHmn; tfstk=citPBIXCa0nPlajIWgsUA2AO1osRZzfh1oWNrex_TOAUWMQliJPdnxNd395tmaf..",
            "referer": "https://search.damai.cn/search.htm?order=1"  # 大麦网的分类页面
        }
        self.data_key = None

    # 请求url获取响应
    def get(self):
        response = requests.get(url=self.url, headers=self.headers)
        # 测试  print(response.text)
        return response

    # 解析数据
    def parse(self):
        # 将字符串数据转换成字典数据
        dict_data = json.loads(self.get().text)

        # 将需要的爬取的字典数据存储在变量中
        need_spider_data = dict_data["pageData"]["resultData"]
        # print(need_spider_data)
        # 构造存储头列表,第一种方法
        data_key = []
        for item in need_spider_data[0]:
            data_key.append(item)

        # 打印测试
        # print(data_key)
        self.data_key = data_key

        return need_spider_data

    # 保存为CSV数据
    def save(self):
        # 构建属性列表
        list = self.data_key

        # # 此处出现保存，报错为缺少字段，因此追加一个字段
        # list.append('favourable')

        # list测试 print(list)

        my_data = self.parse()
        # 数据测试  print(my_data)

        with open("damaiwang.csv", "a", newline="", encoding='utf-8') as f:
            # 传入头数据，即第一行数据
            writer = csv.DictWriter(f, list)
            writer.writeheader()
            for row in my_data:
                writer.writerow(row)



if __name__ == '__main__':

    for num in range(1,2):
       spider = Spider(num)
       spider.parse()
       spider.save()

    print("="*50)
    print("The program gone the file saved at the Root directory")
    print("="*50)
