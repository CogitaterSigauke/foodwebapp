package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Video;
import org.springframework.data.repository.CrudRepository;

public interface VideoRepository extends CrudRepository<Video, String> {
    @Override
    void delete(Video deleted);

    }
