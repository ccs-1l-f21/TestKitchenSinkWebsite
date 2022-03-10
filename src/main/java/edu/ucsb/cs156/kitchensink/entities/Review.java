package edu.ucsb.cs156.kitchensink.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.*;
import scala.collection.immutable.Set.Set2;
import scala.collection.mutable.Seq;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "review")
// @JsonIdentityInfo(
//         generator = ObjectIdGenerators.PropertyGenerator.class, property = "id"
// )
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "menu_item_id")
  private MenuItem menuItem;

  @OneToMany( fetch = FetchType.LAZY,
  cascade = CascadeType.ALL)
  @Builder.Default
  // @JsonManagedReference
  // @JsonIgnore
  private Set<Picture> pictures = new HashSet<Picture>();

  private int stars;
  
  private String review;

  @OneToMany( fetch = FetchType.LAZY,
  cascade = CascadeType.ALL)
  @Builder.Default
  private Set<PictureString> pictureString = new HashSet<PictureString>();

}


