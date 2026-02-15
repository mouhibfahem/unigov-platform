package com.unigov.controller;

import com.unigov.dto.PollDtos.*;
import com.unigov.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/polls")
public class PollController {
    @Autowired
    private PollService pollService;

    @PostMapping
    @PreAuthorize("hasAnyRole('DELEGUE', 'ADMIN')")
    public ResponseEntity<PollResponse> createPoll(@RequestBody PollRequest request, Principal principal) {
        return ResponseEntity.ok(pollService.createPoll(request, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<List<PollResponse>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @PostMapping("/{optionId}/vote")
    public ResponseEntity<?> vote(@PathVariable Long optionId) {
        pollService.vote(optionId);
        return ResponseEntity.ok().build();
    }
}
