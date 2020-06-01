# Jake Buccarelli

1. **Summary**

Kept the assignment timeboxed to 2 hours (slightly over for writing the `README.md`). Was able to get all of the base functionality built in that time frame, but I'd definitely want more time to refactor, clean up, and better organize everything. I went with a state-based system. I thought it made the most sense for this scenario because it would allow me to manipulate the data array to change which items were rendered. It would also make adding new features easier as I don't have to worry about passing the data object around.

If I were to do this assignment again, there's definitely a few places where I'd do things differenly:

- I used template literals to render the HTML primarily for simplicity and time-saving. I think I would rather switch over to creating each element in JS (using `document.createElement()`).
- I'd also like to only get the teams I need to render from the API call, not all of them at once. Unfortunately, it seems that the API will only return teams using their IDs (`?teamId=4,5,29`), which could complicate sorting or filtering in my current setup.

2. **Things I'd Add**

- Querying a small subsection of teams from the API, not all of them
- Styling
- A search feature using `Array.filter()`
- A dropdown with sort options (Team Name, State)
- Filter by conference and division
- Improved Accessibility
- API error handling
- Improved team data (logo, Google Maps for venue)

3. **To Run**

- Open the `index.html` in a browser

4. **Thanks!**
