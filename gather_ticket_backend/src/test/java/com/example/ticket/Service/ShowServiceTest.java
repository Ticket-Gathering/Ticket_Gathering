package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import java.util.List;


@SpringBootTest(classes = TicketApplication.class)
public class ShowServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private ShowService showService;

    @Test
    public void getHomePageTest(){
        List<List<Show>> expect = showService.getHomePage();
        Integer expectCatNumber = expect.size();
        assertEquals(8,expectCatNumber);
        for(List<Show> list : expect )
        {
            Integer expectNumberPerCat=list.size();
            assertEquals(7,expectNumberPerCat);
        }
    }

    @Test
    public void searchShowTest1(){
        List<Show> test1=showService.searchShow("%%",null,"",null,30,0);
        assertEquals(30,test1.size());
    }

    @Test
    public void searchShowTest2(){
        List<Show> test2=showService.searchShow("%吴%",null,"",null,30,0);
        assertEquals(7,test2.size());
    }

    @Test
    public void searchShowTest3(){
        List<Show> test3=showService.searchShow("%%",1,"",null,30,0);
        assertEquals(30,test3.size());
    }

    @Test
    public void searchShowTest4(){
        List<Show> test4=showService.searchShow("%%",null,"宁波",null,30,0);
        assertEquals(26,test4.size());
    }

    @Test
    public void searchShowTest5(){
        List<Show> test5=showService.searchShow("%%",1,"宁波",null,30,0);
        assertEquals(12,test5.size());
    }

    @Test
    public void searchShowTest6(){
        List<Show> test6=showService.searchShow("%%",1,"",9,30,0);
        assertEquals(29,test6.size());
    }

    @Test
    public void searchShowTest7(){
        List<Show> test6=showService.searchShow("%%",1,"上海",9,30,0);
        assertEquals(2,test6.size());
    }

}
