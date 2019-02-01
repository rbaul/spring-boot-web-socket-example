package com.github.rbaul.example.spring.boot.websocket.backend.domain.repository;

import com.github.rbaul.example.spring.boot.websocket.backend.domain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
