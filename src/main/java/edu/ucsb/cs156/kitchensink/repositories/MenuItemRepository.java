package edu.ucsb.cs156.kitchensink.repositories;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends CrudRepository<MenuItem, Long> {
  Optional<MenuItem> findByNameAndDiningCommonsCode(String name, String diningCommonsCode);
  Optional<MenuItem> findByNameAndDiningCommonsCodeAndStation(String name, String diningCommonsCode, String station);
}
