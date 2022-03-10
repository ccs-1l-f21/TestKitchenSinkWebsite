package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Picture;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.entities.User;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.client.RestTemplate;

import edu.ucsb.cs156.kitchensink.repositories.PictureRepository;
import edu.ucsb.cs156.kitchensink.repositories.ReviewRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.util.Arrays;
import java.util.Optional;


@Slf4j
@Service
public class PictureService {
    private final ReviewRepository reviewRepository;
    private final PictureRepository pictureRepository;

    @PersistenceContext
	private EntityManager entityManager;

    @Autowired
    public PictureService(ReviewRepository reviewRepository, PictureRepository pictureRepository) {
        this.reviewRepository = reviewRepository;
        this.pictureRepository = pictureRepository;
    }


    public void deletePictureByReviewId(Long reviewId) {
        boolean exists = reviewRepository.existsById(reviewId);
        if(!exists) {
            throw new IllegalStateException("review with id " + reviewId + "does not exist");
        }
        // pictureRepository.deleteByReview_id(reviewId);
        List<Optional<Picture>> pictureList = pictureRepository.findByReviewId(reviewId);
        for(int i = 0; i < pictureList.size(); i++) {
            Picture picture = pictureList.get(i).get();
            pictureRepository.deleteById(picture.getId());
        }
    }
}