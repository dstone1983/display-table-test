# Getting started

please make sure you have yarn installed globally

### `yarn install`
then
### `yarn start`

This should install all dependencies and start the app. If you have another app running on :3000 you will have to select another local server the command line should prompt you.

# About this app
## PlayOn Code Challenge
This app when started will default to the selecting the GHSA association with a date range selected for the current date and one week out.

If you wish to change the criteria just make a selection and hit submit

Submit was purposely chosen to avoid constant loading of new data whenever a date is changed or if only a one or the other date is filled.

HTML date field was chosen for simplicity instead of loading and installing libraries for form elements like Material UI

Opted to go pure react state route since the app size is small and no extra modification to the entries is being done to warrant larger state management (Redux)