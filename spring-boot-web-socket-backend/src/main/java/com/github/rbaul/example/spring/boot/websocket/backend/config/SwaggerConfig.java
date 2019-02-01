package com.github.rbaul.example.spring.boot.websocket.backend.config;

import com.github.rbaul.example.spring.boot.websocket.backend.web.controlles.ProductController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${application.formatted-version:development}")
    private String version;

    @Value("${application.title:demo-server}")
    private String title;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Product API")
                .enable(true)
                .enableUrlTemplating(true)
                .select()
                .apis(RequestHandlerSelectors.basePackage(ProductController.class.getPackage().getName()))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .version(version).build();
    }

}