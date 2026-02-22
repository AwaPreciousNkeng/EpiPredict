package com.codewithpcodes.epipredict.handler;

import java.util.Map;

public record ErrorResponse(
        Map<String, String> errors
) {
}
