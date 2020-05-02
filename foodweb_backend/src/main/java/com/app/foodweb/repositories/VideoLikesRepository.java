package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.VideoLikes;
import org.springframework.data.repository.CrudRepository;

public interface VideoLikesRepository extends CrudRepository<VideoLikes, String> {
    @Override
    void delete(VideoLikes deleted);

    }
