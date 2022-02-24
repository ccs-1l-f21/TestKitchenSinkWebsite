package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.entities.User;

import java.util.List;
import java.util.Map;


import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.client.RestTemplate;

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

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // public List<Review> getReviews() {
    //     return (List<Review>) reviewRepository.findAll();
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
        reviewRepository.deleteById(reviewId);
    }
}