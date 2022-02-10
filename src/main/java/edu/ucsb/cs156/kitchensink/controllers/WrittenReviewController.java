package edu.ucsb.cs156.kitchensink.controllers;


import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.models.CurrentUser;
import edu.ucsb.cs156.kitchensink.repositories.MenuItemRepository;
import edu.ucsb.cs156.kitchensink.repositories.ReviewRepository;
import edu.ucsb.cs156.kitchensink.repositories.UserRepository;
import edu.ucsb.cs156.kitchensink.services.ReviewService;
import edu.ucsb.cs156.kitchensink.services.UCSBDiningService;

import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description="Handles Database Operations for Reviews and Items")
@Slf4j
@RestController
// @CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/writtenreview")
public class WrittenReviewController extends ApiController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    MenuItemRepository menuItemRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewService reviewService;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "update review text and rating", notes = "")
    @PutMapping("/edit")
    public ResponseEntity<String> putReview(
        @ApiParam("review text, e.g. this sucked") @RequestParam String rText,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam int rating,
        @ApiParam("hall, e.g. de-la-guerra") @RequestParam String diningCommonsCode,
        @ApiParam("item, e.g. Dan Dan Noodles (nuts)") @RequestParam String item,
        @ApiParam("station, e.g. Condiments") @RequestParam String station    
    ) throws Exception {
        System.out.println("Inside the PutMapping");
        CurrentUser currentUser = super.getCurrentUser();
        Review review = reviewService.updateReview(rText, rating, diningCommonsCode, item, station, currentUser.getUser().getEmail());
        String body = mapper.writeValueAsString(review);
        return ResponseEntity.ok().body(body);
    }
    
    @ApiOperation(value = "Receives the text from the frontend and stores in the database",
    notes = "")
    @PostMapping("/post/writtenreview")
    public ResponseEntity<String> getReview(
        @ApiParam("review text, e.g. this sucked") @RequestParam String rText,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam int rating,
        @ApiParam("hall, e.g. de-la-guerra") @RequestParam String diningCommonsCode,
        @ApiParam("item, e.g. Dan Dan Noodles (nuts)") @RequestParam String item,
        @ApiParam("station, e.g. Condiments") @RequestParam String station
    ) throws JsonProcessingException {
        CurrentUser currentUser = super.getCurrentUser();
        log.info("review = " + rText);
        log.info("rating = " + rating);
        log.info("diningCommonsCode = " + diningCommonsCode);
        log.info("item = " + item);
        log.info("station = " + station);
        // log.info("currentUser = " + currentUser);
        MenuItem menuItem = null;
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findByNameAndDiningCommonsCode(item, diningCommonsCode);
        if (optionalMenuItem.isPresent()) {
            menuItem = optionalMenuItem.get();
        }
        else {
            menuItem = new MenuItem();
            menuItem.setName(item);
            menuItem.setDiningCommonsCode(diningCommonsCode);
            menuItem.setStation(station);
            menuItem = menuItemRepository.save(menuItem);
        }
        // log.info("menuItem = " + menuItem);
        // to do: create a new review object 
        // assign the menu item from the menu item variable
        // assign user from the current user variable
        // assign stars and texts from the variables passed in by the user
        // store the review - review = reviewRepository.save(menuItem);
        // Change String body = mapper.writeValueAsString(review);
        Review review = null;
        review = new Review();
        review.setUser(currentUser.getUser());
        review.setMenuItem(menuItem);
        review.setStars(rating);
        review.setReview(rText);
        review = reviewRepository.save(review);
        // log.info("review = " + review);

        String body = mapper.writeValueAsString(review);
        return ResponseEntity.ok().body(body);
    }

}
