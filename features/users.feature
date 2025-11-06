Feature: Users API
  As a client of the Blog API
  I want to manage users via the API
  So that I can create, read, update and delete users

  Background:
    Given the server is running at "http://localhost:3000"

  Scenario: Create a new user and retrieve it
    When I create a user with:
      | name  | email               |
      | Esra  | esra@example.com    |
    Then the response status should be 201
    And the response JSON should contain:
      | name  | Esra               |
      | email | esra@example.com   |
    When I fetch the user by id
    Then the response status should be 200
    And the response JSON should contain:
      | name  | Esra               |
      | email | esra@example.com   |

  Scenario: Update the user
    Given an existing user with:
      | name  | email               |
      | Esra  | esra@example.com    |
    When I update the user with:
      | name  | Esra Updated        |
    Then the response status should be 200
    And the response JSON should contain:
      | name  | Esra Updated       |

  Scenario: Delete the user
    Given an existing user with:
      | name  | email               |
      | Temp  | temp@example.com    |
    When I delete the user
    Then the response status should be 204


