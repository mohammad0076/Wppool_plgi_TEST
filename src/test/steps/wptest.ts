import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 10000 * 2);

Given('User navigates to the application', async function () {
  await pageFixture.page.goto('http://localhost/wordpress/wp-login.php');
   // Wait for 2 seconds

});

Given('User enter the username as {string}', async function (username) {
  await pageFixture.page
    .locator("//input[@id='user_login']")
    .type(username, { delay: 1000 }); 
});

Given('User enter the password as {string}', async function (password) {
  await pageFixture.page
    .locator("//input[@id='user_pass']")
    .type(password, { delay: 1000 }); 
});




When('User click on the login button', async function () {
  await pageFixture.page.locator("//input[@id='wp-submit']").click();
  // await pageFixture.page.locator('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(2000);
});

When('User verifies the dashboard is visible', async function () {
  
  const dashboardLocator = pageFixture.page.locator("//div[normalize-space()='Dashboard']");


  await dashboardLocator.waitFor({ state: 'visible' });


  const textMessage = await dashboardLocator.textContent();


  console.log('Dashboard Text: ' + textMessage);


  expect(textMessage).toBe('Dashboard');
});

When('Click on the Plugins', async function () {
  await pageFixture.page.waitForSelector("//div[contains(@class, 'wp-menu-name') and contains(text(), 'Plugins')]");
  await pageFixture.page.locator("//div[contains(@class, 'wp-menu-name') and contains(text(), 'Plugins')]").click();
 
});
Then('Click on the installed Plugin',async function () {
  await pageFixture.page.waitForSelector("li.wp-first-item.current a[aria-current='page']");
  await pageFixture.page.locator("li.wp-first-item.current a[aria-current='page']").click();


})
Then('Click on the "WP Dark Mode" plugin visible in Plugins',async function () {
 

  const isVisible = await pageFixture.page.locator("//strong[normalize-space()='WP Dark Mode']").isVisible();
  console.log("WP Dark Mode is visible:", isVisible);
})

Then('Check the  "WP Dark Mode" status is Deactivate',async function () {
  const isDeactivateVisible = await pageFixture.page.locator("//a[@id='deactivate-wp-dark-mode']").isVisible();
  console.log("Deactivate WP Dark Mode is visible:", isDeactivateVisible);
})

//a[normalize-space()='wppool']
When('Click on the "wppool home" button',async function(){
  await pageFixture.page.waitForSelector("//a[normalize-space()='wppool']");
  await pageFixture.page.locator("//a[normalize-space()='wppool']").click();
})
  

When('Check the dark mode button is visble',async function(){
  const toggleButton = await pageFixture.page.waitForSelector("//div[@class='wp-dark-mode-switch-styled wp-dark-mode-switch-3']", { timeout: 30000 });
  await toggleButton.waitForElementState('visible');
  await toggleButton.isVisible()

})
  

When('Click on the Dark mode button',async function(){
  const toggleButton = await pageFixture.page.waitForSelector("//div[@class='wp-dark-mode-switch-styled wp-dark-mode-switch-3']", { timeout: 30000 });
  await toggleButton.waitForElementState('visible');
  await toggleButton.click(); // Interact with the toggle button
})

Then(`Click on the "WP Dark Mode" plugin`,async function(){
  await pageFixture.page.waitForSelector("//div[contains(text(),'WP Dark Mode')]");
  await pageFixture.page.locator("//div[contains(text(),'WP Dark Mode')]").click();
})

Then(`Check that "Admin Panel Dark Mode" is visible`,async function(){
  const isTextVisible = await pageFixture.page.locator("//div[contains(text(),'Enable Admin Dashboard Dark Mode')]").isVisible();
  console.log("Enable Admin Dashboard Dark Mode is visible:", isTextVisible);
  
})
Then(`Click on the "Admin Panel Dark Mode"`,async function(){

  const adminPanelDarkModeLocator = pageFixture.page.locator("//a[normalize-space()='Admin Panel Dark Mode']");

  // Wait for the link to be visible
  await adminPanelDarkModeLocator.waitFor({ state: 'visible', timeout: 10000 }); // Waits up to 10 seconds

  // Optional: Add a brief timeout for demonstration purposes
  await pageFixture.page.waitForTimeout(2000); // Wait for 2 seconds before clicking

  // Check if the link is visible before clicking
  const isVisible = await adminPanelDarkModeLocator.isVisible();

  if (isVisible) {
    await adminPanelDarkModeLocator.click();
    console.log('Clicked on Admin Panel Dark Mode');

    // Wait for an expected element after clicking (adjust the selector as necessary)
    const expectedElement = pageFixture.page.locator("//h3[normalize-space()='Admin Panel Dark Mode']"); // Adjust this line
    await expectedElement.waitFor({ state: 'visible', timeout: 10000 }); // Waits for the expected element to be visible after click

    console.log('Expected element is visible after clicking Admin Panel Dark Mode');
  } else {
    console.log('Admin Panel Dark Mode link is not visible');
  }

})
Then(`"Enable Admin Dashboard Dark Mode" toggle button`,async function(){
  const toggleButton = pageFixture.page.locator("(//div[contains(@class, 'relative w-10 h-full rounded-full')]//span[contains(@class, 'w-5 h-5')])[1]");

  // Wait for the toggle button to be visible and click it
  await toggleButton.waitFor({ state: 'visible', timeout: 10000 });
  await toggleButton.click();
})


