package com.app.foodweb.repositories;

import java.util.List;

import com.app.foodweb.models.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, String> {
    @Override
    void delete(Comment deleted);

    void saveAs(Comment comment);

    Comment find(String commentId);

    Comment update(String commentId);

    }
