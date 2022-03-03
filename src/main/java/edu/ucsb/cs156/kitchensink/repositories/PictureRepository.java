package edu.ucsb.cs156.kitchensink.repositories;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Picture;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.entities.User;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureRepository extends CrudRepository<Picture, Long> {
    Optional<Picture> findById(long id);
    List<Optional<Picture>> findByReviewId(long id);
    
}
