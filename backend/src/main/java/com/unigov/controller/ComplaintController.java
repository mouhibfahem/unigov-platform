package com.unigov.controller;

import com.unigov.dto.ComplaintDtos.*;
import com.unigov.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ComplaintResponse> createComplaint(@RequestBody ComplaintRequest request,
            Principal principal) {
        return ResponseEntity.ok(complaintService.createComplaint(request, principal.getName()));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints(Principal principal) {
        return ResponseEntity.ok(complaintService.getMyComplaints(principal.getName()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('DELEGUE', 'ADMIN')")
    public ResponseEntity<List<ComplaintResponse>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('DELEGUE', 'ADMIN')")
    public ResponseEntity<ComplaintResponse> updateComplaint(@PathVariable Long id,
            @RequestBody ComplaintUpdate update) {
        return ResponseEntity.ok(complaintService.updateComplaint(id, update));
    }
}
