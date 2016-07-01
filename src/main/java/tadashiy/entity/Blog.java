package tadashiy.entity;

import java.util.Date;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Blog {
  @Id @GeneratedValue
  public Long id;
  public String title;
  public String body;
  public String author;
  public Date date;
  public Blog() {}
  public Blog(String title, String body, String author) {
    this.title = title;
    this.body = body;
    this.author = author;
    this.date = Date.from(Instant.now());
  }
  @Override
  public String toString() {
    return "Blog[" + id + ":" + title +":" + body + ":" + author + ":" + date + "]";
  }
}