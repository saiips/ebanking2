package com.dsb.eb2.api.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.logging.LogLevel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsb.eb2.api.model.Course;
import com.dsb.eb2.framework.controller.ApiController;
import com.dsb.eb2.framework.controller.BaseController;
import com.dsb.eb2.framework.log.Loggable;

@RestController
@RequestMapping(ApiController.API_PATH)
@Loggable
//@PreAuthorize("hasRole('USER')")
public class ListController extends BaseController {
	
	private final Log logger = LogFactory.getLog(this.getClass());
	
	private static final List<String> COURSES = Arrays.asList("Angularjs", "Angular", "Reactjs", "Emberjs", "Vuejs");
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/courses", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	@Loggable(result = false, value = LogLevel.INFO)
	public List<String> handleCoursesList() {
		logger.info("it workds");
		return COURSES;
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/object", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	@Loggable(result = false, value = LogLevel.INFO)
	public List<Course> handleObjectList() {
		
		List<Course> courses = new ArrayList<Course>();
		
		courses.add(new Course("Angularjs"));
		courses.add(new Course("Angular"));
		courses.add(new Course("Reactjs"));
		
		return courses;
	}	
	
}
