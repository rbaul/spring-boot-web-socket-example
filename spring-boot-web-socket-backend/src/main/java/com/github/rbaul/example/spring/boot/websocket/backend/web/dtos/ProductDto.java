package com.github.rbaul.example.spring.boot.websocket.backend.web.dtos;

import com.github.rbaul.example.spring.boot.websocket.backend.domain.model.types.ProductState;
import com.github.rbaul.example.spring.boot.websocket.backend.web.ValidationGroups;
import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.validation.constraints.Null;

@ApiModel("Product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ProductDto {

    @Null(groups = ValidationGroups.Create.class)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private ProductState state;
}
