/**
 * 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
 * auto.waitFor()则会在在无障碍服务启动后继续运行
 * https://docs.hamibot.com/reference/widgetsBasedAutomation
 */
auto.waitFor();

var userDw = device.width;
var userDdh = device.height;
var dots = [];
const { userPwd } = hamibot.env
const { userEmail } = hamibot.env

//唤醒设备。包括唤醒设备 CPU、屏幕等。可以用来点亮屏幕。
if (!device.isScreenOn()) {
    device.wakeUp()

    sleep(500)
    xiaomiPhoeUnlock();
    sleep(500)

    for (var i = 0; i < userPwd.length; i++) {
        switch (userPwd[i] - 0) {
            case 1:
                dots.push([250, 1320]);
                break;
            case 2:
                dots.push([540, 1320]);
                break;
            case 3:
                dots.push([830, 1320]);
                break;
            case 4:
                dots.push([250, 1610]);
                break;
            case 5:
                dots.push([540, 1610]);
                break;
            case 6:
                dots.push([830, 1610]);
                break;
            case 7:
                dots.push([250, 1900]);
                break;
            case 8:
                dots.push([540, 1900]);
                break;
            case 9:
                dots.push([830, 1900]);
                break;
            default:
                toast("密码输入有误程序中断");
                exit();
        }
    }
    gesture(1500, dots)
    sleep(1000)
}
launchApp("健康上报")
if (text("点击退出APP").findOne(5000) == null) {

    var findText = text("每日健康上报").findOne(5000)

    var cons = 4
    while (true) {
        if (cons > 0) {
            gesture(700, [250, 1900], [250, 1000]);
            cons--;
        } else {
            break
        }
    }
    if (text("提交").findOne(500) != null) {
        text("提交").click()
    }
    sleep(500)
    if (id("confirm").findOne(500) != null) {
        id("confirm").click()
    }
    sleep(500)
    if (text("点击退出APP").findOne(500) != null) {
        text("点击退出APP").click()
    }
    sleep(500)
    sendEmail(userEmail, "健康上报打卡成功", "已帮您完成今日打卡")
    alert("运行结束")
} else {
    sleep(1500)
    text("点击退出APP").click()
    sendEmail(userEmail, "健康上报打卡成功", "您今日已上报平安，无需再次上报")
    alert("今日打卡已完成")
}


// if(text("健康").findOne(800)!=null){
//     text("健康").click()
// }
// if(text("否").findOne(800)!=null){
//     text("否").click()
// }
// if(text("绿码").findOne(800)!=null){
//     text("绿码").click()
// }
// if(text("请输入联系方式").findOne(800)!=null){
//     text("请输入联系方式").setText('17263985793')
// }
// if(text("提交").findOne(800)!=null){
//     text("提交").click()
// }




//小米锁屏上划动作
function xiaomiPhoeUnlock() {
    var xyArr = [220];
    var x0 = device.width / 2;
    var y0 = device.height / 4 * 3;
    var angle = 1;
    var x = 0;
    var y = 0;
    for (let i = 0; i < 30; i++) {
        y = x * tan(angle)
        if ((y0 - y) < 0) {
            break
        }
        var xy = [x0 + x, y0 - y]
        xyArr.push(xy)
        x += 5;
        angle += 3
    }
    gesture.apply(null, xyArr)
    function tan(angle) {
        return Math.tan(angle * Math.PI / 180);
    }
}

//smtp.qq.com
//发送邮件
function sendEmail(email, etitle, emsg) {
    http.get("https://v.api.aa1.cn/api/mail/api.php?address=" + email + "&name=" + etitle + "&certno=" + emsg, {}, function (res, err) {
        if (err) {
            console.error("反馈邮件发送失败");
            return;
        }
        log('code = ' + res.statusCode);
        log('html = ' + res.body.string());
    });
}