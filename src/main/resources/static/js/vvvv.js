//JsonEditor新增功能按钮
var jsonMenuRight =
    '<div class="btn-group-right">' +
    '<button type="button" title="Clear" data-value="clear"><i class="fa fa-eraser"></i></button>' +
    '<button type="button" title="Copy" data-value="copy"><i class="fa fa-copy"></i></button>' +
    '<button type="button" title="Paste" data-value="paste"><i class="fa fa-paste"></i></button>' +
    '<button type="button" title="Download" data-value="download"><i class="fa fa-download"></i></button>' +
    '</div>';
// JsonEditor弹框
var jsonEditorOptions = {
    modes: ['code','tree'],
    onError: function (err) {
        showTip(4, err.toString());
    }
};

//设置JsonEditor
var editor = new JSONEditor(document.getElementById("jsonContent"), jsonEditorOptions);
//隐藏新增按钮
$(".tool-right").remove();
// 去除多余信息
$("div.jsoneditor-mode-code .jsoneditor-menu a.jsoneditor-poweredBy").remove();
$("button.jsoneditor-repair").remove();
// 增加功能按钮
$("div.jsoneditor-mode-code .jsoneditor-menu").append(jsonMenuRight);
// 设置高度与右边原报文同高
var wHeight = $("#jsonParam").height();
$("#jsonContent").height(wHeight);
// 将JPath结果回填到jsonEditor里面的
function jsonPath() {
    var jpath = $('#jpath').val();
    $.ajax({
        type: "post",
        dataType: "text",
        url: "/JSONPATH",
        data: {
            jPath: jpath,
            file: $('#textUpload').val(),
            jParam:$('#jsonParam').val()
        },
        success: function (message) {
            editor.setText(message);
            editor.expandAll();
            // editor.setText(JSON.stringify(editor.get(), null, 2))
        }
    });
}
function toTree() {
    editor.set(editor.getText());
    editor.expandAll();
}

function toJson() {
    editor.setText(JSON.stringify(editor.get(), null, 2))
}

// 提示框的js
function showTip(type, msg) {
    toastr.clear();

    var level = '';
    var timeout = 0;
    var msgDefault = '';
    switch (type) {
        case 1:
        default:
            level = 'success';
            timeout = 3000;
            msgDefault = 'success';
            break;
        case 2:
            level = 'info';
            timeout = 5000;
            msgDefault = 'info';
            break;
        case 3:
            level = 'warning';
            timeout = 5000;
            msgDefault = 'warning';
            break;
        case 4:
            level = 'error';
            timeout = 10000;
            msgDefault = 'error';
            break;
    }
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "timeOut": timeout
    }

    if (msg == undefined || msg == '') {
        toastr[level](msgDefault);
    }
    else {
        toastr[level](msg);
    }
}

// 多功能按钮的js
$("body").on("click", ".btn-group-right button", function () {
    var nv = this.attributes[2].nodeValue;
    if (nv != undefined) {
        if (nv == "clear") {
            editor.setText('');
        }
        else if (nv == "copy") {
            var jsonCopy = editor.getText();
            if (jsonCopy == "") {
                showTip(3, "无法找到文本");
            }
            else {
                clipboard.writeText(jsonCopy).then(function () {
                    showTip(1, "已成功复制到剪切板");
                }, function (err) {
                    showTip(4, err);
                });
            }
        }
        else if (nv == "paste") {
            clipboard.readText().then(function (result) {
                editor.setText(result);
            }, function (err) {
                showTip(4, err);
            });
        }
        else if (nv == "download") {
            var jsonDl = editor.getText();
            if (jsonDl == "") {
                showTip(3, "无法找到文本");
            }
            else {
                var blob = new Blob([jsonDl], { type: "text/plain;charset=utf-8" });
                saveAs(blob, "jsonviewer_" + getNowFormatDate() + ".txt");
            }
        }
        else {
            console.log("illegal operate");
            console.log(this.attributes);
        }
    }
    else {
        console.log("nodeValue is undefined");
    }
});

function getNowFormatDate() {
    var date = new Date();

    var seperator1 = "-";
    var seperator2 = "-";

    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }

    return date.getFullYear() + seperator1 + month + seperator1 + strDate + "_" + hour + seperator2 + minutes + seperator2 + seconds;
}
