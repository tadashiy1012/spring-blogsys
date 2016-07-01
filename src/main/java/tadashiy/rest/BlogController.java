package tadashiy.rest;

import java.util.Date;
import java.time.Instant;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;

import tadashiy.entity.Blog;
import tadashiy.entity.BlogService;

@RestController
@RequestMapping("/blog")
public class BlogController {
  private Gson gson = new Gson();
  @Autowired
  private BlogService service;
  @RequestMapping(method=RequestMethod.GET)
  public String entries() {
    return gson.toJson(service.find());
  }
  @RequestMapping(value="/{id}", method=RequestMethod.GET)
  public String entry(@PathVariable Long id) {
    System.out.println(id);
    Blog b = service.findOne(id);
    System.out.println(b);
    return gson.toJson(b);
  }
  @RequestMapping(method=RequestMethod.POST)
  public String addEntriy(@RequestBody Blog subject) {
    subject.date = Date.from(Instant.now());
    System.out.println(subject);
    service.save(subject);
    return "ok";
  }
}