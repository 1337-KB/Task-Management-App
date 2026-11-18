package com.evans.task_management_api.exception;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)

    @ResponseBody
    public Map<String, Object>
    handleRuntimeException(RuntimeException ex) {
        return Map.of(
            "timestamp", System.currentTimeMillis(),
            "error", ex.getMessage()
        );
    }
}
