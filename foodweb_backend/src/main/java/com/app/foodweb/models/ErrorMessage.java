package com.app.foodweb.models;


public class ErrorMessage extends Exception{
  private String message;

  public String getMessage() {
      return message;
  }

  public void setMessage(String message) {
      this.message = message;
  }
}
