# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_neknek_session',
  :secret      => 'c2c7ef9107461fbffbb75e8959a57882ae373b6d3d3cc449b0d508a1d621dc8b53b3f31c67dfd3a551d95a87ad6d9b39fb67ad29ecff0b5c993b8903995ab1c0'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
