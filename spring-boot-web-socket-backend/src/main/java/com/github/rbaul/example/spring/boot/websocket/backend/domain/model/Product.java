package com.github.rbaul.example.spring.boot.websocket.backend.domain.model;

import com.github.rbaul.example.spring.boot.websocket.backend.domain.model.types.ProductState;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    @Enumerated(EnumType.STRING)
    private ProductState state;
}
