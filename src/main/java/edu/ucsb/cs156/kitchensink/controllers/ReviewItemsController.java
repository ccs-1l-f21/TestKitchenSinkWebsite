package edu.ucsb.cs156.kitchensink.controllers;


import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import edu.ucsb.cs156.kitchensink.services.UCSBDiningService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description="Handles Database Operations for Reviews and Items")
@Slf4j
@RestController
@RequestMapping("/reviews")
public class ReviewItemsController {
    @ApiOperation(value = "Checks item from the database and API and if it exists, return the reviews for that item from the database",
    notes = "")
    @GetMapping("/item")
    public ResponseEntity<String> getItem(
        @ApiParam("dining commons code, e.g. de-la-guerra") @RequestParam String hall,
        @ApiParam("item name, e.g. Grilled Turkey Jack on Sourdough") @RequestParam String item
    ) throws JsonProcessingException {
        return ResponseEntity.ok().body("HELLO FROM REVIEWITEMSCONTROLLER.java - getItem()");
    }

}
