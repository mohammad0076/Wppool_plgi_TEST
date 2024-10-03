Feature: WP TEST



  Background:  Login should be success(1)
    Given User navigates to the application
    And User enter the username as "root"
    And User enter the password as "root"
    When User click on the login button
    # Then User verifies the dashboard is visible

  @skip
  Scenario: Verify that “WP Dark Mode” Plugin is Active (2)
    Given Click on the Plugins
    Then Click on the installed Plugin
    And Click on the "WP Dark Mode" plugin visible in Plugins
    Then Check the  "WP Dark Mode" status is Deactivate
 @regression
  Scenario: Verify that navigating on dark mode is working in front end(3,12)
    Given Click on the "wppool home" button 
    Then Check the dark mode button is visble
    Then Click on the Dark mode button

   @skip
  Scenario: Verify that navigating on dark mode is working(4)
    Given Click on the "WP Dark Mode" plugin
    Then Check that "Admin Panel Dark Mode" is visible
    Then Click on the "Admin Panel Dark Mode"
    Then "Enable Admin Dashboard Dark Mode" toggle button
    Then Click on save changes button
    Then Check that the dashboard has toogle button 
    Then Click on the "Dark" button
    Then Check the colour is dark
  @skip
 Scenario: Verify that admin dark mode is not working in Analytics &Validate whether the dark mode is working or not on the Admin Dashboard &Navigate to the WP Dark Mode &  Change the “Floating Switch Style” from the default selections (Select any one from the available options, except the default selected one).(5,6,7)
   Given Click on the "WP Dark Mode" plugin
    Then Check that "Admin Panel Dark Mode" is visible
    Then Click on the "Admin Panel Dark Mode"
    Then "Enable Admin Dashboard Dark Mode" toggle button
    Then Click on save changes button
    Then Check that the dashboard has toogle button 
    Then Click on the "Dark" button
    Then Check the colour is dark
    Then Click on the "Analytics" from left side nav
    Then Check the "date" colour is not dark
    Given Click on the "WP Dark Mode" plugin
    Then Click on the Customization bnutton
    Then Click on the switch Settings
    Then Change the flowting styles
    Then Click on save changes button
  @skip
Scenario: From Customization → Switch Settings → Switch Customization - Select Custom Switch size & Scale it to 220.(8)
   Given Click on the "WP Dark Mode" plugin
   Then Click on the Customization bnutton
   Then Click on the switch Settings
   Then Select custom switch size 
   Then Scale the value to 220
   Then Click on save changes button
    @skip
Scenario: From Customization → Switch Settings - Change the Floating Switch Position (Right).(9)
   Given Click on the "WP Dark Mode" plugin
   Then Click on the Customization bnutton
   Then Click on the switch Settings
   Then Click on the switch Floating Switch Position left
   Then Click on save changes button

  @skip
Scenario: Disable the Keyboard Shortcut from the Accessibility Settings.(10)
   Given Click on the "WP Dark Mode" plugin
   Then Click on the Advanced bnutton
   Then Click on the Accessibility bnutton
   Then Disable the keybioard shjortcut
   Then Click on save changes button

  @skip
Scenario: From Customization → Site Animation → “Enable Page-Transition Animation” & change the Animation Effect from the default selections.(11)
   Given Click on the "WP Dark Mode" plugin
   Then Click on the Customization bnutton
   Then Click on the site Animation
   Then Enable the Transition Animation & change the Animation Effect
   Then Click on save changes button



