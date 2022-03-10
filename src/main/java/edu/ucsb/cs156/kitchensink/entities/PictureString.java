package edu.ucsb.cs156.kitchensink.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.hibernate.annotations.Type;

import lombok.*;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PictureString {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String base64;

  private long reviewId;

}


