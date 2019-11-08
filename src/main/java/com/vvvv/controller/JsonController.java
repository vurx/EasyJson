package com.vvvv.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @ClassName jsonController
 * @Description JSON预览工具
 * @Author vvvv
 * @Date 2019/11/8 17:29
 * @Version V1.0
 */
@Controller
public class JsonController {

    @GetMapping("JsonView")
    public String JsonView() {
        return "user/jsonviewer";
    }
}
