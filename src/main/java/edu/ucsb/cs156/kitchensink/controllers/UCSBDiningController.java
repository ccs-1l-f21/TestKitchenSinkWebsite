package edu.ucsb.cs156.kitchensink.controllers;

import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.DeleteMapping;
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
import edu.ucsb.cs156.kitchensink.services.UCSBDiningService;
import edu.ucsb.cs156.kitchensink.services.ReviewService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(description="Dining Commons Info from UCSB")
@Slf4j
@RestController
@RequestMapping("/api/dining")
public class UCSBDiningController extends ApiController{
    
    @Autowired
    UCSBDiningService ucsbDiningService;

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

    @ApiOperation(value = "Get list of items on the menu for a dining commons from the database", 
    notes = "")
    @GetMapping("/getreviews")
    public List<Review> getReviewsJSON(
        @ApiParam("review text, e.g. this sucked") @RequestParam String menuitem,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam String diningCommonsCode
    ) throws JsonProcessingException {
        log.info("Inside the GetMapping");
        // String result = reviewService.getReviews();
        List<Review> optionalReviews = reviewService.getReviews();
        List<Review> sortedReviews = new ArrayList<Review>();
        for(Review review : optionalReviews) {
            if(review.getMenuItem().getName().equals(menuitem) && review.getMenuItem().getDiningCommonsCode().equals(diningCommonsCode)) {
                sortedReviews.add(review);
                // log.info(review.getName());
            }
        }
        return sortedReviews;
    }

    @ApiOperation(value = "Get Review by item and user", notes = "")
    @GetMapping("/getuserreview")
    public List<Review> getUserReviewJSON(
        @ApiParam("menu item, e.g. Oatmeal_(vgn)") @RequestParam String menuitem,
        @ApiParam("dining common, e.g. carrillo") @RequestParam String diningCommonsCode
    ) throws JsonProcessingException {
        List<Review> reviews = reviewService.getReviews();
        List<Review> foundReview = new ArrayList<Review>();
        CurrentUser currentUser = super.getCurrentUser();
        for(Review review : reviews) {
            System.out.println(review.getMenuItem().getName().equals(menuitem));
            if(review.getMenuItem().getName().equals(menuitem) && review.getMenuItem().getDiningCommonsCode().equals(diningCommonsCode) && review.getUser().getEmail().equals(currentUser.getUser().getEmail())) {
                foundReview.add(review);
                break;
            }
        }

        return foundReview;
    }

    @ApiOperation(value = "update review text and rating", notes = "")
    @PutMapping("/editreview")
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

    @ApiOperation(value = "delete review", notes = "")
    @DeleteMapping("/deletereview")
    public ResponseEntity<String> deleteReview(
        @ApiParam("id, e.g. 1") @RequestParam Long id
    ) throws Exception {
        System.out.println("Hello");
        reviewService.deleteReview(id);
        return ResponseEntity.ok().body("Delete Successful");
    }

    @ApiOperation(value = "Get list of dining commons serving meals on given date.", 
    notes = "JSON return format documented here: https://developer.ucsb.edu/apis/dining/dining-menu#/")
    @GetMapping("/commons")
    public ResponseEntity<String> getDiningCommons(
        @ApiParam("date in ISO format, e.g. 2021-10-04") @RequestParam String date
    ) throws JsonProcessingException {
        String result = ucsbDiningService.getDiningCommonsJSON(date);
        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "Get list of meals for a dining commons on a given date.", 
    notes = "JSON return format documented here: https://developer.ucsb.edu/apis/dining/dining-menu#/")
    @GetMapping("/meals")
    public ResponseEntity<String> getDiningCommonsMealsJSON(
        @ApiParam("date in ISO format, e.g. 2021-10-04") @RequestParam String date,
        @ApiParam("dining commons code, e.g. de-la-guerra") @RequestParam String diningCommonsCode
    ) throws JsonProcessingException {
        String result = ucsbDiningService.getDiningCommonsMealsJSON(date, diningCommonsCode);
        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "Get list of items on the menu for a dining commons on a given date.", 
    notes = "JSON return format documented here: https://developer.ucsb.edu/apis/dining/dining-menu#/")
    @GetMapping("/menu")
    public ResponseEntity<String> getDiningCommonsMealsJSON(
        @ApiParam("date in ISO format, e.g. 2021-10-04") @RequestParam String date,
        @ApiParam("dining commons code, e.g. de-la-guerra") @RequestParam String diningCommonsCode,
        @ApiParam("meal code, e.g. dinner") @RequestParam String mealCode
    ) throws JsonProcessingException {
        String result = ucsbDiningService.getDiningCommonsMealItemsJSON(date, diningCommonsCode, mealCode);
        return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "Receives the text from the frontend and stores in the database",
    notes = "")
    @PostMapping("/writtenreview")
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
        log.info("currentUser = " + currentUser);
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
        log.info("menuItem = " + menuItem);
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
        log.info("review = " + review);

        String body = mapper.writeValueAsString(review);
        return ResponseEntity.ok().body(body);
    }
}