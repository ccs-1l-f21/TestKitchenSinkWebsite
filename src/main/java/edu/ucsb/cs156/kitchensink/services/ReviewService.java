package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.Review;

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


@Slf4j
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getReviews() {
        return (List<Review>) reviewRepository.findAll();
    }
    
    @Transactional
    public Review updateReview(String rText, int rating, String diningCommonsCode, String item, String station, String userEmail) throws Exception {
        List<Review> listReview = (List<Review>)reviewRepository.findAll();
        Review foundReview = null;

        for(Review review : listReview) {
            System.out.println(review.getMenuItem().getName().equals(item));
            if(review.getMenuItem().getName().equals(item) && review.getMenuItem().getDiningCommonsCode().equals(diningCommonsCode) && review.getUser().getEmail().equals(userEmail)) {
                foundReview = review;
                System.out.println(foundReview.getReview());
                break;
                // log.info(review.getName());
            }
        }
        if (foundReview == null){
            throw new Exception("Review Not Found");
        }

        foundReview.setReview(rText);
        foundReview.setStars(rating);

        return foundReview;

    }
}