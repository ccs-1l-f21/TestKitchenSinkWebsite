package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;

public abstract class CurrentUserService {
  public abstract User get();

  public final boolean isLoggedIn() {
    return get() != null;
  }

}
