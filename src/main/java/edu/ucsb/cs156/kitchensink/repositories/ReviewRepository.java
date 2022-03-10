package edu.ucsb.cs156.kitchensink.repositories;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.entities.User;

import java.util.List;
import java.util.Optional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {
    List<Review> findByMenuItem(MenuItem menuitem);
    Optional<Review> findByMenuItemAndUser(MenuItem menuitem, User user);
    List<Optional<Review>> findByUser(User user);
}
