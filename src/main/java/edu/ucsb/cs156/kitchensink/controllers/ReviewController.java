package edu.ucsb.cs156.kitchensink.controllers;


import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import scala.collection.immutable.Set.Set2;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.entities.Review;
import edu.ucsb.cs156.kitchensink.entities.Picture;
import edu.ucsb.cs156.kitchensink.entities.PictureString;
import edu.ucsb.cs156.kitchensink.models.CurrentUser;
import edu.ucsb.cs156.kitchensink.repositories.MenuItemRepository;
import edu.ucsb.cs156.kitchensink.repositories.PictureRepository;

import edu.ucsb.cs156.kitchensink.repositories.ReviewRepository;
import edu.ucsb.cs156.kitchensink.repositories.UserRepository;
import edu.ucsb.cs156.kitchensink.services.ReviewService;
import edu.ucsb.cs156.kitchensink.services.UCSBDiningService;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Base64;

import javax.sound.sampled.Line;
import javax.transaction.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description="Handles Database Operations for Reviews and Items")
@Slf4j
@RestController
// @CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/review")
public class ReviewController extends ApiController {
    @Autowired
    UCSBDiningService ucsbDiningService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MenuItemRepository menuItemRepository;

    @Autowired 
    PictureRepository pictureRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewService reviewService;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "Receives the text from the frontend and stores in the database",
    notes = "")
    @PostMapping(path = "/writtenreview")
    @ResponseBody
    public ResponseEntity<String> postReview(
        @ApiParam("review text, e.g. this sucked") @RequestParam String rText,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam int rating,
        @ApiParam("hall, e.g. de-la-guerra") @RequestParam String diningCommonsCode,
        @ApiParam("item, e.g. Dan Dan Noodles (nuts)") @RequestParam String item,
        @ApiParam("station, e.g. Condiments") @RequestParam String station,
        HttpEntity<String> httpEntity
    ) throws JsonProcessingException {
        // log.info(httpEntity.getBody());
        String images = httpEntity.getBody();
        images = images.substring(11, images.length()-3);
        // log.info(images);
        String[] array = images.split("\\|");
        for (int i = 0; i < array.length; i++) {
            // array[i] = array[i].substring(23);
            if(array[i].substring(array[i].length()-1, array[i].length()).equals("\\")) {
                array[i] = array[i].substring(0, array[i].length()-1) + "=";
            }
        }
        CurrentUser currentUser = super.getCurrentUser();
        MenuItem menuItem = null;
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findByNameAndDiningCommonsCode(item, diningCommonsCode);

        // for (int i = 0; i < array.length; i++) {
        //     log.info(array[i]);
        // }
        
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

        Optional<Review> optionalReview = reviewRepository.findByMenuItemAndUser(menuItem, currentUser.getUser());
        if (optionalReview.isPresent()) {
            return ResponseEntity.ok().body("You have already reviewed this item");
        }

        Review review = null;
        review = new Review();
        review.setUser(currentUser.getUser());
        review.setMenuItem(menuItem);
        review.setStars(rating);
        review.setReview(rText);
        review = reviewRepository.save(review);
        // log.info("review = " + review);

        // log.info("review id = " + review.getId());
        // String body = "";
        for (int i = 0; i < array.length; i++) {
            Picture picture = new Picture();
            byte[] imageInBytes = Base64.getEncoder().encode(array[i].getBytes());
            // log.info(imageInBytes.toString());
            picture.setBase64(imageInBytes);
            picture.setReviewId(review.getId());
            pictureRepository.save(picture);
        }
        return ResponseEntity.ok().body("Hello");
    }

    @ApiOperation(value = "Get list of items on the menu for a dining commons from the database", 
    notes = "")
    @GetMapping("/getreviews")
    public List<Review> getReviews(
        @ApiParam("review text, e.g. this sucked") @RequestParam String menuitem,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam String diningCommonsCode,
        @ApiParam("station, Grill_(Cafe)") @RequestParam String station
    ) throws JsonProcessingException {
        // log.info("Inside the GetMapping");
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findByNameAndDiningCommonsCode(menuitem, diningCommonsCode);
        if (!optionalMenuItem.isPresent()) {
            return null;
        }
        MenuItem menuItem = optionalMenuItem.get();
        log.info("Before review");
        List<Review> review = reviewRepository.findByMenuItem(menuItem);

        for (int i = 0; i < review.size(); i++) {
            List<PictureString> pictureList = new ArrayList<PictureString>(pictureRepository.findByReviewId(review.get(i).getId()).size());
            for (int j = 0; j < pictureRepository.findByReviewId(review.get(i).getId()).size(); j++) {
                Picture picture = pictureRepository.findByReviewId(review.get(i).getId()).get(j).get();
                PictureString pictureString = new PictureString();
                pictureString.setId(picture.getId());
                pictureString.setReviewId(picture.getReviewId());
                // String string = new String(Base64.getEncoder().encode(picture.getBase64()));
                String decoded = new String(Base64.getDecoder().decode(picture.getBase64()));
                String string = new String(decoded);
                // log.info(string);
                // string = "data:image/jpeg;base64," + string;
                pictureString.setBase64(string);
                pictureList.add(pictureString);
            }
            Set<PictureString> setPictureList = Set.copyOf(pictureList);
            review.get(i).setPictureString(setPictureList);
        }
        log.info("After List Review");
        // log.info("review = " + review);
        return review;
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
        CurrentUser currentUser = super.getCurrentUser();
        Optional<MenuItem> optionalMenuItem = menuItemRepository.findByNameAndDiningCommonsCode(item, diningCommonsCode);
        MenuItem menuItem = optionalMenuItem.get();
        Review review = reviewService.updateReview(rText, rating, menuItem, currentUser.getUser());
        String body = mapper.writeValueAsString(review);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "delete review", notes = "")
    @DeleteMapping("/deletereview")
    public ResponseEntity<String> deleteReview(
        @ApiParam("id, e.g. 1") @RequestParam Long id
    ) throws Exception {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().body("Delete Successful");
    }

   

}
   