package com.dsb.eb2.api.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsb.eb2.framework.controller.ApiController;
//import com.dsb.eb2.framework.aspect.BaseExecution;
import com.dsb.eb2.model.Course;

@RestController
@RequestMapping(ApiController.API_PATH)
public class ListController extends ApiController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	private static final List<String> COURSES = Arrays.asList("Angularjs", "Angular", "Reactjs", "Emberjs", "Vuejs");
	
	@RequestMapping(value = "/courses", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	public List<String> handleCoursesList() {
		logger.info("it' works!!");
		return COURSES;
	}
	
	@RequestMapping(value = "/object", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	public List<Course> handleObjectList() {
		
		List<Course> courses = new ArrayList<Course>();
		
		courses.add(new Course("Angularjs"));
		courses.add(new Course("Angular"));
		courses.add(new Course("Reactjs"));
		
		return courses;
	}	
	
}