Then(`Click on save changes button`,async function(){
  const toggleButton = await pageFixture.page.locator("//button[normalize-space()='Save Changes']");

  await toggleButton.scrollIntoViewIfNeeded();
  

  await toggleButton.click();
  
  
})
Then(`Check that the dashboard has toogle button`,async function(){
  // Verify if "Light" button is visible
const isLightButtonVisible = await pageFixture.page.locator("//span[text()='Light' and contains(@class, 'wp-dark-mode-ignore')]").isVisible();
console.log("Light button is visible:", isLightButtonVisible);

// Verify if "Dark" button is visible
const isDarkButtonVisible = await pageFixture.page.locator("//span[text()='Dark' and contains(@class, 'wp-dark-mode-ignore')]").isVisible();
console.log("Dark button is visible:", isDarkButtonVisible);

})
Then(`Click on the "Dark" button`,async function(){
  const isDarkButtonVisible = await pageFixture.page.locator("//span[text()='Dark' and contains(@class, 'wp-dark-mode-ignore')]").click()

})
Then(`Check the colour is dark`,async function(){
 // Wait for the toggle switch to appear
await pageFixture.page.waitForSelector("#wp-admin-bar-wp-dark-mode-admin-bar-switch ._track", { timeout: 5000 });

// Locate the toggle switch element
const toggleSwitch = await pageFixture.page.locator("#wp-admin-bar-wp-dark-mode-admin-bar-switch ._track");

// Check if "Dark" is visible
const isDarkMode = await toggleSwitch.locator("span:has-text('Dark')").isVisible();

if (isDarkMode) {
    console.log("The Admin Bar is in Dark Mode.");
} else {
    console.log("The Admin Bar is not in Dark Mode.");
}

})
Then(`Click on the "Analytics" from left side nav`,async function(){
  // Locator for the Analytics div
const analyticsLocator = pageFixture.page.locator("//div[contains(@class, 'wp-menu-name') and normalize-space()='Analytics']");

// Wait for the Analytics div to be visible
await analyticsLocator.waitFor({ state: 'visible', timeout: 5000 });

// Click on the Analytics div
await analyticsLocator.click();

})


Then(`Check that user views "Performance"`,async function(){
 // Locator for the Performance heading
const performanceLocator = pageFixture.page.locator("//h2[normalize-space()='Performance']");

// Wait for the Performance heading to be visible
await performanceLocator.waitFor({ state: 'visible', timeout: 5000 });

// Check if the Performance heading is visible
const isVisible = await performanceLocator.isVisible();
console.log(`Is Performance heading visible? ${isVisible}`);


})

Then(`Check that the user views the "Total sales"`,async function(){
  // Locator for the Performance heading
 const performanceLocator = pageFixture.page.locator("//span[normalize-space()='Total sales']");
 
 // Wait for the Performance heading to be visible
 await performanceLocator.waitFor({ state: 'visible', timeout: 5000 });
 
 // Check if the Performance heading is visible
 const isVisible = await performanceLocator.isVisible();
 console.log(`Is Performance heading visible? ${isVisible}`);
 
 
 })


 Then(`Check the "date" colour is not dark`,async function(){
// Log before waiting for the button
console.log("Waiting for the dropdown button to become visible...");

// Wait for the dropdown button to be visible
try {
    await pageFixture.page.waitForSelector('.woocommerce-dropdown-button', { timeout: 10000 }); // Increase timeout
    console.log("Dropdown button is visible.");
    
    // Locate the dropdown button
    const dropdownButton = pageFixture.page.locator('.woocommerce-dropdown-button');
    
    // Wait for the dropdown button to be in the desired state
    const isLightMode = await dropdownButton.locator("span:has-text('Light')").isVisible({ timeout: 5000 });
    
    // Log the state of the dropdown button
    if (isLightMode) {
        console.log("The dropdown button is in Light Mode.");
    } else {
        console.log("The dropdown button is not in Light Mode.");
    }
} catch (error) {
    console.error("Error waiting for the dropdown button:", error);
    await pageFixture.page.screenshot({ path: 'screenshot.png' }); // Capture screenshot for debugging
}

 
 })

 Then(`Click on the Customization bnutton`,async function(){
// Wait for the element to be visible
await pageFixture.page.waitForSelector("(//h4[normalize-space()='Customization'])[1]", { state: 'visible', timeout: 5000 });

// Click the element
await pageFixture.page.locator("(//h4[normalize-space()='Customization'])[1]").click();

 })

 Then(`Click on the switch Settings`,async function(){
  // Wait for the 'Switch Settings' link to be visible
await pageFixture.page.waitForSelector("//a[normalize-space()='Switch Settings']", { state: 'visible', timeout: 5000 });

// Click the 'Switch Settings' link
await pageFixture.page.locator("//a[normalize-space()='Switch Settings']").click();

 })
 Then(`Change the flowting styles`,async function(){
// Wait for the floating switch element to be visible
await pageFixture.page.waitForSelector("(//div[@tabindex='0' and contains(@class, 'bg-[#F9FAFB]') and contains(@class, 'cursor-pointer')])[1]", { timeout: 5000 });

// Locate the floating switch element
const floatingSwitch = pageFixture.page.locator("(//div[@tabindex='0' and contains(@class, 'bg-[#F9FAFB]') and contains(@class, 'cursor-pointer')])[1]");
const floatingSwitch2 = pageFixture.page.locator("(//div[@tabindex='0' and contains(@class, 'bg-[#F9FAFB]') and contains(@class, 'cursor-pointer')])[2]");
await floatingSwitch2.click();

const floatingSwitch3 = pageFixture.page.locator("(//div[@tabindex='0' and contains(@class, 'bg-[#F9FAFB]') and contains(@class, 'cursor-pointer')])[3]");

// Click the floating switch
await floatingSwitch.click();
await floatingSwitch2.click();
await floatingSwitch3.click();


 })
