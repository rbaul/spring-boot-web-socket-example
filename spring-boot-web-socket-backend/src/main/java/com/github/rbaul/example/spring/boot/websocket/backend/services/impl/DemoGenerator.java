package com.github.rbaul.example.spring.boot.websocket.backend.services.impl;

import com.github.rbaul.example.spring.boot.websocket.backend.domain.model.types.ProductState;
import com.github.rbaul.example.spring.boot.websocket.backend.domain.repository.ProductRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Service
public class DemoGenerator {

    private final ProductRepository productRepository;

    private final ProductMessageServiceImpl productMessageService;

    @Value("${generator.auto-generate: f}")
    @Setter @Getter
    private boolean autoGenerate;

    @Scheduled(fixedDelayString = "${generator.fixedDelay-in-milliseconds:3000}")
    @Transactional
    public void autoGenerateProductsStates() {
        if(autoGenerate) {
            productRepository.findAll().forEach(product -> product.setState(randomState()));
            productMessageService.productsUpdated();
        }

    }

    private ProductState randomState(){
        ProductState[] values = ProductState.values();
        List<ProductState> productStates = Arrays.asList(values);
        Collections.shuffle(productStates);
        return productStates.get(0);
    }


}
