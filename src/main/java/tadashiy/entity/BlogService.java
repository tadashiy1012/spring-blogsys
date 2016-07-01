package tadashiy.entity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class BlogService {
  @Autowired
  private BlogRepository repo;
  @Transactional
  public void save(Blog subject) {
    this.repo.save(subject);
  }
  public List<Blog> find() {
    return this.repo.findAll();
  }
  public Blog findOne(Long id) {
    return this.repo.findById(id);
  }
}