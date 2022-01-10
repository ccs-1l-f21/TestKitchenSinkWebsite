package edu.ucsb.cs156.kitchensink.entities;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "items")
@Table
public class MenuItem {
  @Id
  @SequenceGenerator(
    name = "menuitem_sequence",
    sequenceName = "menuitem_sequence",
    allocationSize = 1  
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE, 
    generator = "menuitem_sequence"
  )
  private long id;
  private String name;
  private String station;
  private String diningCommonsCode;
}

