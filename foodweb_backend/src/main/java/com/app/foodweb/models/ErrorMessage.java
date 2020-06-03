package com.app.foodweb.models;


public class ErrorMessage extends RuntimeException{
  private String message;

  public ErrorMessage(String message){
    this.message = message;
  }
  public String getMessage() {
      return message;
  }

  public void setMessage(String message) {
      this.message = message;
  }
}
