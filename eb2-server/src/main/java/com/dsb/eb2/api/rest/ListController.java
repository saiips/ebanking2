package com.dsb.eb2.springboot.controller;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ListController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	private static final List<String> COURSES = Arrays.asList("Angularjs", "Angular", "Reactjs", "Emberjs", "Vuejs");
	
	
	@RequestMapping(value = "/courses", method = RequestMethod.GET)
	public List<String> handleCoursesList() {
		logger.info("it' works!!");
		return COURSES;
	}
	
}
