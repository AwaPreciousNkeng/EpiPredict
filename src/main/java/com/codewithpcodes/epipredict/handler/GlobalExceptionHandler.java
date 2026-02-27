package com.codewithpcodes.epipredict.handler;

import com.codewithpcodes.epipredict.exceptions.DuplicateResourceException;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handle(DuplicateResourceException exp) {
        return buildResponse(HttpStatus.CONFLICT, exp.getMessage(), null);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(ResourceNotFoundException exp) {
        return buildResponse(HttpStatus.NOT_FOUND, exp.getMessage(), null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handle(AccessDeniedException exp) {
        return buildResponse(HttpStatus.FORBIDDEN, exp.getMessage(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handle(MethodArgumentNotValidException exp) {
        var errors = new HashMap<String, String>();
        exp.getBindingResult().getAllErrors().forEach((error) -> {
            var fieldName = ((FieldError)error).getField();
            var errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Validation failed",
                errors
        );
    }

    private ResponseEntity<ErrorResponse> buildResponse(
            HttpStatus httpStatus,
            String message,
            HashMap<String, String> errors
    ) {
        ErrorResponse response = new ErrorResponse(
                httpStatus.value(),
                httpStatus.getReasonPhrase(),
                message,
                errors,
                LocalDateTime.now()
        );
        return ResponseEntity.status(httpStatus).body(response);
    }
}
