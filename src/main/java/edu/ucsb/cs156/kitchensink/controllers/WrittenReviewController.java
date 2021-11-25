package edu.ucsb.cs156.kitchensink.controllers;


import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import edu.ucsb.cs156.kitchensink.entities.MenuItem;
import edu.ucsb.cs156.kitchensink.models.CurrentUser;
import edu.ucsb.cs156.kitchensink.repositories.MenuItemRepository;
import edu.ucsb.cs156.kitchensink.repositories.ReviewRepository;
import edu.ucsb.cs156.kitchensink.repositories.UserRepository;
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
    ObjectMapper mapper;

    @ApiOperation(value = "Receives the text from the frontend and stores in the database",
    notes = "")
    @PostMapping("")
    public ResponseEntity<String> getReview(
        @ApiParam("review text, e.g. this sucked") @RequestParam String rText,
        @ApiParam("rating, e.g. 1,2,3,4,5") @RequestParam int rating,
        @ApiParam("hall, e.g. de-la-guerra") @RequestParam String diningCommonsCode,
        @ApiParam("item, e.g. Dan Dan Noodles (nuts)") @RequestParam String item
    ) throws JsonProcessingException {
        CurrentUser currentUser = super.getCurrentUser();
        log.info("review = " + rText);
        log.info("rating = " + rating);
        log.info("diningCommonsCode = " + diningCommonsCode);
        log.info("item = " + item);
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
            menuItem = menuItemRepository.save(menuItem);
        }
        log.info("menuItem = " + menuItem);
        String body = mapper.writeValueAsString(menuItem);
        return ResponseEntity.ok().body(body);
    }

}
