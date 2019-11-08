<html>
<head>
    <title>fastJson</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 原本添加的css -->
    <link rel="stylesheet" href="/css/index.css">
    <!-- vvvv添加的css -->
    <link rel="stylesheet" href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/css/jsoneditor.min.css">
    <link rel="stylesheet" href="/css/mycss.css">
    <link rel="stylesheet" href="/css/toastr.min.css">
    <!-- 原本js -->
    <script src="/vendor/jquery/jquery-3.2.1.min.js"></script>
    <script src="/vendor/bootstrap/js/popper.js"></script>
    <script src="/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="/vendor/select2/select2.min.js"></script>
    <script src="/vendor/tilt/tilt.jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery.form/4.2.1/jquery.form.js"></script>
    <script src="/js/main.js"></script>
    <!-- vvvv添加的js -->
    <script src="/js/jsoneditor.min.js"></script>
    <script src="/js/toastr.min.js" type="text/javascript"></script>
    <script src="/js/clipboard-polyfill.js" type="text/javascript"></script>
    <script src="/js/jsoneditor.min.js"></script>
    <script src="/js/FileSaver.min.js" type="text/javascript"></script>
</head>
<body>
    <div class="limiter">
        <div class="container">
            <form action="/upload" method="post" enctype="multipart/form-data" id="upload">
                <div class="file-box">
                    <input type="file" name="file" class="file-btn" onchange="upload()"/>
                    上传文件
                </div>
                <div class="file-msg">未上传</div>
                <p><input type="hidden" id="textUpload"/></p>
                <p>JSONPATH:</p>
                <div class="jsonPath">
                    <div class="expandingArea active">
                        <pre><span id="textAreaSpan"></span><br></pre>
                        <textarea type="text" size="15" id="jpath">$</textarea>
                    </div>
                </div>

                <p><div style="height:120px"><input type="button" onclick="jsonPath()" value="verify" class="animated_div"></div></p>

                <div>
                    <div class="double-column-div">
                        <div class="buttons-div">
                            <p>原报文:</p>
                        </div>
                        <textarea id="jsonParam" value="1231" placeholder="你可以上传文件也可以放在这里"></textarea>
                    </div>
                    <div class="double-column-div">
                        <div class="buttons-div">
                            <p>结果:<input type="button" onclick="styleChange()" value="切换"/></p>

                        </div>
                        <div class="mainBox">
                            <div class="tool-right">
                                <i class="fa fa-plus fa-lg"></i>
                            </div>
                            <div data-tgt="container" id="jsonContent"></div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
    <!-- 龙哥的js -->
    <script src="/js/index.js"></script>
    <!-- vvvv的js -->
    <script src="/js/vvvv.js"></script>
</body>
</html>