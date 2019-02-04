package com.github.rbaul.example.spring.boot.websocket.backend.services.impl;

import com.github.rbaul.example.spring.boot.websocket.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Service
public class ProductMessageServiceImpl {

    private final SimpMessagingTemplate template;

    private final ProductService productService;

    @Lazy
    @Autowired
    private DemoGenerator demoGenerator;

    public void productsUpdated() {
        template.convertAndSend("/topic/products-updates", productService.getAll());
    }

    public void productUpdated(Long productId) {
        template.convertAndSend("/topic/product-updates", productService.get(productId));
    }

    public void notifyAutoGenerateFlagChange() {
        boolean autoGenerate = demoGenerator.isAutoGenerate();
        template.convertAndSend("/topic/auto-generation-flag", autoGenerate);
    }
}
