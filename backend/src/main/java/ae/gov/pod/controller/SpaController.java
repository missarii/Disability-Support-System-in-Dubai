package ae.gov.pod.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Catch-all SPA controller.
 * Forwards any non-API / non-static route to the React index.html
 * so that React Router can handle client-side navigation.
 */
@Controller
public class SpaController {

    @RequestMapping(value = {
            "/",
            "/{path:[^\\.]*}",
            "/{path:[^\\.]*}/{subPath:[^\\.]*}"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
