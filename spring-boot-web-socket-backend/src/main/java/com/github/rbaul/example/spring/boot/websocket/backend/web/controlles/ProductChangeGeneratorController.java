package com.github.rbaul.example.spring.boot.websocket.backend.web.controlles;

import com.github.rbaul.example.spring.boot.websocket.backend.services.impl.DemoGenerator;
import com.github.rbaul.example.spring.boot.websocket.backend.services.impl.ProductMessageServiceImpl;
import com.github.rbaul.example.spring.boot.websocket.backend.web.dtos.errors.ErrorDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@RestController
@RequestMapping("api/product/generator")
public class ProductChangeGeneratorController {

    private final DemoGenerator demoGenerator;

    private final ProductMessageServiceImpl productMessageService;

    @ApiOperation(value = "Get auto generation flag")
    @ApiResponses({@ApiResponse(code = 200, message = "Retrieved auto generation flag")})
    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping
    public boolean isAutoGenerate() {
        return demoGenerator.isAutoGenerate();
    }

    @ApiOperation(value = "Update auto generation flag")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Successfully auto generation flag updated"),
            @ApiResponse(code = 428, message = "Invalid info", response = ErrorDto.class)})
    @ResponseStatus(code = HttpStatus.OK)
    @PostMapping
    public void updateAutoGenerationFlag(@RequestBody boolean autoGenerationFlag) {
        demoGenerator.setAutoGenerate(autoGenerationFlag);
        productMessageService.notifyAutoGenerateFlagChange();
    }


}
