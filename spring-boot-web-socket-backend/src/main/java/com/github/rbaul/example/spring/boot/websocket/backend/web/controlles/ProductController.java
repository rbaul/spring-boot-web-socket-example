package com.github.rbaul.example.spring.boot.websocket.backend.web.controlles;

import com.github.rbaul.example.spring.boot.websocket.backend.config.ApiImplicitPageable;
import com.github.rbaul.example.spring.boot.websocket.backend.services.ProductService;
import com.github.rbaul.example.spring.boot.websocket.backend.services.impl.ProductMessageServiceImpl;
import com.github.rbaul.example.spring.boot.websocket.backend.web.ValidationGroups;
import com.github.rbaul.example.spring.boot.websocket.backend.web.dtos.ProductDto;
import com.github.rbaul.example.spring.boot.websocket.backend.web.dtos.errors.ErrorDto;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Slf4j
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@RestController
@RequestMapping("api/product")
public class ProductController {

    private final ProductService productService;

    private final ProductMessageServiceImpl productMessageService;

    @ApiOperation(value = "Get Product")
    @ApiResponses({@ApiResponse(code = 200, message = "Retrieved Product"),
            @ApiResponse(code = 404, message = "Product Not Found", response = ErrorDto.class)})
    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping("{productId}")
    public ProductDto getProduct(@PathVariable long productId) {
        return productService.get(productId);
    }

    @ApiOperation(value = "Get All Product")
    @ApiResponses({@ApiResponse(code = 200, message = "Retrieved All Product")})
    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping("all")
    public List<ProductDto> getAllProduct() {
        return productService.getAll();
    }


    @ApiOperation(value = "Create Product")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Successfully Product created"),
            @ApiResponse(code = 428, message = "Invalid Product info", response = ErrorDto.class)})
    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public ProductDto create(
            @ApiParam(value = "Product object that needs to be create", name = "ProductDto", required = true)
            @Validated(ValidationGroups.Create.class) @RequestBody ProductDto productDto) {
        ProductDto productDtoResponse = productService.create(productDto);
        productMessageService.productsUpdated();
        return productDtoResponse;
    }

    @ApiOperation(value = "Update product")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Successfully Product updated"),
            @ApiResponse(code = 428, message = "Invalid product info", response = ErrorDto.class)})
    @ResponseStatus(code = HttpStatus.OK)
    @PutMapping("{productId}")
    public ProductDto update(@PathVariable long productId,
                                   @ApiParam(value = "Product object that needs to be edit", name = "ProductDto", required = true)
                                   @Validated(ValidationGroups.Create.class) @RequestBody ProductDto productDto) {
        ProductDto productDtoResponse = productService.update(productId, productDto);
        productMessageService.productsUpdated();
        productMessageService.productUpdated(productId);
        return productDtoResponse;
    }

    @ApiOperation(value = "Delete Product")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Successfully Product deleted"),
            @ApiResponse(code = 428, message = "Invalid product Id", response = ErrorDto.class)})
    @ResponseStatus(code = HttpStatus.OK)
    @DeleteMapping("{productId}")
    public void delete(@PathVariable long productId) {
        productService.delete(productId);
        productMessageService.productsUpdated();
    }

    @ApiOperation(value = "Fetch all products with paging")
    @ApiImplicitPageable
    @ApiResponses({
            @ApiResponse(code = 200, message = "Successfully lists products")})
    @ResponseStatus(code = HttpStatus.OK)
    @GetMapping
    public Page<ProductDto> fetch(@PageableDefault @ApiIgnore(
            "Ignored because swagger ui shows the wrong params, " +
                    "instead they are explained in the implicit params"
    ) Pageable pageable) {
        return productService.getPageable(pageable);
    }

}
