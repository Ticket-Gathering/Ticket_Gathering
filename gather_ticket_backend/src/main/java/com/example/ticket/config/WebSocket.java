package com.example.ticket.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
// 你的WebSocket访问地址
@ServerEndpoint("/webSocket")
@Slf4j
public class WebSocket {
    private static int onlineCount = 0;
    private Session session;
    //定义Websocket容器，储存session
    private static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<>();

    //对应前端的一些事件
    //建立连接
    @OnOpen
    public void opOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        addOnlineCount();           //在线数加1
        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
    }

    //关闭连接
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        subOnlineCount();           //在线数减1
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    //接收消息
    @OnMessage
    public void onMessage(String message) {
    }

    //发送消息
    public void sendMessage(String message) {
        //遍历储存的Websocket
        for (WebSocket webSocket : webSocketSet) {
            //发送
            try {
                webSocket.session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocket.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocket.onlineCount--;
    }
}