Then(`Select custom switch size`,async function(){
  const customSpanLocator = "(//span[contains(text(),'Custom')])[1]";

  await pageFixture.page.waitForSelector(customSpanLocator, { timeout: 5000 });
  
  const customSpan = pageFixture.page.locator(customSpanLocator);
  
  await customSpan.waitFor({ state: 'visible' });
  
  await customSpan.click();
  

})




Then(`Scale the value to 220`,async function(){
  const inputLocator = "//input[@placeholder='0']";

await pageFixture.page.waitForSelector(inputLocator, { timeout: 10000 });

const inputField = pageFixture.page.locator(inputLocator);

const isVisible = await inputField.isVisible();
if (isVisible) {
    await inputField.fill('');
    await inputField.fill('220');
} else {
    console.log("Input field is not visible.");
}

})

Then(`Click on the switch Floating Switch Position left`,async function(){
  const switchLocator = "//span[normalize-space()='Right']"; // Adjust the index based on your layout

  await pageFixture.page.waitForSelector(switchLocator, { timeout: 10000 });
  const switchElement = pageFixture.page.locator(switchLocator);
  await switchElement.click();
  
})


Then(`Click on the Advanced bnutton`,async function(){
const advancedButtonLocator = "//h4[normalize-space()='Advanced']";
await pageFixture.page.waitForSelector(advancedButtonLocator, { timeout: 5000 });
const advancedButtonElement = pageFixture.page.locator(advancedButtonLocator);
await advancedButtonElement.click();
  
})

Then(`Click on the Accessibility bnutton`,async function(){
const accessibilityLinkLocator = "//a[@class='nav-item-child focus:outline-none inactive'][normalize-space()='Accessibility']";
await pageFixture.page.waitForSelector(accessibilityLinkLocator, { timeout: 5000 });
const accessibilityLinkElement = pageFixture.page.locator(accessibilityLinkLocator);
await accessibilityLinkElement.click();

    
  })

  Then(`Disable the keybioard shjortcut`,async function(){
    const switchDivLocator = "//div[@class='relative w-10 h-full rounded-full transition duration-100 bg-blue-600']";
await pageFixture.page.waitForSelector(switchDivLocator, { timeout: 5000 });
const switchDivElement = pageFixture.page.locator(switchDivLocator);
await switchDivElement.click();

  })

  

  Then(`Click on the site Animation`,async function(){

    const siteAnimationLocator = "//a[normalize-space()='Site Animation']";
    await pageFixture.page.waitForSelector(siteAnimationLocator, { timeout: 5000 });
    const siteAnimationElement = pageFixture.page.locator(siteAnimationLocator);
    await siteAnimationElement.click();
    
  })

  Then(`Enable the Transition Animation & change the Animation Effect`,async function(){

    const roundedDivLocator = "//div[contains(@class, 'relative') and contains(@class, 'bg-slate-200')]";
    const roundedDivElement = pageFixture.page.locator(roundedDivLocator);
    await roundedDivElement.click();
    const slideDownSpanLocator = "//span[normalize-space()='Slide Down']";
    const slideDownSpanElement = pageFixture.page.locator(slideDownSpanLocator);
    await slideDownSpanElement.click();
    
  })

  Then(`Click on the "wppool" Home icon`,async function(){
    await pageFixture.page.waitForSelector("//a[normalize-space()='wppool']", { timeout: 5000 });
    await pageFixture.page.locator("//a[normalize-space()='wppool']").click();    
  })
  
  
  // Then(`Disable the keybioard shjortcut`,async function(){


  // })Then(`Disable the keybioard shjortcut`,async function(){


  // })Then(`Disable the keybioard shjortcut`,async function(){


  // })