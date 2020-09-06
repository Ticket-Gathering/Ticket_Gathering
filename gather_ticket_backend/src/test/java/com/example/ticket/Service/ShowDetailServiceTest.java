package com.example.ticket.Service;


import com.example.ticket.TicketApplication;
import com.example.ticket.entity.ShowDetail;
import com.example.ticket.service.ShowDetailService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TicketApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ShowDetailServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    ShowDetailService showDetailService;

//    @Test
//    public void getDetailTest(){
//        ShowDetail detail =showDetailService.getDetail("1_1_607447710935");
//        String notice0=detail.getNotice0();
//        String expectnotice0="我最多可以购买几张？\n" +
//                "每笔订单最多购买5张\n" +
//                "需要实名购买吗？\n" +
//                "无需实名购票\n" +
//                "婴幼儿及儿童需要买票吗？\n" +
//                "1.2米以上凭成人票入场，1.2米以下谢绝入场\n" +
//                "我要怎么开发票？\n" +
//                "如需发票，请您在演出开始前通过订单页补开，发票将在演出结束后1个月左右，统一由开具方提供\n" +
//                "我购买后是否可以退换票？\n" +
//                "因您自身原因发起的退票申请，我们将根据申请退票日期至项目开始日期的时长，收取实际支付金额（快递费除外）相应比例的手续费，详细手续费说明请查看《大麦网订票服务条款》\n" +
//                "活动时长\n" +
//                "活动时长以现场为准\n" +
//                "异常排单说明\n" +
//                "对于异常订购行为，大麦网有权在订单成立或者生效之后取消相应订单。异常订购行为包括但不限于以下情形：\n" +
//                "（1）通过同一ID订购超出限购张数的订单。\n" +
//                "（2）经合理判断认为非真实消费者的下单行为，包括但不限于通过批量相同或虚构的支付账号、收货地址（包括下单时填写及最终实际收货地址）、收件人、电话号码订购超出限购张数的订单。\n";
////        assertEquals(expectnotice0,notice0);
////        Show show=detail.getShow();
////        String expectname="梵高星空美术馆江汉路旗舰店";
////        assertEquals(expectname,show.getName());
////
////        ShowDetail DetailNotExists =showDetailService.getDetail("1_1_11111");
////        assertEquals(null,DetailNotExists);
//
//    }
}
