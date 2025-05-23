package com.location.locationserv.Controllers;

import jakarta.servlet.http.HttpServletRequest;

public abstract class AbstractController {

    protected String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

}