const identityCheck=(rule,val,callback)=>{
    if(val=="")
        return Promise.reject()
    /*身份证号长度校验*/
    if(!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(val)){
        return Promise.reject("你输入的身份证长度或格式错误!")
    }

    /*身份证号地址编码校验*/
    if(!/^11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91$/.test(val.substr(0, 2))){
        return Promise.reject("你输入的身份证号地址编码错误!")

    }

    /*15位身份证号转18位身份证号*/
    let a18 = val;
    if(val.length == '15') {
        let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let cardTemp = 0,
            i;
        a18 = ""
        a18 = val.substr(0, 6) +(parseInt(val.substr(6,8))<17?'20':'19')+ val.substr(6, val.length - 6);
        for(i = 0; i < 17; i++) {
            cardTemp += a18.substr(i, 1) * arrInt[i];
        }
        a18 += arrCh[cardTemp % 11];
    }
    /*检验校验码*/
    let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    let code = a18.substring(17);
    if(p.test(a18)) {
        let sum = 0;
        for(let i=0;i<17;i++) {
            sum += a18[i]*factor[i];
        }
        if(parity[sum % 11] != code.toUpperCase()) {
            return Promise.reject("校验码错误");
        }
    }
    /*获取身份证号中的年月日并校验*/
    let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    let arr_data = a18.match(re_eighteen);
    let year = arr_data[2];
    let month = arr_data[3];
    let day = arr_data[4];
    let birthday = new Date(year + '/' + month + '/' + day);
    let now = new Date();
    let time = now.getFullYear() - year;
    /*校验年月日是否合理 */
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        if(time >= 0 || time <= 130) {
            return Promise.resolve()
        }
    };
    return Promise.reject("你输入的身份证号出生年月日不合理!")
}
export {identityCheck}
