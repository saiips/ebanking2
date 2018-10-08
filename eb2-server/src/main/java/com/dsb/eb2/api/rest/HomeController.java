package com.dsb.eb2.api.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dsb.eb2.framework.log.Loggable;


@Controller
@RequestMapping("/home")
@Loggable
public class HomeController {
	
	@GetMapping
	public String home() {
		return "forward:/index.html";
	}

}
