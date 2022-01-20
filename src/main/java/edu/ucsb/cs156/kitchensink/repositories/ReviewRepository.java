package edu.ucsb.cs156.kitchensink.repositories;

import edu.ucsb.cs156.kitchensink.entities.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {
}
