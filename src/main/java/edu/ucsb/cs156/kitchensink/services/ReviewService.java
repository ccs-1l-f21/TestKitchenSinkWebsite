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
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PictureRepository pictureRepository;

    @PersistenceContext
	private EntityManager entityManager;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, PictureRepository pictureRepository) {
        this.reviewRepository = reviewRepository;
        this.pictureRepository = pictureRepository;
    }


    // @Transactional
    // public List<Optional<Review>> getReviews(MenuItem menuItem) {
    //     List<Optional<Review>> reviews = reviewRepository.findByMenuItem(menuItem);
    //     // if (reviews.isEmpty()) {
    //     //     return reviews;
    //     // }
    //     // Session sessin = (Session)entityManager.unwrap(Session.class);
	// 	// sessin.close();

    //     return reviews;
    // }
    
    @Transactional
    public Review updateReview(String rText, int rating, MenuItem menuItem, User user) throws Exception {
        // List<Review> listReview = (List<Review>)reviewRepository.findAll();
        Optional<Review> optionalFoundReview = reviewRepository.findByMenuItemAndUser(menuItem, user);
        Review foundReview = optionalFoundReview.get();

        if (foundReview == null){
            throw new Exception("Review Not Found");
        }

        foundReview.setReview(rText);
        foundReview.setStars(rating);

        return foundReview;

    }

    public void deleteReview(Long reviewId) {
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
        reviewRepository.deleteById(reviewId);
    }
}