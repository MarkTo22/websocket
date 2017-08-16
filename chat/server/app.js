 var cons = new Array();
 var ws = require('ws').Server,
    wss = new ws({
        port: 3000,
        verifyClient: socketVerify
    });
function socketVerify(info) {
    return true;
}
//广播
wss.broadcast = function broadcast(s,ws) {
    // console.log(ws);
    wss.clients.forEach(function each(client) {
            if(s == 1){
                client.send(ws.name + ":"+"<span class="+"said"+">" + ws.msg+"</span>");
            }
            if(s == 0){
                client.send(ws + "退出聊天室");
            }
    });
};
// 初始化
wss.on('connection', function(ws) {
    cons.push(ws);
    ws.send('目前在线人数' + cons.length + '人');
    // ws.send("<span class="+"sys"+"目前在线人数：" + cons.length + "人</span>");
    // 发送消息
    ws.on('message', function(jsonStr,flags) {
        var obj = JSON.parse(jsonStr);
        this.user = obj;
        if (typeof this.user.msg != "undefined") {
            wss.broadcast(1,obj);
        }
    });
    ws.on('close', function(close) {
        cons.length -= 1;
        try{
            wss.broadcast(0,this.user.name);
        }catch(e){
            console.log('刷新页面了');
        }
    });
});