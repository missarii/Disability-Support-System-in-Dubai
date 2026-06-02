package ae.gov.pod.controller;

import ae.gov.pod.entity.BenefitApplication;
import ae.gov.pod.security.JwtUtils;
import ae.gov.pod.service.BenefitApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/benefits")
@RequiredArgsConstructor
public class BenefitController {

    private final BenefitApplicationService applicationService;

    @PostMapping("/{benefitId}/apply")
    public ResponseEntity<?> applyForBenefit(
            @PathVariable Long benefitId,
            @RequestParam Long userId,
            @RequestBody(required = false) String reason) {
        
        try {
            BenefitApplication application = applicationService.applyForBenefit(userId, benefitId, reason);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
