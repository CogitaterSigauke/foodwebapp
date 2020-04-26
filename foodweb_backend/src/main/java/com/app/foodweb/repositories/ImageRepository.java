package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, String> {
    @Override
    void delete(Image deleted);

    void saveAs(Image image);

    Image find(String imageId);

    Image update(String imageId);

    }